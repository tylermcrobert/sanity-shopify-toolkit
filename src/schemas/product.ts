// import { MdShoppingCart } from 'react-icons/md';

export const product = {
  name: 'product',
  title: 'Shopify Product',
  type: 'document',
  // icon: MdShoppingCart,
};

/**
 * Default Shopify modification message
 */
const SHOPIFY_MOD_MSG = 'From Shopify and cannot be modified here';

/** Shopify options message */
const SHOPIFY_LIST_MSG = `Add or remove items to this list in Shopify`;

/**
 * Basic Info
 *
 * Adds basic information from spotify
 */
export const ProductInfo = [
  {
    title: 'Title',
    name: 'title',
    type: 'string',
    description: SHOPIFY_MOD_MSG,
    readOnly: true,
  },
  {
    title: 'URL Slug',
    name: 'slug',
    type: 'slug',
    description: SHOPIFY_MOD_MSG,
    readOnly: true,
  },
  {
    name: 'image',
    type: 'image',
    description: 'Main image of product.',
    validation: (Rule: any) => Rule.required(),
    options: {
      hotspot: true,
    },
  },
];

/**
 * Shopify configuration data
 */

export const ProductConfigurations = ({
  variantFields,
  optionCategoryFields,
  optionValueFields,
}: {
  /** Additional fields to add to the 'variant image' field */
  variantFields?: object[];
  /** Additional fields to add to the `Option Category` field such as 'radio vs dropdown'*/
  optionCategoryFields?: object[];
  /** Additional fields to add to the `Option value` field 'swatch image'*/
  optionValueFields?: object[];
} = {}) => [
  {
    title: 'Variants & Options',
    description: `Supplement Shopify's variant data with images, swatches, and other options`,
    name: 'options',
    type: 'object',
    fields: [
      {
        name: 'variants',
        title: 'Variant Images',
        description: `Add images for Shopify variants. ${SHOPIFY_LIST_MSG}`,
        type: 'array',
        options: {
          sortable: false,
        },
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'id',
                type: 'string',
                hidden: true,
              },
              {
                name: 'title',
                type: 'string',
                readOnly: true,
              },
              {
                name: 'image',
                type: 'image',
                options: {
                  hotspot: true,
                },
              },
              ...(variantFields || []),
            ],
          },
        ],
      },
      {
        title: 'Option Categories',
        description: `Edit how the variants get catagorized into options like "Color" or "Material". ${SHOPIFY_LIST_MSG}`,
        name: 'categories',
        type: 'array',
        options: {
          sortable: false,
        },
        of: [
          {
            title: 'Option Categories',
            type: 'object',
            name: 'option',
            fields: [
              {
                title: 'Option Category Name',
                name: 'name',
                type: 'string',
                readOnly: true,
              },
              ...(optionCategoryFields || []),

              {
                name: 'values',
                type: 'array',
                of: [
                  {
                    name: 'value',
                    type: 'object',
                    fields: [
                      {
                        name: 'title',
                        type: 'string',
                      },

                      {
                        title: 'Color Value',
                        type: 'color',
                        name: 'optionColors',
                      },
                      ...(optionValueFields || []),
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const ProductData = [
  {
    name: 'data',
    type: 'object',
    title: 'Shopify Data',
    options: { collapsable: true },
    readOnly: true,
    fields: [
      {
        name: 'price',
        type: 'string',
        description: SHOPIFY_MOD_MSG,
      },
      {
        name: 'vendor',
        type: 'string',
        description: SHOPIFY_MOD_MSG,
      },

      {
        name: 'dateCreated',
        type: 'date',
      },
      {
        name: 'dateUpdated',
        type: 'date',
      },
    ],
  },
];
