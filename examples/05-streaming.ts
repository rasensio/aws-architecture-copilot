/**
 * Example 5: Streaming Responses
 * 
 * This example demonstrates how to stream agent responses token-by-token.
 * 
 * Key Concepts:
 * - Using agent.stream() instead of agent.invoke()
 * - Processing streaming events as they arrive
 * - Handling different event types
 * - Real-time user experience
 * 
 * Streaming vs Non-Streaming:
 * 
 * agent.invoke():
 * - Waits for complete response
 * - Returns all text at once
 * - Simpler to use
 * - Better for programmatic processing
 * 
 * agent.stream():
 * - Returns text as it's generated
 * - Progressive display (like ChatGPT)
 * - Better user experience for long responses
 * - More complex to handle
 * 
 * Event Types:
 * - modelContentBlockStartEvent: Response generation starts
 * - modelContentBlockDeltaEvent: New text chunk arrives
 * - modelContentBlockStopEvent: Response generation completes
 * - toolUseBlockStartEvent: Tool call begins
 * - toolUseBlockDeltaEvent: Tool parameters arrive
 * - And more...
 * 
 * Use Cases:
 * - Interactive chat interfaces
 * - Long-form content generation
 * - Real-time feedback to users
 * - Reducing perceived latency
 * - Allowing users to interrupt generation
 * 
 * Performance:
 * - Streaming doesn't generate faster
 * - It displays results sooner
 * - Total time to completion is similar
 * - User perception of speed improves significantly
 */

import { Agent } from '@strands-agents/sdk';

async function streamingExample() {
  console.log('Example 5: Streaming Responses\n');

  // Create an agent (same as before)
  const agent = new Agent({
    systemPrompt: 'You are a creative storyteller.',
  });

  const query = 'Tell me a short story about a cloud architect.';
  console.log(`Query: "${query}"\n`);
  console.log('Streaming response:\n');
  console.log('---');

  // Use agent.stream() instead of agent.invoke()
  // This returns an async iterable of events
  // Each event represents a piece of the response as it's generated
  for await (const event of agent.stream(query)) {
    // Filter for text delta events
    // These contain the actual text chunks being generated
    if (event.type === 'modelContentBlockDeltaEvent' && event.delta.type === 'textDelta') {
      // Write each chunk immediately as it arrives
      // process.stdout.write() prints without adding newlines
      // This creates the "typewriter" effect
      process.stdout.write(event.delta.text);
    }
    
    // You can handle other event types too:
    // 
    // if (event.type === 'modelContentBlockStartEvent') {
    //   console.log('\n[Generation started]');
    // }
    // 
    // if (event.type === 'modelContentBlockStopEvent') {
    //   console.log('\n[Generation completed]');
    // }
    // 
    // if (event.type === 'toolUseBlockStartEvent') {
    //   console.log(`\n[Tool called: ${event.name}]`);
    // }
  }

  console.log('\n---');
  console.log('\n✅ Streaming example completed successfully');
  
  // Advanced Streaming Patterns:
  // 
  // 1. Accumulate while streaming:
  //    let fullResponse = '';
  //    for await (const event of agent.stream(query)) {
  //      if (event.type === 'modelContentBlockDeltaEvent') {
  //        fullResponse += event.delta.text;
  //        process.stdout.write(event.delta.text);
  //      }
  //    }
  // 
  // 2. Stream to a UI component:
  //    for await (const event of agent.stream(query)) {
  //      if (event.type === 'modelContentBlockDeltaEvent') {
  //        chatUI.appendText(event.delta.text);
  //      }
  //    }
  // 
  // 3. Handle errors during streaming:
  //    try {
  //      for await (const event of agent.stream(query)) {
  //        // Process events
  //      }
  //    } catch (error) {
  //      console.error('Stream interrupted:', error);
  //    }
}

streamingExample().catch(console.error);
