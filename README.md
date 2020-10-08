# Soho

A utility toolkit for building Shopify sites with Sanity, Shopify, and Next.

## Schemas

These predefined schemas will help build document types quickly.

### Product Schemas

The product schema is available to add to sanity that corresponds with the sync script. to import it do the following:

```tsx
import {
  product,
  ProductInfo,
  ProductConfigurations,
  ProductData,
} from '@soho/schemas';

export default {
  ...product,

  fields: [
    //
    ...ProductInfo,
    ...ProductConfigurations(),
    ...ProductData,
  ],
};
```
