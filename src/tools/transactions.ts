import {server} from '../index.js';
import {
  paystackRequest,
  formatPaystackError,
  validateRequiredFields,
} from '../utils/helpers.js';
import {
  initializeTransactionSchema,
  verifyTransactionSchema,
  fetchTransactionSchema,
  listTransactionsSchema,
  chargeAuthorizationSchema,
  partialDebitSchema,
  transactionTotalsSchema,
  exportTransactionsSchema,
  Transaction,
  InitializeTransactionParams,
  InitializedTransaction,
  ListTransactionsParams,
  VerifyTransactionParams,
  FetchTransactionParams,
  ChargeAuthorizationParams,
  PartialDebitParams,
  TransactionTotalsParams,
  TransactionTotals,
  ExportTransactionsParams,
  ExportTransactionsResponse,
} from '../types/transactions/index.js';
import type {
  PaystackResponse,
  PaystackPaginatedResponse,
} from '../types/common/index.js';

/**
 * Service: Initialize a transaction
 */
async function initializeTransaction(
  params: InitializeTransactionParams
): Promise<PaystackResponse<InitializedTransaction>> {
  try {
    // Validate required fields
    const validationError = validateRequiredFields(params, ['email', 'amount']);
    if (validationError) {
      throw new Error(validationError);
    }

    // Make API request to initialize transaction
    return await paystackRequest<PaystackResponse<InitializedTransaction>>(
      'POST',
      '/transaction/initialize',
      params
    );
  } catch (error) {
    throw new Error(
      `Failed to initialize transaction: ${formatPaystackError(error)}`
    );
  }
}

/**
 * Service: Verify a transaction
 */
async function verifyTransaction(
  reference: string
): Promise<PaystackResponse<Transaction>> {
  try {
    if (!reference) {
      throw new Error('Transaction reference is required');
    }

    // Make API request to verify transaction
    return await paystackRequest<PaystackResponse<Transaction>>(
      'GET',
      `/transaction/verify/${reference}`
    );
  } catch (error) {
    throw new Error(
      `Failed to verify transaction: ${formatPaystackError(error)}`
    );
  }
}

/**
 * Service: Fetch a transaction by ID
 */
async function fetchTransaction(
  id: number
): Promise<PaystackResponse<Transaction>> {
  try {
    if (!id || id <= 0) {
      throw new Error('Valid transaction ID is required');
    }

    // Make API request to fetch transaction
    return await paystackRequest<PaystackResponse<Transaction>>(
      'GET',
      `/transaction/${id}`
    );
  } catch (error) {
    throw new Error(
      `Failed to fetch transaction: ${formatPaystackError(error)}`
    );
  }
}

/**
 * Service: List transactions
 */
async function listTransactions(
  params?: ListTransactionsParams
): Promise<PaystackPaginatedResponse<Transaction>> {
  try {
    // Make API request to list transactions
    return await paystackRequest<PaystackPaginatedResponse<Transaction>>(
      'GET',
      '/transaction',
      params
    );
  } catch (error) {
    throw new Error(
      `Failed to list transactions: ${formatPaystackError(error)}`
    );
  }
}

/**
 * Service: Charge authorization
 */
async function chargeAuthorization(
  params: ChargeAuthorizationParams
): Promise<PaystackResponse<Transaction>> {
  try {
    // Validate required fields
    const validationError = validateRequiredFields(params, [
      'email',
      'amount',
      'authorization_code',
    ]);
    if (validationError) {
      throw new Error(validationError);
    }

    // Make API request to charge authorization
    return await paystackRequest<PaystackResponse<Transaction>>(
      'POST',
      '/transaction/charge_authorization',
      params
    );
  } catch (error) {
    throw new Error(
      `Failed to charge authorization: ${formatPaystackError(error)}`
    );
  }
}

/**
 * Service: Partial debit
 */
async function partialDebit(
  params: PartialDebitParams
): Promise<PaystackResponse<Transaction>> {
  try {
    // Validate required fields
    const validationError = validateRequiredFields(params, [
      'authorization_code',
      'currency',
      'amount',
      'email',
    ]);
    if (validationError) {
      throw new Error(validationError);
    }

    // Make API request for partial debit
    return await paystackRequest<PaystackResponse<Transaction>>(
      'POST',
      '/transaction/partial_debit',
      params
    );
  } catch (error) {
    throw new Error(
      `Failed to process partial debit: ${formatPaystackError(error)}`
    );
  }
}

/**
 * Service: Transaction Totals
 */
async function getTransactionTotals(
  params?: TransactionTotalsParams
): Promise<PaystackResponse<TransactionTotals>> {
  try {
    // Make API request to get transaction totals
    return await paystackRequest<PaystackResponse<TransactionTotals>>(
      'GET',
      '/transaction/totals',
      params
    );
  } catch (error) {
    throw new Error(
      `Failed to get transaction totals: ${formatPaystackError(error)}`
    );
  }
}

/**
 * Service: Export Transactions
 */
async function exportTransactions(
  params?: ExportTransactionsParams
): Promise<PaystackResponse<ExportTransactionsResponse>> {
  try {
    // Make API request to export transactions
    return await paystackRequest<PaystackResponse<ExportTransactionsResponse>>(
      'GET',
      '/transaction/export',
      params
    );
  } catch (error) {
    throw new Error(
      `Failed to export transactions: ${formatPaystackError(error)}`
    );
  }
}

/**
 * Transaction tools
 */
export function registerTransactionTools() {
  // Initialize Transaction
  server.tool(
    'initialize_transaction',
    'Initialize a transaction to accept payment on Paystack',
    initializeTransactionSchema,
    async (params: InitializeTransactionParams) => {
      try {
        const result = await initializeTransaction(params);
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
            : 'Initialize_Transaction_Unknown_Error';
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

  // Verify Transaction
  server.tool(
    'verify_transaction',
    "Verify a transaction's status using the transaction reference",
    verifyTransactionSchema,
    async (params: VerifyTransactionParams) => {
      try {
        const result = await verifyTransaction(params.reference);
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
            : 'Verify_Transaction_Unknown_Error';
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

  // Fetch Transaction
  server.tool(
    'fetch_transaction',
    'Get details of a transaction by ID',
    fetchTransactionSchema,
    async (params: FetchTransactionParams) => {
      try {
        const result = await fetchTransaction(params.id);
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
            : 'Fetch_Transaction_Unknown_Error';
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

  // List Transactions
  server.tool(
    'list_transactions',
    'List transactions with pagination and filtering options',
    listTransactionsSchema,
    async (params: ListTransactionsParams) => {
      try {
        const result = await listTransactions(params);

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
            : 'List_Transactions_Unknown_Error';
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

  // Charge Authorization
  server.tool(
    'charge_authorization',
    'Charge a previously authorized card',
    chargeAuthorizationSchema,
    async (params: ChargeAuthorizationParams) => {
      try {
        const result = await chargeAuthorization(params);
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
            : 'Charge_Authorization_Unknown_Error';
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

  // Partial Debit
  server.tool(
    'partial_debit',
    'Charge a partial amount from a previously authorized card',
    partialDebitSchema,
    async (params: PartialDebitParams) => {
      try {
        const result = await partialDebit(params);
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
            : 'Partial_Debit_Unknown_Error';
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

  // Transaction Totals
  server.tool(
    'transaction_totals',
    'Get total amount received on your account',
    transactionTotalsSchema,
    async (params?: TransactionTotalsParams) => {
      try {
        const result = await getTransactionTotals(params);
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
            : 'Transaction_Totals_Unknown_Error';
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

  // Export Transactions
  server.tool(
    'export_transactions',
    'Export a list of transactions carried out on your integration',
    exportTransactionsSchema,
    async (params?: ExportTransactionsParams) => {
      try {
        const result = await exportTransactions(params);
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
            : 'Export_Transactions_Unknown_Error';
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
