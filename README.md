# Paystack MCP Server

The Paystack [Model Context Protocol](https://modelcontextprotocol.com/) (MCP) server allows AI agents to interact with Paystack through standardized MCP clients via tool calling. This protocol supports various tools to interact with different Paystack services.

## Features

- Create and manage products in your Paystack store
- Handle customer management (create, list, update, validate)
- Process transactions (initialize, verify, charge authorization)
- Manage authorizations and payments
- Access bank information and country data
- Export transaction data and view transaction totals

## Setup

Make sure to replace `your_paystack_secret_key_here` with your actual Paystack secret key.

<details>
<summary> Installing via Smithery</summary>

To install Paystack MCP for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@kohasummons/paystack-mcp):

```bash
npx -y @smithery/cli install @kohasummons/paystack-mcp --client claude
```

#### Manual Installation
```bash
npm install -g @kohasummons/paystack-mcp
```


### Usage

Start the server by running:

```bash
paystack-mcp
```

Or use with `npx` in your MCP configuration:

```json
{
  "mcpServers": {
    "paystack-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@kohasummons/paystack-mcp"
      ],
"env": {
        "PAYSTACK_SECRET_KEY": "your_paystack_secret_key_here"
      }
    }
  }
}
```
</details>

<details>

<summary> Using with Claude Desktop</summary>

Add the following to your `claude_desktop_config.json`. See [here](https://modelcontextprotocol.io/quickstart/user) for more details.

```json
{
  "mcpServers": {
    "paystack-mcp": {
      "command": "npx",
      "args": ["-y", "@kohasummons/paystack-mcp"],
      "env": {
        "PAYSTACK_SECRET_KEY": "your_paystack_secret_key_here"
      }
    }
  }
}
```
</details>

<details>

<summary> Using with Goose</summary>

Copy and paste the link below into a browser address bar to add this extension to goose desktop:

```
goose://extension?cmd=npx&arg=-y&arg=@kohasummons/paystack-mcp&id=paystack-mcp&name=Paystack%20MCP&description=process%20payments%20with%20Paystack
```

After installation, set your Paystack secret key in the extension settings.


</details>

<details>
<summary> Using with CLI</summary>

Install the package globally:
```bash
npm install -g @kohasummons/paystack-mcp
```

Set your Paystack secret key as an environment variable:
```bash
export PAYSTACK_SECRET_KEY=your_paystack_secret_key_here  # For macOS/Linux
# OR
set PAYSTACK_SECRET_KEY=your_paystack_secret_key_here     # For Windows
```

Start the server by running:
```bash
paystack-mcp
```

Or use with NPX directly:
```bash
PAYSTACK_SECRET_KEY=your_paystack_secret_key_here npx -y @kohasummons/paystack-mcp
```
</details>

<details>
<summary> Using with Cursor</summary>

Add this to your Cursor MCP configuration:

```json
{
  "mcpServers": {
    "paystack-mcp": {
      "command": "npx",
      "args": ["-y", "@kohasummons/paystack-mcp"],
      "env": {
        "PAYSTACK_SECRET_KEY": "your_paystack_secret_key_here"
      }
    }
  }
}
```
</details>

<details>
<summary> Using with Docker</summary>

You can run the Paystack MCP server via Docker:

### Build the image
```bash
docker-compose build
```

### Run as a standalone server
```bash
docker-compose up -d
```

#### Use with Cursor
Add to your `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "paystack-mcp": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e", 
        "PAYSTACK_SECRET_KEY=your_paystack_secret_key_here",
        "kohasummons/paystack-mcp"
      ]
    }
  }
}
```

#### Use with Claude Desktop
```json
{
  "mcpServers": {
    "paystack-mcp": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e", 
        "PAYSTACK_SECRET_KEY=your_paystack_secret_key_here",
        "kohasummons/paystack-mcp"
      ]
    }
  }
}
```

See [DOCKER.md](DOCKER.md) for detailed Docker instructions.
</details>

## Tools

### Products

| Tool | Description | Example Prompt |
| ---- | ----------- | -------------- |
| create_product | Create a new product | "Create a new product called 'Premium Plan' with a price of 5000 naira" |
| list_products | List all products | "Show me all the products in my Paystack store" |
| get_product | Get details of a specific product | "Get the details of product ID 12345" |
| update_product | Update an existing product's details | "Update the price of product ID 12345 to 6000 naira" |

### Customers

| Tool | Description | Example Prompt |
| ---- | ----------- | -------------- |
| create_customer | Create a new customer | "Create a new customer with email john@example.com" |
| list_customers | List all customers  | "Show me all my customers" |
| get_customer | Get details of a specific customer | "Get the details for customer with email john@example.com" |
| update_customer | Update a customer's details | "Update John Doe's phone number to +2341234567890" |
| validate_customer | Validate a customer's identity with their bank account | "Verify customer CUS_123 with their bank account details" |
| set_customer_risk_action | Whitelist or blacklist a customer | "Blacklist customer CUS_123 from making transactions" |

### Transactions

| Tool | Description | Example Prompt |
| ---- | ----------- | -------------- |
| initialize_transaction | Initialize a payment transaction | "Start a new payment of 5000 naira for customer john@example.com" |
| verify_transaction | Verify the status of a transaction | "Check the status of transaction with reference TR_123456" |
| fetch_transaction | Get details of a transaction | "Get details of transaction ID 12345" |
| list_transactions | List transactions with various filters | "Show me all successful transactions in the last month" |
| charge_authorization | Charge a previously authorized card | "Charge customer john@example.com 5000 naira using their saved card" |
| partial_debit | Charge a partial amount from authorized card | "Charge a partial amount of 3000 naira from john@example.com's saved card" |
| deactivate_authorization | Deactivate a payment authorization | "Remove the saved card with authorization code AUTH_123" |
| transaction_totals | Get total amount received on your account | "What's the total amount received in my account last month?" |
| export_transactions | Export a list of transactions | "Export all my transactions from January 2023" |

### Banking Information

| Tool | Description | Example Prompt |
| ---- | ----------- | -------------- |
| list_banks | Get a list of banks supported by Paystack | "Show me all supported banks in Nigeria" |
| list_countries | Get a list of countries supported by Paystack | "Which countries does Paystack support?" |
| list_states | Get a list of states for a country | "List all states in Nigeria for address verification" |

## Contributing

We welcome contributions to help improve this project and implement the remaining Paystack API endpoints! There are many more Paystack features that could be added as tools, including:

- Payment Pages
- Subaccounts
- Plans
- Subscriptions
- Apple Pay
- Virtual Accounts
- Invoices
- Refunds
- And more!

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions on how to contribute, including:
- Setting up your development environment
- Guide for implementing new tools
- Code style guidelines
- Pull request process

---

## Development

To work on this project:

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Run the Inspector: `npm run dev:debug`

You'll need to set up your Paystack secret key as an environment variable:

```bash
# Create a .env file in the project root
echo "PAYSTACK_SECRET_KEY=your_paystack_secret_key_here" > .env
```

### Debugging

To debug your server, you can use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector).

First build the server

```
npm run build
```

Run the following command in your terminal:

```bash
# Start MCP Inspector and server
npm run dev:debug
```

Add your `PAYSTACK_SECRET_KEY` to the enviroment variable in the Inspector UI. Debug away!

### Docker Support

See [DOCKER.md](DOCKER.md) for details on building and running with Docker.

## License

ISC
