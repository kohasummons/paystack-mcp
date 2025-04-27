// Paystack API response structure
export interface PaystackResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

// Pagination metadata
export interface PaginationMeta {
  total: number;
  skipped: number;
  perPage: number;
  page: number;
  pageCount: number;
}

// Paystack response with pagination
export interface PaystackPaginatedResponse<T> extends PaystackResponse<T[]> {
  meta: PaginationMeta;
} 