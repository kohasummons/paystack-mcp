#!/usr/bin/env node
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';

import {registerTools} from './tools/index.js';
import {registerPrompts} from './prompts/index.js';
/**
 * Initialize and configure the MCP server
 */
export const server = new McpServer({
  name: 'paystack-mcp',
  version: '0.1.0',
});

// Load the capabilities
registerTools();
registerPrompts();

/**
 * Entry point: Start the MCP Paystack server
 */
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error('Paystack MCP Server is running');

    // Handle process termination
    process.on('SIGINT', async () => {
      console.error('Shutting down Paystack MCP Server...');
      await server.close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.error('Shutting down Paystack MCP Server...');
      await server.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('Error starting Paystack MCP server:', error);
    process.exit(1);
  }
}

// Start the server
main().catch((error: Error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
