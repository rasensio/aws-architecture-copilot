/**
 * MCP Client Helper for AWS Documentation MCP Server
 * 
 * This module provides a helper function to create and connect to the AWS Documentation
 * MCP (Model Context Protocol) server. The MCP server provides access to AWS documentation,
 * best practices, and architectural guidance that can be used by agents to answer questions
 * with authoritative AWS content.
 * 
 * **What is MCP?**
 * Model Context Protocol (MCP) is a standardized protocol for connecting AI models to
 * external data sources and tools. It allows agents to access real-time information
 * without training on that data.
 * 
 * **AWS Documentation MCP Server**
 * The AWS Documentation MCP server (`awslabs.aws-documentation-mcp-server`) provides:
 * - Access to AWS service documentation
 * - AWS Well-Architected Framework content
 * - AWS best practices and patterns
 * - Architecture guidance and recommendations
 * 
 * **How It Works**
 * 1. Uses `uvx` to run the MCP server as a subprocess
 * 2. Establishes stdio-based communication (stdin/stdout)
 * 3. Waits for connection (default 2 seconds)
 * 4. Returns connected McpClient instance
 * 
 * **Usage in Agents**
 * ```typescript
 * import { Agent } from '@strands-agents/sdk';
 * import { createAwsDocsMCP } from './tools/mcpClient.js';
 * 
 * const mcpClient = await createAwsDocsMCP();
 * const agent = new Agent({
 *   systemPrompt: 'AWS architecture expert',
 *   mcpClient
 * });
 * 
 * const response = await agent.invoke('Best practices for high availability?');
 * await mcpClient.close(); // Clean up
 * ```
 * 
 * **Troubleshooting**
 * - Connection timeout: Increase `connectionWaitMs` parameter
 * - uvx not found: Install with `brew install uv` (macOS) or `pip install uv`
 * - Python errors: Ensure Python 3.8+ installed
 * - Server crashes: Check AWS_REGION environment variable set
 * 
 * @module mcpClient
 */

import { McpClient } from '@strands-agents/sdk';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

/**
 * Creates and connects to the AWS Documentation MCP server
 * 
 * @param connectionWaitMs - Milliseconds to wait for connection (default: 2000)
 * @returns Connected McpClient instance
 * @throws Error if connection fails or times out
 * 
 * @example
 * ```typescript
 * // Basic usage with default 2-second wait
 * const mcpClient = await createAwsDocsMCP();
 * 
 * // Custom connection timeout for slow networks
 * const mcpClient = await createAwsDocsMCP(5000);
 * 
 * // Always clean up when done
 * await mcpClient.close();
 * ```
 */
export async function createAwsDocsMCP(connectionWaitMs: number = 2000): Promise<McpClient> {
  console.log('🔌 Connecting to AWS Documentation MCP server...');
  
  // Create stdio transport to communicate with MCP server subprocess
  // uvx runs the MCP server package, handling Python environment automatically
  const transport = new StdioClientTransport({
    command: 'uvx',
    args: ['awslabs.aws-documentation-mcp-server@latest'],
  });

  // Create MCP client instance with transport config
  const mcpClient = new McpClient({ transport });

  // Connect to the MCP server
  await mcpClient.connect();
  
  // Wait a moment for server to fully initialize
  await new Promise((resolve) => setTimeout(resolve, connectionWaitMs));
  
  console.log('✓ MCP client connected successfully');
  
  return mcpClient;
}

/**
 * Example: Test MCP server connection
 * 
 * Uncomment and run to verify MCP setup:
 * ```bash
 * npx tsx src/tools/mcpClient.ts
 * ```
 */
// async function testMcpConnection() {
//   try {
//     const mcpClient = await createAwsDocsMCP();
//     console.log('✓ MCP server connection successful');
//     await mcpClient.close();
//     console.log('✓ Connection closed cleanly');
//   } catch (error) {
//     console.error('✗ MCP connection failed:', error);
//     process.exit(1);
//   }
// }
// 
// // Run test if this file is executed directly
// if (import.meta.url === `file://${process.argv[1]}`) {
//   testMcpConnection();
// }
