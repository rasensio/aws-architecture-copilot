/**
 * Example 3: Agent with Tools
 * 
 * This example demonstrates how to extend agent capabilities with custom tools.
 * 
 * Key Concepts:
 * - Creating tools with the tool() function
 * - Defining input schemas with Zod for type safety
 * - Tool callback functions that execute custom logic
 * - How agents decide when to use tools
 * 
 * Tool Workflow:
 * 1. Agent receives a user query
 * 2. Agent analyzes if any available tools can help
 * 3. If yes, agent formats a tool call with parameters
 * 4. Strands invokes the tool callback with validated inputs
 * 5. Tool returns a result
 * 6. Agent receives the result and formulates a final response
 * 
 * Tools enable agents to:
 * - Perform calculations
 * - Call external APIs
 * - Query databases
 * - Execute code
 * - Interact with file systems
 * - And much more!
 * 
 * Best Practices:
 * - Use descriptive tool names (what it does)
 * - Write clear descriptions (when to use it)
 * - Define comprehensive input schemas
 * - Add descriptions to each schema field
 * - Handle errors gracefully in callbacks
 * - Return serializable data (strings, numbers, objects)
 */

import { Agent, tool } from '@strands-agents/sdk';
import { z } from 'zod';

async function agentWithToolsExample() {
  console.log('Example 3: Agent with Tools\n');

  // Define a tool using the tool() function
  // Tools are how agents interact with external systems and perform actions
  const calculator = tool({
    // Tool name: Should be descriptive and unique
    name: 'calculator',
    
    // Description: Helps the agent decide when to use this tool
    // The agent's LLM reads this to understand the tool's purpose
    description: 'Performs basic arithmetic operations',
    
    // Input schema: Define and validate tool parameters using Zod
    // Zod provides:
    // - Type safety at runtime
    // - Automatic validation
    // - Schema-to-JSON conversion for the LLM
    inputSchema: z.object({
      operation: z.enum(['add', 'subtract', 'multiply', 'divide'])
        .describe('The arithmetic operation to perform'),
      a: z.number().describe('First number'),
      b: z.number().describe('Second number'),
    }),
    
    // Callback: The actual function that executes when the tool is called
    // Input is automatically validated against the schema
    // Return value is sent back to the agent
    callback: (input) => {
      console.log(`\n🔧 Tool called: calculator`);
      console.log(`   Operation: ${input.operation}`);
      console.log(`   Numbers: ${input.a} and ${input.b}`);
      
      let result: number;
      switch (input.operation) {
        case 'add':
          result = input.a + input.b;
          break;
        case 'subtract':
          result = input.a - input.b;
          break;
        case 'multiply':
          result = input.a * input.b;
          break;
        case 'divide':
          // Always validate inputs and handle edge cases
          if (input.b === 0) {
            throw new Error('Cannot divide by zero');
          }
          result = input.a / input.b;
          break;
      }
      
      console.log(`   Result: ${result}\n`);
      
      // Return the result to the agent
      // The agent will incorporate this into its response
      return result;
    },
  });

  // Create agent with the calculator tool
  // Pass tools as an array - you can provide multiple tools
  const agent = new Agent({
    // System prompt should mention tool usage for best results
    systemPrompt: 'You are a helpful assistant. Use the calculator tool when you need to perform arithmetic.',
    tools: [calculator],
  });

  // Ask a question that requires calculation
  // The agent will automatically detect it needs to use the calculator
  const query = 'What is 42 multiplied by 137?';
  console.log(`Query: "${query}"\n`);

  const result = await agent.invoke(query);

  // The agent's response will include both:
  // 1. The tool call and its result (shown in logs)
  // 2. A natural language response incorporating the result
  console.log('Agent response:');
  console.log(result.lastMessage);
  console.log('\n✅ Agent with tools example completed successfully');
  
  // Tool Call Flow:
  // User: "What is 42 multiplied by 137?"
  // Agent: *thinks* → "I need to calculate this"
  // Agent: *calls calculator tool* → { operation: 'multiply', a: 42, b: 137 }
  // Tool: *executes* → returns 5754
  // Agent: *receives result* → "42 multiplied by 137 equals 5,754."
}

agentWithToolsExample().catch(console.error);
