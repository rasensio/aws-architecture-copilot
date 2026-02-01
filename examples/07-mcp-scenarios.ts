/**
 * Example 07: MCP Scenarios - Multiple AWS Architecture Queries
 * 
 * **Purpose**: Demonstrate real-world AWS architecture scenarios using MCP documentation access.
 * This example shows how an agent can answer complex architectural questions by querying
 * AWS documentation for multiple services and best practices.
 * 
 * **Scenarios Covered**
 * 1. **Scalable Web Application**: Multi-tier architecture with ELB, Auto Scaling, RDS
 * 2. **ElastiCache for Session State**: Redis/Memcached for distributed session management
 * 3. **RDS Multi-AZ**: High availability database configuration with automatic failover
 * 4. **Lambda Best Practices**: Serverless function optimization and cold start mitigation
 * 
 * **Why These Scenarios?**
 * - **Real-world relevance**: Common architecture questions in enterprise projects
 * - **Multi-service queries**: Requires understanding of service interactions
 * - **Best practices focus**: Tests agent's ability to retrieve architectural guidance
 * - **Different complexity levels**: From simple explanations to detailed implementations
 * 
 * **How MCP Helps Here**
 * Without MCP:
 * - Agent relies on training data (potentially outdated)
 * - Risk of hallucinating non-existent features
 * - No access to latest service updates
 * 
 * With MCP:
 * - Retrieves current AWS documentation in real-time
 * - Gets accurate service specifications
 * - Includes recent feature additions
 * - Provides authoritative answers
 * 
 * **Agent Configuration**
 * - **Temperature 0.2**: Very low for maximum factual accuracy
 * - **maxTokens 4096**: Allows detailed multi-service explanations
 * - **System prompt**: Emphasizes architectural best practices
 * - **MCP client**: Provides AWS documentation access
 * 
 * **Expected Response Times**
 * - Each query: 5-15 seconds (MCP retrieval + LLM generation)
 * - First query: Slightly slower (MCP server warmup)
 * - Subsequent queries: Faster (MCP caching)
 * 
 * **Expected Output Structure**
 * For each scenario:
 * ```
 * ━━━ Scenario 1: Scalable Web Application ━━━
 * [Agent provides architecture overview]
 * - Components: ELB, Auto Scaling, EC2, RDS, etc.
 * - Best practices: Multi-AZ, health checks, monitoring
 * - Implementation steps: Setup, configuration, testing
 * ```
 * 
 * **Troubleshooting**
 * - **Slow queries (>30s)**: Check network connection, MCP server health
 * - **Generic answers**: Agent may not be using MCP - verify mcpClient attached
 * - **Connection drops**: MCP server crashed - restart with pkill/rerun
 * - **Python errors**: Check Python 3.8+ and uvx installed
 * 
 * **Advanced Usage**
 * ```typescript
 * // Chain multiple queries with context
 * const context = await agent.invoke('Explain VPC architecture');
 * const followUp = await agent.invoke(
 *   'Based on previous VPC answer, how do I add private subnets?'
 * );
 * 
 * // Compare different approaches
 * const ec2Approach = await agent.invoke('Web app architecture with EC2');
 * const lambdaApproach = await agent.invoke('Same app with Lambda + API Gateway');
 * 
 * // Cost optimization focus
 * const agent = new Agent({
 *   systemPrompt: 'AWS expert focused on cost optimization. Always suggest Reserved Instances, Spot Instances, and Savings Plans where applicable.',
 *   mcpClient
 * });
 * ```
 * 
 * **Comparison: With vs Without MCP**
 * | Aspect | Without MCP | With MCP |
 * |--------|------------|----------|
 * | Accuracy | Training data only | Current AWS docs |
 * | Freshness | Months old | Real-time |
 * | Service limits | May be outdated | Current limits |
 * | New features | Not aware | Includes latest |
 * | Response time | 2-5s | 5-15s |
 * | Hallucination risk | Higher | Lower |
 * 
 * **When to Use This Pattern**
 * - Architecture design consultations
 * - Technical interviews/assessments
 * - Documentation generation
 * - Migration planning (on-prem to AWS)
 * - Multi-service integration designs
 * 
 * @see {@link src/tools/mcpClient.ts} for MCP client implementation
 * @see {@link examples/06-mcp-integration.ts} for basic MCP usage
 */

import { Agent, BedrockModel } from '@strands-agents/sdk';
import { createAwsDocsMCP } from '../src/tools/mcpClient.js';

/**
 * Scenario definitions for testing MCP-backed architecture queries
 */
const scenarios = [
  {
    title: 'Scalable Web Application',
    query: 'How do I design a scalable web application on AWS? Include load balancing, auto scaling, and database layers.',
  },
  {
    title: 'ElastiCache for Session State',
    query: 'How should I use ElastiCache for storing user session state in a web application? What are the best practices?',
  },
  {
    title: 'RDS Multi-AZ Configuration',
    query: 'Explain RDS Multi-AZ deployment. How does failover work and what are the performance implications?',
  },
  {
    title: 'Lambda Best Practices',
    query: 'What are the top 5 AWS Lambda best practices for production workloads? Focus on performance and reliability.',
  },
];

async function main() {
  // Create MCP client for AWS documentation access
  const mcpClient = await createAwsDocsMCP();

  // Create agent optimized for architectural guidance
  const agent = new Agent({
    systemPrompt: `You are an AWS Solutions Architect with deep expertise in designing scalable, reliable, and cost-effective systems.
    
When answering architecture questions:
1. Start with a high-level overview
2. List key AWS services involved
3. Explain best practices and design patterns
4. Mention important considerations (cost, performance, security)
5. Be concise but comprehensive

Use the AWS documentation to ensure accuracy.`,
    model: new BedrockModel({
      modelId: process.env.AWS_BEDROCK_MODEL_ID || 'us.anthropic.claude-3-5-sonnet-20241022-v2:0',
      region: process.env.AWS_REGION || 'us-east-1',
      temperature: 0.2, // Very low for factual accuracy
      maxTokens: 4096,
    }),
    tools: [mcpClient], // Attach MCP client as a tool
  });

  // Process each scenario sequentially
  for (let i = 0; i < scenarios.length; i++) {
    const scenario = scenarios[i];
    
    console.log(`\n${'━'.repeat(60)}`);
    console.log(`📋 Scenario ${i + 1}: ${scenario.title}`);
    console.log('━'.repeat(60));
    console.log(`\n❓ Query: ${scenario.query}\n`);
    console.log('🔍 Retrieving AWS documentation and generating response...\n');

    try {
      const response = await agent.invoke(scenario.query);
      console.log(response);
    } catch (error) {
      console.error(`\n❌ Error processing scenario ${i + 1}:`, error);
    }

    // Add a brief pause between scenarios for readability
    if (i < scenarios.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Summary
  console.log(`\n${'━'.repeat(60)}`);
  console.log('✅ All scenarios completed');
  console.log('━'.repeat(60));

  // Clean up
  await mcpClient.disconnect();
  console.log('\n✓ MCP connection closed');
}

// Run the example
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
