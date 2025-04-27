import {server} from '../index.js';
import {
  paystackRequest,
  formatPaystackError,
  validateRequiredFields,
} from '../utils/helpers.js';
import {
  createCustomerSchema,
  fetchCustomerSchema,
  listCustomersSchema,
  updateCustomerSchema,
  validateCustomerSchema,
  setRiskActionSchema,
  deactivateAuthorizationSchema,
} from '../types/index.js';
import type {
  CustomerResponse,
  PaystackResponse,
  CustomerWithDetailsResponse,
  PaystackSingleResponse,
  PaystackListResponse,
  CreateCustomerParams,
  ListCustomersParams,
  UpdateCustomerParams,
  ValidateCustomerParams,
  SetRiskActionParams,
  DeactivateAuthorizationParams,
} from '../types/index.js';

/**
 * Service: Creates a new customer on Paystack
 */
async function createCustomer(
  params: CreateCustomerParams
): Promise<PaystackSingleResponse<CustomerResponse>> {
  try {
    // Validate required fields
    const validationError = validateRequiredFields(params, ['email']);
    if (validationError) {
      throw new Error(validationError);
    }

    // Make API request to create customer
    return await paystackRequest<PaystackSingleResponse<CustomerResponse>>(
      'POST',
      '/customer',
      params
    );
  } catch (error) {
    throw new Error(`Failed to create customer: ${formatPaystackError(error)}`);
  }
}

/**
 * Service: Lists all customers with pagination
 */
async function listCustomers(
  params?: ListCustomersParams
): Promise<PaystackListResponse<CustomerResponse>> {
  try {
    // Make API request to list customers
    return await paystackRequest<PaystackListResponse<CustomerResponse>>(
      'GET',
      '/customer',
      undefined,
      params
    );
  } catch (error) {
    throw new Error(`Failed to list customers: ${formatPaystackError(error)}`);
  }
}

/**
 * Service: Gets a specific customer by email or code
 */
async function getCustomer(
  emailOrCode: string
): Promise<PaystackSingleResponse<CustomerWithDetailsResponse>> {
  try {
    if (!emailOrCode) {
      throw new Error('Customer email or code is required');
    }

    // Make API request to get customer
    return await paystackRequest<
      PaystackSingleResponse<CustomerWithDetailsResponse>
    >('GET', `/customer/${encodeURIComponent(emailOrCode)}`);
  } catch (error) {
    throw new Error(`Failed to get customer: ${formatPaystackError(error)}`);
  }
}

/**
 * Service: Updates a customer by code
 */
async function updateCustomer(
  code: string,
  params: UpdateCustomerParams
): Promise<PaystackSingleResponse<CustomerResponse>> {
  try {
    if (!code) {
      throw new Error('Customer code is required');
    }

    if (Object.keys(params).length === 0) {
      throw new Error('At least one field must be provided for update');
    }

    // Make API request to update customer
    return await paystackRequest<PaystackSingleResponse<CustomerResponse>>(
      'PUT',
      `/customer/${encodeURIComponent(code)}`,
      params
    );
  } catch (error) {
    throw new Error(`Failed to update customer: ${formatPaystackError(error)}`);
  }
}

/**
 * Service: Validates a customer's identity
 */
async function validateCustomer(
  params: ValidateCustomerParams
): Promise<PaystackResponse<any>> {
  try {
    // Validate required fields
    const validationError = validateRequiredFields(params, [
      'code',
      'country',
      'type',
      'account_number',
      'bvn',
      'bank_code',
    ]);
    if (validationError) {
      throw new Error(validationError);
    }

    // Make API request to validate customer
    return await paystackRequest<PaystackResponse<any>>(
      'POST',
      `/customer/${encodeURIComponent(params.code)}/identification`,
      params
    );
  } catch (error) {
    throw new Error(
      `Failed to validate customer: ${formatPaystackError(error)}`
    );
  }
}

/**
 * Service: Sets risk action for a customer
 */
async function setRiskAction(
  params: SetRiskActionParams
): Promise<PaystackSingleResponse<CustomerResponse>> {
  try {
    // Validate required fields
    const validationError = validateRequiredFields(params, [
      'customer',
      'risk_action',
    ]);
    if (validationError) {
      throw new Error(validationError);
    }

    // Make API request to set risk action
    return await paystackRequest<PaystackSingleResponse<CustomerResponse>>(
      'POST',
      '/customer/set_risk_action',
      params
    );
  } catch (error) {
    throw new Error(`Failed to set risk action: ${formatPaystackError(error)}`);
  }
}

/**
 * Service: Deactivates a payment authorization
 */
async function deactivateAuthorization(
  params: DeactivateAuthorizationParams
): Promise<PaystackResponse<any>> {
  try {
    // Validate required fields
    const validationError = validateRequiredFields(params, [
      'authorization_code',
    ]);
    if (validationError) {
      throw new Error(validationError);
    }

    // Make API request to deactivate authorization
    return await paystackRequest<PaystackResponse<any>>(
      'POST',
      '/customer/deactivate_authorization',
      params
    );
  } catch (error) {
    throw new Error(
      `Failed to deactivate authorization: ${formatPaystackError(error)}`
    );
  }
}

/**
 * Register all customer-related tools
 */
export function registerCustomersTools() {
  // Create Customer
  server.tool(
    'create_customer',
    'Create a new customer in Paystack',
    createCustomerSchema,
    async (params) => {
      try {
        const result = await createCustomer(params);
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
            : 'Create_Customer_Unknown_Error';
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

  // List Customers
  server.tool(
    'list_customers',
    'List customers available on your Paystack integration',
    listCustomersSchema,
    async (params) => {
      try {
        const result = await listCustomers(params);

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
            : 'List_Customers_Unknown_Error';
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

  // Fetch Customer
  server.tool(
    'get_customer',
    'Get details of a specific customer by email or code',
    fetchCustomerSchema,
    async (params) => {
      try {
        const result = await getCustomer(params.email_or_code);

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
          error instanceof Error ? error.message : 'Get_Customer_Unknown_Error';
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

  // Update Customer
  server.tool(
    'update_customer',
    "Update a customer's details",
    updateCustomerSchema,
    async (params) => {
      try {
        // Extract code and update params
        const {code, ...updateParams} = params;
        const result = await updateCustomer(code, updateParams);

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
            : 'Update_Customer_Unknown_Error';
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

  // Validate Customer
  server.tool(
    'validate_customer',
    "Validate a customer's identity with bank account",
    validateCustomerSchema,
    async (params) => {
      try {
        const result = await validateCustomer(params);

        return {
          content: [
            {
              type: 'text',
              text: `Customer validation initiated. ${result.message}`,
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Validate_Customer_Unknown_Error';
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

  // Set Risk Action (Whitelist/Blacklist)
  server.tool(
    'set_customer_risk_action',
    'Whitelist or blacklist a customer',
    setRiskActionSchema,
    async (params) => {
      try {
        const result = await setRiskAction(params);

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
            : 'Set_Risk_Action_Unknown_Error';
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

  // Deactivate Authorization
  server.tool(
    'deactivate_authorization',
    'Deactivate a payment authorization when a card needs to be forgotten',
    deactivateAuthorizationSchema,
    async (params) => {
      try {
        const result = await deactivateAuthorization(params);

        return {
          content: [
            {
              type: 'text',
              text: `Authorization deactivated successfully. ${result.message}`,
            },
          ],
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Deactivate_Authorization_Unknown_Error';
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
