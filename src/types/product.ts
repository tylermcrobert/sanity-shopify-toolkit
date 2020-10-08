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
  SupplimentalCategoryVal = {}
> = {
  options: {
    variants: ProductSchemaVariant<SupplementalVariant>[];
    categories: ProductSchemaOptionCategory<SupplimentalCategoryVal>[];
  };
};

/**
 * Corresponds to "Options" in Shopify.
 */
export type ProductSchemaOptionCategory<SuplementalVal = {}> = {
  _key: string;
  _type: 'option';
  name: string;
  values: ProductSchemaOptionCategoryValue<SuplementalVal>[];
};

export type ProductSchemaOptionCategoryValue<SuplementalVal = {}> = {
  _key: string;
  _type: 'value';
  title: string;
} & SuplementalVal;

/**
 * Product variants in Sanity
 *
 * Variant images are typically stored and recieved here.
 */
export type ProductSchemaVariant<SupplementalVariantData = {}> = {
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
