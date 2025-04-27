// Product shipping fields
export interface ShippingField {
  delivery_note: string;
  shipping_fees?: Array<{
    region: string;
    fee: number;
    currency: string;
  }>;
}

// Product file
export interface ProductFile {
  key: string;
  type: string;
  path: string;
  original_filename: string;
}

// Base product data
export interface ProductBase {
  name: string;
  description: string;
  price: number;
  currency: string;
  unlimited?: boolean;
  quantity?: number;
  minimum_orderable?: number;
  maximum_orderable?: number | null;
  is_shippable?: boolean;
  shipping_fields?: ShippingField;
}

// Create product parameters
export interface CreateProductParams extends ProductBase {
  unlimited?: boolean;
  quantity?: number;
  type?: string;
  files?: ProductFile[];
  success_message?: string | null;
  redirect_url?: string | null;
  split_code?: string | null;
  notification_emails?: string | null;
  metadata?: Record<string, any>;
  low_stock_alert?: boolean;
}

// Update product parameters
export interface UpdateProductParams extends Partial<CreateProductParams> {
  active?: boolean;
}

// Product from Paystack
export interface Product extends ProductBase {
  id: number;
  product_code: string;
  slug: string;
  active: boolean;
  domain: string;
  type: string;
  in_stock: boolean;
  quantity_sold: number | null;
  files: ProductFile[] | null;
  success_message: string | null;
  redirect_url: string | null;
  split_code: string | null;
  notification_emails: string | null;
  metadata: Record<string, any> | null;
  low_stock_alert: boolean | number;
  digital_assets: any[];
  variant_options: any[];
  integration: number;
  createdAt: string;
  updatedAt: string;
}

// List products query parameters
export interface ListProductsParams {
  perPage?: number;
  page?: number;
  from?: string;
  to?: string;
}

// Parameters for the list_products tool
export interface ListProductsToolParams {
  page?: number;
  perPage?: number;
  from?: string;
  to?: string;
}

// Parameters for the get_product tool
export interface GetProductToolParams {
  id: string | number;
}

// Parameters for the update_product tool
export interface UpdateProductToolParams extends UpdateProductParams {
  id: string | number;
} 