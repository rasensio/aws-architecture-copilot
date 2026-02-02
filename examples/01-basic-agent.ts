/**
 * Example 1: Basic Agent
 * 
 * This example demonstrates the simplest way to create and use a Strands agent.
 * 
 * Key Concepts:
 * - Creating an Agent with a system prompt
 * - Using the default Bedrock model (Claude 3.5 Sonnet)
 * - Invoking the agent with a text query
 * - Accessing the agent's response
 * 
 * The Agent class is the core building block of Strands. It handles:
 * - Communication with AWS Bedrock
 * - Message history management
 * - System prompt injection
 * - Response formatting
 * 
 * By default, the agent uses:
 * - Model: Claude 3.5 Sonnet (us.anthropic.claude-3-5-sonnet-20241022-v2:0)
 * - Region: us-east-1
 * - Temperature: 1.0 (balanced creativity/focus)
 * - Max Tokens: 4096
 */

import { Agent } from '@strands-agents/sdk';

async function basicAgentExample() {
  console.log('Example 1: Basic Agent\n');
  console.log('Creating agent with default Bedrock model (Claude 3.5 Sonnet)...\n');

  // Create agent with a system prompt
  // The system prompt defines the agent's behavior and personality
  const agent = new Agent({
    systemPrompt: 'You are a helpful assistant.',
  });

  // Invoke the agent with a user query
  // The invoke() method:
  // 1. Sends the message to AWS Bedrock
  // 2. Waits for the complete response
  // 3. Returns a result object with the response and metadata
  const query = 'What is AWS Lambda?';
  console.log(`Query: "${query}"\n`);

  const result = await agent.invoke(query);
  
  // Access the agent's response
  // result.lastMessage contains the most recent assistant message
  // This is a Message object with type, role, and content fields
  console.log('Agent response:');
  console.log(result.lastMessage);
  console.log('\n✅ Basic agent example completed successfully');
  
  // Note: The agent maintains conversation history internally
  // You can call agent.invoke() multiple times for a conversation
}

basicAgentExample().catch(console.error);
