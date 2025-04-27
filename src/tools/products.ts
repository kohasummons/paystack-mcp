import {server} from '../index.js';
import {
  paystackRequest,
  formatPaystackError,
  validateRequiredFields,
} from '../utils/helpers.js';
import {
  createProductSchema,
  listProductsSchema,
  getProductSchema,
  updateProductSchema,
} from '../types/index.js';
import type {
  PaystackResponse,
  PaystackPaginatedResponse,
  Product,
  CreateProductParams,
  UpdateProductParams,
  ListProductsParams,
} from '../types/index.js';

/**
 * Service: Creates a new product on Paystack
 */
async function createProduct(
  params: CreateProductParams
): Promise<PaystackResponse<Product>> {
  try {
    // Validate required fields
    const validationError = validateRequiredFields(params, [
      'name',
      'description',
      'price',
      'currency',
    ]);
    if (validationError) {
      throw new Error(validationError);
    }

    // Make API request to create product
    return await paystackRequest<PaystackResponse<Product>>(
      'POST',
      '/product',
      params
    );
  } catch (error) {
    throw new Error(`Failed to create product: ${formatPaystackError(error)}`);
  }
}

/**
 * Service: Lists all products with pagination
 */
async function listProducts(
  params?: ListProductsParams
): Promise<PaystackPaginatedResponse<Product>> {
  try {
    // Make API request to list products
    return await paystackRequest<PaystackPaginatedResponse<Product>>(
      'GET',
      '/product',
      params
    );
  } catch (error) {
    throw new Error(`Failed to list products: ${formatPaystackError(error)}`);
  }
}

/**
 * Service: Gets a specific product by ID
 */
async function getProduct(
  id: string | number
): Promise<PaystackResponse<Product>> {
  try {
    if (!id) {
      throw new Error('Product ID is required');
    }

    // Make API request to get product
    return await paystackRequest<PaystackResponse<Product>>(
      'GET',
      `/product/${id}`
    );
  } catch (error) {
    throw new Error(`Failed to get product: ${formatPaystackError(error)}`);
  }
}

/**
 * Service: Updates a product by ID
 */
async function updateProduct(
  id: string | number,
  params: UpdateProductParams
): Promise<PaystackResponse<Product>> {
  try {
    if (!id) {
      throw new Error('Product ID is required');
    }

    if (Object.keys(params).length === 0) {
      throw new Error('At least one field must be provided for update');
    }

    // Make API request to update product
    return await paystackRequest<PaystackResponse<Product>>(
      'PUT',
      `/product/${id}`,
      params
    );
  } catch (error) {
    throw new Error(`Failed to update product: ${formatPaystackError(error)}`);
  }
}

/**
 * Product tools
 */
export function registerProductsTools() {
  // Create Product
  server.tool(
    'create_product',
    'Create a new product on your Paystack integration',
    createProductSchema,
    async (params) => {
      try {
        const result = await createProduct(params);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Create_Product_Unknown_Error';
        return {
          content: [
            {
              type: 'text',
              text: errorMessage,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // List Products
  server.tool(
    'list_products',
    'List products available on your Paystack integration with pagination support',
    listProductsSchema,
    async (params) => {
      try {
        const result = await listProducts(params);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'List_Products_Unknown_Error';
        return {
          content: [
            {
              type: 'text',
              text: errorMessage,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Get Product
  server.tool(
    'get_product',
    'Get details of a specific product by ID',
    getProductSchema,
    async (params) => {
      try {
        const result = await getProduct(params.id);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Get_Product_Unknown_Error';
        return {
          content: [
            {
              type: 'text',
              text: errorMessage,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // Update Product
  server.tool(
    'update_product',
    'Update an existing product by ID',
    updateProductSchema,
    async (params) => {
      try {
        // Extract ID and the rest of the params
        const {id, ...updateParams} = params;

        const result = await updateProduct(id, updateParams);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Update_Product_Unknown_Error';
        return {
          content: [
            {
              type: 'text',
              text: errorMessage,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
