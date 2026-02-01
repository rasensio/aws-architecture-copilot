import { Agent, BedrockModel } from '@strands-agents/sdk';

async function bedrockConfigExample() {
  console.log('Example 2: Custom Bedrock Configuration\n');

  // Create custom Bedrock model with specific configuration
  const model = new BedrockModel({
    region: 'us-east-1',
    modelId: 'us.anthropic.claude-3-5-sonnet-20241022-v2:0',
    temperature: 0.3,
    maxTokens: 4096,
  });

  console.log('Custom BedrockModel configuration:');
  console.log('- Region: us-east-1');
  console.log('- Model: Claude 3.5 Sonnet (cross-region inference profile)');
  console.log('- Temperature: 0.3 (more focused, less creative)');
  console.log('- Max Tokens: 4096\n');

  // Create agent with custom model
  const agent = new Agent({
    model,
    systemPrompt: 'You are an AWS architecture expert.',
  });

  const query = 'What are the key components of a scalable web application on AWS?';
  console.log(`Query: "${query}"\n`);

  const result = await agent.invoke(query);

  console.log('Agent response:');
  console.log(result.lastMessage);
  console.log('\n✅ Custom Bedrock configuration example completed successfully');
}

bedrockConfigExample().catch(console.error);
