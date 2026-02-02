/**
 * Example 06: MCP Integration - AWS Documentation Access
 * 
 * **Purpose**: Demonstrate how to integrate the AWS Documentation MCP (Model Context Protocol)
 * server with a Strands agent. This allows the agent to access real-time AWS documentation,
 * best practices, and architectural guidance when answering questions.
 * 
 * **What is MCP?**
 * Model Context Protocol (MCP) is a standardized protocol that allows AI agents to:
 * - Access external data sources in real-time
 * - Query documentation without training on it
 * - Get up-to-date information that changes frequently
 * - Connect to multiple data sources simultaneously
 * 
 * **AWS Documentation MCP Server**
 * The `awslabs.aws-documentation-mcp-server` provides:
 * - AWS service documentation (EC2, S3, Lambda, etc.)
 * - AWS Well-Architected Framework content
 * - Best practices and design patterns
 * - Security and compliance guidelines
 * - Cost optimization strategies
 * 
 * **How This Example Works**
 * 1. Creates MCP client connected to AWS docs server
 * 2. Creates agent with MCP client attached
 * 3. Asks two questions requiring AWS documentation:
 *    - High availability best practices
 *    - Well-Architected Framework pillars
 * 4. Agent automatically queries MCP server for relevant content
 * 5. Returns answers backed by official AWS documentation
 * 
 * **Key Concepts**
 * - **StdioClientTransport**: Communicates with MCP server via stdin/stdout
 * - **Connection Wait**: MCP server needs startup time (~2 seconds)
 * - **McpClient**: Handles communication protocol with MCP server
 * - **Agent Integration**: Agent automatically uses MCP when needed
 * 
 * **When to Use MCP**
 * - Questions requiring current/accurate documentation
 * - Scenarios where hallucination risk is high
 * - Multi-source data integration (future: combine multiple MCP servers)
 * - Domain-specific knowledge bases
 * 
 * **Comparison: MCP vs RAG**
 * - **MCP**: Real-time, standardized protocol, maintained by data owner
 * - **RAG**: Custom implementation, requires vector DB, data staleness risk
 * - **Use MCP when**: Official server exists, real-time updates needed
 * - **Use RAG when**: Custom data, no MCP server available
 * 
 * **Prerequisites**
 * - Python 3.8+ installed (`python3 --version`)
 * - uvx installed (`brew install uv` on macOS)
 * - AWS_REGION environment variable set
 * 
 * **Expected Output**
 * ```
 * 🔌 Connecting to AWS Documentation MCP server...
 * ✓ MCP client connected successfully
 * 
 * 📚 Query 1: AWS best practices for high availability
 * [Agent retrieves AWS docs on Multi-AZ, Auto Scaling, health checks, etc.]
 * 
 * 📚 Query 2: What are the Well-Architected Framework pillars?
 * [Agent lists 6 pillars: Operational Excellence, Security, Reliability, etc.]
 * 
 * ✓ MCP connection closed
 * ```
 * 
 * **Troubleshooting**
 * - **Connection timeout**: Increase connectionWaitMs in createAwsDocsMCP()
 * - **uvx not found**: Install with `brew install uv` or `pip install uv`
 * - **Python errors**: Ensure Python 3.8+ with `python3 --version`
 * - **Slow responses**: MCP queries take 5-15 seconds (fetching docs)
 * - **No AWS_REGION**: Set with `export AWS_REGION=us-east-1`
 * 
 * **Advanced Patterns**
 * ```typescript
 * // Multiple MCP servers simultaneously
 * const awsDocs = await createAwsDocsMCP();
 * const customDocs = await createCustomMCP();
 * const agent = new Agent({ mcpClient: [awsDocs, customDocs] });
 * 
 * // Custom connection timeout for slow networks
 * const mcpClient = await createAwsDocsMCP(5000); // 5 seconds
 * 
 * // Error handling with retry
 * let mcpClient;
 * for (let i = 0; i < 3; i++) {
 *   try {
 *     mcpClient = await createAwsDocsMCP();
 *     break;
 *   } catch (error) {
 *     console.log(`Retry ${i + 1}/3...`);
 *     await new Promise(r => setTimeout(r, 2000));
 *   }
 * }
 * ```
 * 
 * @see {@link src/tools/mcpClient.ts} for implementation details
 * @see {@link examples/07-mcp-scenarios.ts} for more complex MCP usage
 */

import { Agent, BedrockModel } from '@strands-agents/sdk';
import { createAwsDocsMCP } from '../src/tools/mcpClient.js';

async function main() {
  // Create MCP client connected to AWS Documentation server
  // This establishes a stdio connection to the MCP server subprocess
  const mcpClient = await createAwsDocsMCP();

  // Create agent with MCP client attached via tools parameter
  // Agent will automatically query MCP when it needs AWS documentation
  const agent = new Agent({
    systemPrompt: 'You are an AWS architecture expert. Use the AWS documentation to provide accurate, up-to-date answers.',
    model: new BedrockModel({
      modelId: process.env.AWS_BEDROCK_MODEL_ID || 'us.anthropic.claude-3-5-sonnet-20241022-v2:0',
      region: process.env.AWS_REGION || 'us-east-1',
      temperature: 0.3, // Lower temperature for factual documentation-based answers
      maxTokens: 4096,
    }),
    tools: [mcpClient], // Attach MCP client as a tool for documentation access
  });

  // Query 1: High availability best practices
  console.log('\n📚 Query 1: AWS best practices for high availability\n');
  const response1 = await agent.invoke(
    'What are AWS best practices for designing high availability systems? Focus on the most important architectural patterns.'
  );
  console.log(response1);

  // Query 2: Well-Architected Framework
  console.log('\n📚 Query 2: What are the Well-Architected Framework pillars?\n');
  const response2 = await agent.invoke(
    'List and briefly explain the AWS Well-Architected Framework pillars.'
  );
  console.log(response2);

  // Clean up: Disconnect MCP client
  await mcpClient.disconnect();
  console.log('\n✓ MCP connection closed');
}

// Run the example
main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
