import {server} from '../index.js';
import {paystackRequest, formatPaystackError} from '../utils/helpers.js';
import {listBanksSchema, listStatesSchema} from '../types/index.js';
import type {
  PaystackResponse,
  PaystackPaginatedResponse,
  Bank,
  Country,
  State,
  ListBanksParams,
  ListStatesParams,
} from '../types/index.js';

/**
 * Service: Lists banks available on Paystack
 */
async function listBanks(
  params?: ListBanksParams
): Promise<PaystackPaginatedResponse<Bank>> {
  try {
    // Make API request to list banks
    return await paystackRequest<PaystackPaginatedResponse<Bank>>(
      'GET',
      '/bank',
      params
    );
  } catch (error) {
    throw new Error(`Failed to list banks: ${formatPaystackError(error)}`);
  }
}

/**
 * Service: Lists countries supported by Paystack
 */
async function listCountries(): Promise<PaystackResponse<Country[]>> {
  try {
    // Make API request to list countries
    return await paystackRequest<PaystackResponse<Country[]>>(
      'GET',
      '/country'
    );
  } catch (error) {
    throw new Error(`Failed to list countries: ${formatPaystackError(error)}`);
  }
}

/**
 * Service: Lists states for a specific country (for AVS)
 */
async function listStates(
  params: ListStatesParams
): Promise<PaystackResponse<State[]>> {
  try {
    if (!params.country) {
      throw new Error('Country code is required');
    }

    // Make API request to list states
    return await paystackRequest<PaystackResponse<State[]>>(
      'GET',
      '/address_verification/states',
      params
    );
  } catch (error) {
    throw new Error(`Failed to list states: ${formatPaystackError(error)}`);
  }
}

// Miscellaneous Tools annotations
export const toolAnnotations = {
  listBanks: {
    title: 'List Banks',
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  listCountries: {
    title: 'List Countries',
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  listStates: {
    title: 'List States',
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
};

/**
 * Miscellaneous tools
 */
export function registerMiscellaneousTools() {
  // List Banks
  server.tool(
    'list_banks',
    'Get a list of all banks supported by Paystack and their properties',
    listBanksSchema,
    async (params) => {
      try {
        const result = await listBanks(params);

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
          error instanceof Error ? error.message : 'List_Banks_Unknown_Error';
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

  // List Countries
  server.tool(
    'list_countries',
    'Get a list of countries that Paystack currently supports',
    {},
    async () => {
      try {
        const result = await listCountries();

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
            : 'List_Countries_Unknown_Error';
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

  // List States (AVS)
  server.tool(
    'list_states',
    'Get a list of states for a country for address verification',
    listStatesSchema,
    async (params) => {
      try {
        const result = await listStates(params);

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
          error instanceof Error ? error.message : 'List_States_Unknown_Error';
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
