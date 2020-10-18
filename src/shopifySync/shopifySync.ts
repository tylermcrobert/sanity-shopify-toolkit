import {
  ShopifyWebhookRes,
  ProductSchemaOptionCategory,
  ProductSchemaBase,
} from '../types';
import { NextApiRequest, NextApiResponse } from 'next';
import sanityClient, { ClientConfig } from '@sanity/client';
import { SlackHandler } from './util/slackHandler';

type SyncScriptOptions = {
  req: NextApiRequest;
  res: NextApiResponse;
  clientOptions: { projectId: string; token: string } & ClientConfig;
  slackWebhookUrl: string;
};

// TODO: Make slack webhook optionsl
export const shopifySync = async ({
  req,
  res,
  clientOptions,
  slackWebhookUrl,
}: SyncScriptOptions) => {
  const client = sanityClient(clientOptions);
  const sendToSlack = new SlackHandler(slackWebhookUrl).sendToSlack;

  const setError = (code: number, message: string, error?: any) => {
    const err = `ERROR ${code}: ${message}`;
    console.error(err);
    sendToSlack(err);
    if (error) {
      console.error(error);
    }
    res.status(code).json({
      error: true,
      statusCode: error?.statusCode || code,
      message,
    });
    return null;
  };

  try {
    /**
     * Validate
     */

    if (req.method !== 'POST') setError(400, 'Must be POST method');
    if (!req.body) setError(400, 'Must include body');

    /**
     * Extract data from body payload
     */

    const data = req.body as ShopifyWebhookRes;

    const incomingOptions: ProductSchemaOptionCategory[] = data.options.map(
      item => ({
        _key: item.id.toString(),
        _type: 'option',
        name: item.name,
        values: item.values.map(value => ({
          _key: value,
          _type: 'value',
          title: value,
        })),
      })
    );

    const incomingVariants = data.variants.map(variant => ({
      id: variant.id.toString(),
      title: variant.title,
      _key: variant.id.toString(),
      price: variant.price,
      compareAtPrice: variant.compare_at_price,
      isAvailable:
        variant.inventory_quantity > 0 ||
        variant.inventory_management !== 'deny',
      data: JSON.stringify(variant),
      selectedOptions: [variant.option1, variant.option2, variant.option3]
        .filter(a => a)
        .map((optionName, i) => ({
          categoryName: data.options[i].name,
          value: optionName,
        })),
    }));

    /**
     * Fetch existing product & make sure it isn't a draft
     */

    const existingSanityProducts: ProductSchemaBase[] | null =
      (await client.fetch(`*[_type == "product" && slug.current == $slug]`, {
        slug: data.handle.toString(),
      })) || null;

    if (
      (existingSanityProducts && existingSanityProducts.length > 1) ||
      false
    ) {
      setError(
        503,
        `Sanity document ${data.title} is a draft. Publish the document to update with sync.`
      );
      return null;
    }

    const existingSanityProduct =
      (existingSanityProducts && existingSanityProducts[0]?.options) || null;

    /**
     * Merge variants and Options
     */

    const mergedVariants = incomingVariants.map(newVariant => ({
      ...existingSanityProduct?.variants?.find(
        oldVariant => oldVariant.id === newVariant.id
      ),
      ...newVariant,
    }));

    const mergedOptions = incomingOptions.map(incomingOption => {
      /** Get data from existing option */
      const existingOption = existingSanityProduct?.categories?.find(
        existingOption => existingOption.name === incomingOption.name
      );

      return {
        /** add option from webhook*/
        ...incomingOption,
        /** overwrite webhook option with cms option if it exists */
        ...existingOption,
        /** Update values by deep-merging */
        values: incomingOption.values?.map(incomingVal => ({
          /** Add value from webhook */
          ...incomingVal,
          /** Overwrite if already exists in CMS */
          ...existingOption?.values?.find(val => val._key === incomingVal._key),
          _key: incomingVal.title,
        })),
      };
    });

    /**
     * New Product
     */

    const product = {
      _type: 'product',
      _id: data.id.toString(),
      title: data.title,
      slug: {
        _type: 'slug',
        current: data.handle,
      },
      options: {
        variants: mergedVariants,
        categories: mergedOptions,
      },
      data: {
        price: data.variants[0].price,
        dateCreated: data.created_at,
        dateUpdated: data.updated_at,
        vendor: data.vendor,
      },
    };

    return client
      .transaction()
      .createIfNotExists(product)
      .patch(data.id.toString(), patch => patch.set(product))
      .commit()
      .then(resp => {
        sendToSlack(`Successfully pushed ${data.title} to Sanity`);
        res.status(200).json(resp);
      })
      .catch(err => {
        setError(400, 'Error pushing to Sanity', err);
      });
  } catch (err) {
    setError(500, 'Unknown error posting to Sanity', err);
  }

  return null;
};
