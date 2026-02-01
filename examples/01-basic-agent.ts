import { Agent } from '@strands-agents/sdk';

async function basicAgentExample() {
  console.log('Example 1: Basic Agent\n');
  console.log('Creating agent with default Bedrock model (Claude 3.5 Sonnet)...\n');

  // Create agent with default Bedrock model
  const agent = new Agent({
    systemPrompt: 'You are a helpful assistant.',
  });

  // Invoke agent with a question
  const query = 'What is AWS Lambda?';
  console.log(`Query: "${query}"\n`);

  const result = await agent.invoke(query);
  
  console.log('Agent response:');
  console.log(result.lastMessage);
  console.log('\n✅ Basic agent example completed successfully');
}

basicAgentExample().catch(console.error);
