import {server} from '../index.js';
import {paystackRequest} from '../utils/helpers.js';

import {
  balanceLedgerSchema,
  resendOtpSchema,
  finalizeDisableOtpSchema,
} from '../types/index.js';

import type {
  BalanceResponse,
  BalanceLedgerParams,
  BalanceLedgerResponse,
  ResendOtpParams,
  ResendOtpResponse,
  DisableOtpResponse,
  FinalizeDisableOtpParams,
  FinalizeDisableOtpResponse,
  EnableOtpResponse,
} from '../types/index.js';

/**
 * Check balance on your integration
 */
export async function checkBalance(): Promise<BalanceResponse> {
  try {
    return await paystackRequest<BalanceResponse>('GET', '/balance');
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to check balance: ${errorMessage}`);
  }
}

/**
 * Fetch all pay-ins and pay-outs that occurred on your integration
 */
export async function fetchBalanceLedger(
  params: BalanceLedgerParams = {}
): Promise<BalanceLedgerResponse> {
  try {
    return await paystackRequest<BalanceLedgerResponse>(
      'GET',
      '/balance/ledger',
      undefined,
      params
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch balance ledger: ${errorMessage}`);
  }
}

/**
 * Resend OTP for a transfer
 */
export async function resendOtp(
  params: ResendOtpParams
): Promise<ResendOtpResponse> {
  try {
    return await paystackRequest<ResendOtpResponse>(
      'POST',
      '/transfer/resend_otp',
      params
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to resend OTP: ${errorMessage}`);
  }
}

/**
 * Disable OTP for transfers
 */
export async function disableOtp(): Promise<DisableOtpResponse> {
  try {
    return await paystackRequest<DisableOtpResponse>(
      'POST',
      '/transfer/disable_otp'
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to disable OTP: ${errorMessage}`);
  }
}

/**
 * Finalize disabling OTP for transfers
 */
export async function finalizeDisableOtp(
  params: FinalizeDisableOtpParams
): Promise<FinalizeDisableOtpResponse> {
  try {
    return await paystackRequest<FinalizeDisableOtpResponse>(
      'POST',
      '/transfer/disable_otp_finalize',
      params
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to finalize disable OTP: ${errorMessage}`);
  }
}

/**
 * Enable OTP for transfers
 */
export async function enableOtp(): Promise<EnableOtpResponse> {
  try {
    return await paystackRequest<EnableOtpResponse>(
      'POST',
      '/transfer/enable_otp'
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to enable OTP: ${errorMessage}`);
  }
}

/**
 * Register all transfer control tools
 */
export function registerTransferControlTools() {
  // Check Balance
  server.tool(
    'check_balance',
    'Get the available balance on your Paystack integration',
    {},
    async () => {
      try {
        const result = await checkBalance();
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
            : 'Check_Balance_Unknown_Error';
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

  // Fetch Balance Ledger
  server.tool(
    'balance_ledger',
    'Fetch all pay-ins and pay-outs that occurred on your Paystack integration',
    balanceLedgerSchema,
    async (params: BalanceLedgerParams) => {
      try {
        const result = await fetchBalanceLedger(params);
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
            : 'Balance_Ledger_Unknown_Error';
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

  // Resend OTP
  server.tool(
    'resend_transfers_otp',
    'Generates a new OTP and sends to customer for transfer verification',
    resendOtpSchema,
    async (params: ResendOtpParams) => {
      try {
        const result = await resendOtp(params);
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
          error instanceof Error ? error.message : 'Resend_OTP_Unknown_Error';
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

  // Disable OTP
  server.tool(
    'disable_transfers_otp',
    'Disable OTP requirement for transfers',
    {},
    async () => {
      try {
        const result = await disableOtp();
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
          error instanceof Error ? error.message : 'Disable_OTP_Unknown_Error';
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

  // Finalize Disable OTP
  server.tool(
    'finalize_disable_otp',
    'Finalize the request to disable OTP on your transfers',
    finalizeDisableOtpSchema,
    async (params: FinalizeDisableOtpParams) => {
      try {
        const result = await finalizeDisableOtp(params);
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
            : 'Finalize_Disable_OTP_Unknown_Error';
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

  // Enable OTP
  server.tool(
    'enable_transfers_otp',
    'Enable OTP requirement for transfers',
    {},
    async () => {
      try {
        const result = await enableOtp();
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
          error instanceof Error ? error.message : 'Enable_OTP_Unknown_Error';
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
