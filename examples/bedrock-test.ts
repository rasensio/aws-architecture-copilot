/**
 * Bedrock Access Test
 * 
 * This script tests AWS Bedrock access and configuration.
 * 
 * Purpose:
 * - Verify AWS credentials are configured
 * - Confirm Bedrock model access is enabled
 * - Test basic model invocation
 * - Validate API connectivity
 * 
 * Prerequisites:
 * 1. AWS CLI configured with valid credentials
 * 2. AWS Bedrock model access enabled in console
 * 3. Cross-region inference profiles enabled
 * 
 * What this tests:
 * - AWS SDK client initialization
 * - Bedrock API authentication
 * - Model availability in us-east-1
 * - Request/response format
 * - Error handling and troubleshooting
 * 
 * Common Issues:
 * - "AccessDenied": Check IAM permissions for bedrock:InvokeModel
 * - "Invalid model identifier": Verify model ID and region
 * - "Model not available": Enable model access in Bedrock console
 * - Network errors: Check internet connectivity and AWS endpoints
 * 
 * Note: This uses the raw AWS SDK instead of Strands
 * to isolate Bedrock connectivity issues from framework issues.
 */

import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

async function testBedrockAccess() {
  console.log('Testing AWS Bedrock access...\n');

  // Create Bedrock client
  // Uses default AWS credentials from:
  // - Environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
  // - AWS credentials file (~/.aws/credentials)
  // - IAM role (if running on EC2/ECS/Lambda)
  const client = new BedrockRuntimeClient({
    region: 'us-east-1',
  });

  // Use cross-region inference profile for Claude 3.5 Sonnet
  // Format: us.anthropic.claude-{model}-{version}
  // Cross-region profiles provide:
  // - Better availability (multi-region failover)
  // - Load balancing across regions
  // - Lower latency through intelligent routing
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
