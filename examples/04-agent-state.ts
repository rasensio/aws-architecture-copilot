/**
 * Example 4: Agent State Management
 * 
 * This example demonstrates how to maintain persistent state across agent invocations.
 * 
 * Key Concepts:
 * - Initializing agent with state
 * - Accessing agent state from tool callbacks
 * - Modifying state values
 * - State persistence across multiple invocations
 * 
 * Agent State:
 * - State is a key-value store attached to the agent
 * - Persists throughout the agent's lifetime
 * - Accessible in tool callbacks via context.agent.state
 * - Can store any serializable data (numbers, strings, objects, arrays)
 * 
 * Use Cases for State:
 * - Maintaining conversation context
 * - Tracking user preferences
 * - Counting operations or events
 * - Caching computed results
 * - Storing session data
 * - Building multi-step workflows
 * 
 * State vs Message History:
 * - State: Structured data for tools and logic
 * - Message History: Conversation context for the LLM
 * - Both are maintained separately and serve different purposes
 * 
 * Important Notes:
 * - State is NOT persisted to disk by default
 * - State is NOT shared between different agent instances
 * - For persistence, implement your own storage (database, file system)
 */

import { Agent, tool } from '@strands-agents/sdk';
import { z } from 'zod';

async function agentStateExample() {
  console.log('Example 4: Agent State Management\n');

  // Define a tool that reads and modifies agent state
  // The context parameter provides access to the agent instance
  const counterTool = tool({
    name: 'increment_counter',
    description: 'Increments a counter stored in agent state',
    
    // Empty schema - this tool doesn't need input parameters
    inputSchema: z.object({}),
    
    // The callback receives two parameters:
    // 1. input: The validated tool parameters
    // 2. context: Object containing { agent, ... }
    callback: (input, context) => {
      // Always check if context is available
      // Context is required to access agent state
      if (!context) {
        throw new Error('Context required for state management');
      }

      // Read current counter value from state
      // state.get() returns the value or undefined if not set
      // We use type assertion and nullish coalescing for type safety
      const currentCount = (context.agent.state.get('counter') as number) ?? 0;
      
      // Calculate new value
      const newCount = currentCount + 1;
      
      // Update state with new value
      // state.set() modifies the state for all subsequent operations
      context.agent.state.set('counter', newCount);

      console.log(`🔢 Counter incremented: ${currentCount} → ${newCount}`);
      
      // Return a user-friendly message
      return `Counter incremented to ${newCount}`;
    },
  });

  // Create agent with initial state
  // The state object defines initial values for state keys
  const agent = new Agent({
    state: { counter: 0 },
    systemPrompt: 'You are a helpful assistant. Use the increment_counter tool when asked to count.',
    tools: [counterTool],
  });

  // Access state directly from the agent
  console.log('Initial counter value:', agent.state.get('counter'));
  console.log('\nIncrementing counter 3 times...\n');

  // Make multiple invocations
  // Each invocation can access and modify the same state
  await agent.invoke('Increment the counter');
  await agent.invoke('Increment it again');
  await agent.invoke('Increment one more time');

  // Verify final state
  const finalCount = agent.state.get('counter');
  console.log(`\nFinal counter value: ${finalCount}`);
  console.log('\n✅ Agent state management example completed successfully');
  
  // State persisted across all three invocations
  if (finalCount === 3) {
    console.log('✅ Counter reached expected value of 3');
  }
  
  // Advanced State Patterns:
  // 
  // 1. Complex State Objects:
  //    state: { 
  //      user: { name: 'Alice', preferences: {...} },
  //      sessionData: [...]
  //    }
  // 
  // 2. State Validation:
  //    Always validate state values before use
  //    Use type guards or Zod schemas
  // 
  // 3. State Persistence:
  //    Implement save/load logic for long-term storage
  //    Consider using databases or file systems
  // 
  // 4. State Reset:
  //    agent.state = { counter: 0 }  // Reset entire state
  //    agent.state.set('counter', 0)  // Reset single value
}

agentStateExample().catch(console.error);
