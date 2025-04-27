import axios, {AxiosError} from 'axios';
import {config} from '../config/config.js';

// Create an axios instance with Paystack API base URL and auth headers
const paystackClient = axios.create({
  baseURL: config.paystack.apiUrl,
  headers: {
    Authorization: `Bearer ${config.paystack.secretKey}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Makes a request to the Paystack API and handles errors
 * @param method HTTP method
 * @param endpoint API endpoint
 * @param data Request data
 * @param params Query parameters
 * @returns Response data or error message
 */
export async function paystackRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: any,
  params?: any
): Promise<T> {
  try {
    const response = await paystackClient({
      method,
      url: endpoint,
      data,
      params,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // Format Paystack API error message
      const errorData = error.response.data;
      const errorMessage = errorData.message || 'Unknown error occurred';

      console.error(
        `Paystack API Error (${error.response.status}): ${errorMessage}`
      );
      throw new Error(`Paystack API Error: ${errorMessage}`);
    }

    // Handle network or other errors
    console.error('Error making Paystack API request:', error);
    throw new Error('Failed to communicate with Paystack API');
  }
}

/**
 * Formats a Paystack API error for user-friendly display
 * @param error Error object
 * @returns Formatted error message
 */
export function formatPaystackError(error: unknown): string {
  if (error instanceof AxiosError && error.response) {
    const statusCode = error.response.status;
    const errorData = error.response.data;
    const message = errorData.message || 'Unknown error';

    return `Paystack API Error (${statusCode}): ${message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred';
}

/**
 * Validates that required fields are present
 * @param obj Object to validate
 * @param fields Required fields
 * @returns Error message or null if valid
 */
export function validateRequiredFields(
  obj: Record<string, any>,
  fields: string[]
): string | null {
  const missingFields = fields.filter((field) => {
    return obj[field] === undefined || obj[field] === null || obj[field] === '';
  });

  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(', ')}`;
  }

  return null;
}

/**
 * Format a currency amount for display
 * @param amount Amount in smallest currency unit (e.g., kobo)
 * @param currency Currency code (e.g., NGN)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = 'NGN'): string {
  // Convert from smallest currency unit (e.g., kobo to naira)
  const decimalAmount = amount / 100;

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
  }).format(decimalAmount);
}

/**
 * Format a date string to a more readable format
 * @param dateString ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    return dateString; // Return original if parsing fails
  }
}
