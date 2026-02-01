import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

async function testBedrockAccess() {
  console.log('Testing AWS Bedrock access...\n');

  const client = new BedrockRuntimeClient({
    region: 'us-east-1',
  });

  // Use cross-region inference profile for Claude 3.5 Sonnet
  const modelId = 'us.anthropic.claude-3-5-sonnet-20241022-v2:0';
  
  const payload = {
    anthropic_version: 'bedrock-2023-05-31',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: 'What is AWS Lambda?',
      },
    ],
  };

  try {
    const command = new InvokeModelCommand({
      modelId,
      body: JSON.stringify(payload),
      contentType: 'application/json',
      accept: 'application/json',
    });

    console.log(`Invoking model: ${modelId}`);
    console.log('Query: "What is AWS Lambda?"\n');

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    console.log('✅ Bedrock invocation successful!\n');
    console.log('Response:');
    console.log(responseBody.content[0].text);
    console.log('\n✅ AWS Bedrock access verified');
  } catch (error) {
    console.error('❌ Bedrock invocation failed:');
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      
      if (error.message.includes('AccessDenied')) {
        console.error('\nTroubleshooting:');
        console.error('1. Check model access in AWS Console:');
        console.error('   https://console.aws.amazon.com/bedrock/home#/modelaccess');
        console.error('2. Ensure Claude Sonnet 4 model is enabled');
        console.error('3. Verify IAM permissions for bedrock:InvokeModel');
      }
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

testBedrockAccess();
