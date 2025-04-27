import dotenv from 'dotenv';
import {z} from 'zod';

dotenv.config();

// environment variable schema for validation
const envSchema = z.object({
  PAYSTACK_SECRET_KEY: z.string().min(1, 'Paystack Secret Key is required'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .optional()
    .default('development'),
});

// Parse and validate environment variables
const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error('❌ Invalid environment variables:', envParse.error.format());
  throw new Error('Invalid environment variables');
}

// Export validated config
export const config = {
  paystack: {
    secretKey: envParse.data.PAYSTACK_SECRET_KEY,
    apiUrl: 'https://api.paystack.co',
  },
  server: {
    environment: envParse.data.NODE_ENV,
  },
} as const;
