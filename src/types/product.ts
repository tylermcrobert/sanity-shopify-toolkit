import { SanityDocument } from '@sanity/client';
import { SanitySlug, SanityImage } from './sanity';

/**
 * Sanity Product Basic Info
 */

export type ProductSchemaBasicInfo = {
  title: string;
  slug: SanitySlug;
  image?: SanityImage;
};
/**
 * Sanity Product Option
 *
 * Corresponds to Options & Variants in Shopify
 */

export type ProductSchemaOptions<
  /** It's possible to add additional fields to variants */
  SupplementalVariant = {},
  /** It's possible to add additional fields to category values */
  SupplimentalCategoryVal = {},
  /** It's possible to add additional fields to category values */
  SuplementalItemVals = {}
> = {
  options: {
    variants: ProductSchemaVariant<SupplementalVariant>[];
    categories: ProductSchemaOptionCategory<
      SupplimentalCategoryVal,
      SuplementalItemVals
    >[];
  };
};

/**
 * Corresponds to "Options" in Shopify.
 */
export type ProductSchemaOptionCategory<
  SuplementalCategoryVals,
  SuplementalItemVals
> = {
  _key: string;
  _type: 'option';
  name: string;
  values: ProductSchemaOptionCategoryValue<SuplementalItemVals>[];
} & SuplementalCategoryVals;

export type ProductSchemaOptionCategoryValue<SuplementalItemVals = {}> = {
  _key: string;
  _type: 'value';
  title: string;
} & SuplementalItemVals;

/**
 * Product variants in Sanity
 *
 * Variant images are typically stored and recieved here.
 */
export type ProductSchemaVariant<SupplementalVariantData = {}> = {
  image?: SanityImage;
  _key: string;
  id: string;
  title: string;
  compareAtPrice: string | null;
  data: string;
  price: string;
  isAvailable: boolean;
  selectedOptions: ProductSchemaOptionMeta[];
} & SupplementalVariantData;

/**
 * Information about option value and category
 */
export type ProductSchemaOptionMeta = {
  categoryName: string;
  value: string;
};

/**
 * Sanity Shopify Data
 */

export type ProductSchemaShopifyData = {
  price: string;
};

/**
 * An generic unmodified product base schema
 */

export type ProductSchemaBase = SanityDocument &
  ProductSchemaBasicInfo &
  ProductSchemaOptions &
  ProductSchemaShopifyData;
