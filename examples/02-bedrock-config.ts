/**
 * Example 2: Custom Bedrock Configuration
 * 
 * This example shows how to customize the underlying Bedrock model configuration.
 * 
 * Key Concepts:
 * - Creating a BedrockModel with custom parameters
 * - Understanding model configuration options
 * - Choosing appropriate settings for different use cases
 * 
 * Model Configuration Options:
 * 
 * 1. region: AWS region where Bedrock is hosted
 *    - Affects latency and data residency
 *    - Use the region closest to your users
 * 
 * 2. modelId: Specific Claude model to use
 *    - Format: us.anthropic.claude-{version} (cross-region inference profile)
 *    - Cross-region profiles provide better availability and load balancing
 * 
 * 3. temperature: Controls randomness/creativity (0.0 - 1.0)
 *    - 0.0: Most deterministic, focused, consistent
 *    - 0.3: Good for technical/factual responses (used here)
 *    - 0.7: Balanced creativity and focus
 *    - 1.0: Most creative, varied responses
 * 
 * 4. maxTokens: Maximum response length
 *    - 256: Short, concise answers
 *    - 1024: Medium responses
 *    - 4096: Detailed explanations (used here)
 *    - 8192+: Long-form content
 */

import { Agent, BedrockModel } from '@strands-agents/sdk';

async function bedrockConfigExample() {
  console.log('Example 2: Custom Bedrock Configuration\n');

  // Create a custom BedrockModel instance
  // This gives you fine-grained control over model behavior
  const model = new BedrockModel({
    region: 'us-east-1',
    // Cross-region inference profile for better availability
    modelId: 'us.anthropic.claude-3-5-sonnet-20241022-v2:0',
    // Lower temperature for more focused, deterministic responses
    // Perfect for technical architecture guidance
    temperature: 0.3,
    // Allow detailed responses for complex architectural explanations
    maxTokens: 4096,
  });

  console.log('Custom BedrockModel configuration:');
  console.log('- Region: us-east-1');
  console.log('- Model: Claude 3.5 Sonnet (cross-region inference profile)');
  console.log('- Temperature: 0.3 (more focused, less creative)');
  console.log('- Max Tokens: 4096\n');

  // Pass the custom model to the agent
  // The agent will use this configuration for all invocations
  const agent = new Agent({
    model,
    systemPrompt: 'You are an AWS architecture expert.',
  });

  // Test with a technical architecture question
  // The lower temperature should provide consistent, focused answers
  const query = 'What are the key components of a scalable web application on AWS?';
  console.log(`Query: "${query}"\n`);

  const result = await agent.invoke(query);

  console.log('Agent response:');
  console.log(result.lastMessage);
  console.log('\n✅ Custom Bedrock configuration example completed successfully');
  
  // Use Case Recommendations:
  // - Technical documentation: temperature 0.2-0.3
  // - Creative content: temperature 0.7-1.0
  // - General Q&A: temperature 0.5-0.7
  // - Code generation: temperature 0.2-0.4
}

bedrockConfigExample().catch(console.error);
