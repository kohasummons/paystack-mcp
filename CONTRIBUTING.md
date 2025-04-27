# Contributing to Paystack MCP Server

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to Paystack MCP. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/kohasummons/paystack-mcp-server.git
   cd paystack-mcp-server
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Build the project**:
   ```bash
   npm run build
   ```
5. **Set up your environment**:
   ```bash
   echo "PAYSTACK_SECRET_KEY=your_test_key_here" > .env
   ```

## Development Workflow

1. **Create a new branch** for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

   or

   ```bash
   git checkout -b fix/issue-you-are-fixing
   ```

2. **Make your changes** and test them thoroughly

3. **Commit your changes** with a clear and descriptive commit message:

   ```bash
   git commit -am "Add feature: your feature description"
   ```

4. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** from your fork to the main repository

## Adding New Tools

We encourage contributions that add support for more Paystack API endpoints. Here's how to add a new tool:

1. **Identify the Paystack API endpoint** you want to implement
2. **Add a schema type** in the appropriate file under `src/types/`
3. **Add/update service functions** in an appropriate file under `src/tools/`
4. **Register the tool** in the same file

Example tool implementation

```typescript
  server.tool(
    "new_tool_name",
    "Detailed description of what this tool does",
    newToolSchema,
    async (params) => {
      try {
        const result = await newToolService(params);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown_Error';
        return {
          content: [
            {
              type: "text",
              text: errorMessage
            }
          ],
          isError: true
        };
      }
    },
  );
}
```

You'll also need to define a schema in your types file:

```typescript
// In your types file
import {z} from 'zod';

export const newToolSchema = z.object({
  required_field1: z.string().describe('Description of required field 1'),
  required_field2: z.number().describe('Description of required field 2'),
  optional_field: z
    .string()
    .optional()
    .describe('Description of optional field'),
});
```

5. **Update the index.js** to include your tool registration
6. **Update the README.md** to include your new tool in the Tools section

## Opportunities to Contribute

Here are some Paystack API endpoints that still need to be implemented:

- Payment Pages
- Subaccounts
- Plans
- Subscriptions
- Apple Pay
- Dedicated Virtual Accounts
- Invoices
- Refunds
- Settlements
- Payment Requests
- Disputes
- Transfers
- Transfer Recipients

## Code Style Guidelines

- Follow the existing code style in the project
- Use TypeScript for all new code
- Include JSDoc comments for functions and parameters
- Use async/await for asynchronous operations
- Follow the Single Responsibility Principle
- Write clean, readable code

## Pull Request Process

1. Update the README.md with details of your changes (if needed)
2. Verify that your PR description clearly describes the changes you've made
3. A maintainer will review your PR and may request changes
4. Once approved, your PR will be merged

## Questions?

If you have any questions or need help with your contribution, please feel free to open an issue for discussion.

Thank you for contributing to make the Paystack MCP better!
