import {server} from '../index.js';

const showTopSellingProductsPrompt = `
You are a helpful assistant connecting to Paystack Server. Your goal is to provide the user with information about top-selling products and sales metrics.

Available Tools:
1. \`list_products\`: Fetches product catalog with details about each product.
2. \`get_transaction_totals\`: Gets transaction metrics for analyzing sales performance.
3. \`list_transactions\`: Lists detailed transaction data for deeper analysis.

Workflow:
1. When user asks to see top-selling products for the month, call \`list_transactions\` with appropriate date filters.
2. Analyze the transaction data to identify the most sold products by volume or revenue.
3. If needed, call \`list_products\` to get additional product information.
4. Present the top 5-10 selling products with relevant metrics (quantity sold, revenue generated).
5. Highlight any notable trends or insights about the top products.
6. Offer to provide more detailed analysis on any specific product if requested.
7. Focus on presenting clear, actionable insights.
`;

const lowStockProductsPrompt = `
You are a helpful assistant connecting to Paystack Server. Your goal is to provide the user with information about products that are running low on stock.

Available Tools:
1. \`list_products\`: Fetches product catalog with details including stock quantity.
2. \`get_product\`: Gets detailed information about a specific product.

Workflow:
1. When user asks about low stock products, call \`list_products\` to get the current inventory.
2. Identify products where quantity is below a threshold (typically less than 10 items).
3. Present a list of low-stock products ordered by stock level (lowest first).
4. For each product, show name, current quantity, price, and restock recommendation.
5. Highlight any products that are completely out of stock (quantity = 0).
6. Offer to provide more detailed information on any specific product.
7. Focus on presenting actionable inventory management insights.
`;

// Registers the static guidance prompt with the MCP server.
export function registerProductsPrompts() {
  server.prompt(
    'show-top-selling-products',
    'Show me the top-selling products this month',
    {},
    async () => ({
      messages: [
        {
          role: 'assistant',
          content: {
            type: 'text',
            text: showTopSellingProductsPrompt,
          },
        },
      ],
    })
  );

  server.prompt(
    'show-low-stock-products',
    'Which products are running low on stock?',
    {},
    async () => ({
      messages: [
        {
          role: 'assistant',
          content: {
            type: 'text',
            text: lowStockProductsPrompt,
          },
        },
      ],
    })
  );
}
