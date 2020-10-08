export type ShopifyWebhookRes = {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string | null;
  template_suffix: string;
  published_scope: string;
  tags: string;
  admin_graphql_api_id: string;
  variants: ShopifyWebhookVariant[];
  options: ShopifyWebhookOption[];
  images: ShopifyWebhookImage[];
  image: ShopifyWebhookImage;
};

type ShopifyWebhookOption = {
  id: number;
  product_id: number;
  name: string;
  position: string;
  values: string[];
};

type ShopifyWebhookVariant = {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  inventory_policy: string;

  compare_at_price: string;
  fulfillment_service: string;
  inventory_management: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode: unknown;
  grams: number;
  image_id: unknown;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
  admin_graphql_api_id: string;
};

type ShopifyWebhookImage = {
  id: number;
  product_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt: null | string;
  width: number;
  height: number;
  src: string;
  variant_ids: unknown[];
  admin_graphql_api_id: string;
};
