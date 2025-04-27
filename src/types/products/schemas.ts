import { z } from 'zod';

// Schema for create_product tool
export const createProductSchema = {
  name: z.string().min(1, 'Product name is required').describe('The name of the product'),
  description: z.string().min(1, 'Product description is required').describe('The description of the product'),
  price: z.number().int().positive('Price must be a positive integer').describe('The price of the product. Price should be in the subunit of the supported currency'),
  currency: z.string().min(1, 'Currency is required').describe('The currency of the product'),
  unlimited: z.boolean().optional().describe('Whether the product has an unlimited quantity. Set to true if the product has unlimited stock. Leave as false if the product has limited stock'),
  quantity: z.number().int().nonnegative().optional().describe('Number of products in stock. This is required if unlimited is false.'),
};

// Schema for list_products tool
export const listProductsSchema = {
  page: z.number().int().positive().optional().describe('The page number to retrieve. Default is 1'),
  perPage: z.number().int().positive().optional().describe('Number of records to retrieve per page. If not specified we use a default value of 50'),
  from: z.string().datetime().optional().describe('A timestamp from which to start listing product e.g. 2016-09-24T00:00:05.000Z'),
  to: z.string().datetime().optional().describe('A timestamp at which to stop listing product e.g. 2016-09-24T00:00:05.000Z'),
};

// Schema for get_product tool
export const getProductSchema = {
  id: z.union([z.string(), z.number()]).describe('The id of the product to retrieve'),
};

// Schema for update_product tool
export const updateProductSchema = {
  id: z.union([z.string(), z.number()]).describe('The id of the product to update'),
  name: z.string().optional().describe('The name of the product'),
  description: z.string().optional().describe('The description of the product'),
  price: z.number().int().positive().optional().describe('The price of the product. Price should be in the subunit of the supported currency'),
  currency: z.string().optional().describe('The currency of the product'),
  unlimited: z.boolean().optional().describe('Whether the product has an unlimited quantity. Set to true if the product has unlimited stock. Leave as false if the product has limited stock'),
  quantity: z.number().int().nonnegative().optional().describe('Number of products in stock. This is required if unlimited is false.'),
}; 