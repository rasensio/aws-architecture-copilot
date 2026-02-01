# aws-architecture-copilot Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-01-31

## Active Technologies

- TypeScript 5.x with Node.js 20+ + @strands-agents/sdk, @aws-sdk/client-bedrock-runtime, zod, aws-cdk-lib (001-week1-setup)

## Project Structure

```text
src/
  agent/           # Core agent logic
  tools/           # Tool implementations (use mcpClient.ts for MCP)
  types/           # TypeScript type definitions
examples/          # Numbered example scripts (01-07)
tests/             # Jest test files
deployment/        # AWS deployment configs
docs/              # Technical documentation
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.x with Node.js 20+: Follow standard conventions

## Recent Changes

- 001-week1-setup: Added TypeScript 5.x with Node.js 20+ + @strands-agents/sdk, @aws-sdk/client-bedrock-runtime, zod, aws-cdk-lib

<!-- MANUAL ADDITIONS START -->

## Strands SDK Quick Reference

### Agent Creation Pattern
```typescript
import { Agent } from "@strands-agents/sdk";
import { BedrockModel } from "@strands-agents/bedrock";

const model = new BedrockModel({
  region: process.env.AWS_REGION ?? "us-east-1",
  model: process.env.AWS_BEDROCK_MODEL_ID!,
  config: { temperature: 0.2, max_tokens: 4096 },
});

const agent = new Agent({
  model,
  name: "Architecture Agent",
  description: "Designs AWS cloud architectures",
  tools: [/* tool instances */],
});
```

### Tool Definition Pattern
```typescript
import { tool } from "@strands-agents/sdk";
import { z } from "zod";

const myTool = tool({
  name: "tool_name",
  description: "Clear description for LLM",
  parameters: z.object({
    param1: z.string().describe("Parameter description"),
  }),
  handler: async ({ param1 }) => {
    return { success: true, data: "result" };
  },
});
```

### MCP Client Pattern
```typescript
import { McpClient, StdioClientTransport } from "@strands-agents/sdk";

const transport = new StdioClientTransport({
  command: "uvx",
  args: ["awslabs.aws-documentation-mcp-server@latest"],
  env: { AWS_REGION: process.env.AWS_REGION ?? "us-east-1" },
});

const mcpClient = new McpClient({ transport }); // Note: { transport } config object
await mcpClient.connect();

// Use in agent
const agent = new Agent({
  model,
  tools: [mcpClient], // MCP client goes in tools array
});

// Always disconnect when done
await mcpClient.disconnect();
```

## Common Pitfalls to Avoid

### ❌ Wrong: MCP Client Constructor
```typescript
const mcpClient = new McpClient(transport); // Missing config object
```

### ✅ Correct: MCP Client Constructor
```typescript
const mcpClient = new McpClient({ transport });
```

### ❌ Wrong: Agent Tool Configuration
```typescript
const agent = new Agent({
  model,
  mcpClient, // Not a valid property
});
```

### ✅ Correct: Agent Tool Configuration
```typescript
const agent = new Agent({
  model,
  tools: [mcpClient], // MCP client goes in tools array
});
```

### ❌ Wrong: Model ID Format
```typescript
model: "anthropic.claude-sonnet-4-20250514-v1:0" // On-demand pricing not supported
```

### ✅ Correct: Model ID Format
```typescript
model: "us.anthropic.claude-3-5-sonnet-20241022-v2:0" // Cross-region inference profile
```

## Key Technical Constraints

- **ESM Only**: Use `import`, not `require()`
- **Strict TypeScript**: No `any` types
- **Low Temperature**: 0.2-0.3 for technical accuracy
- **MCP Queries**: Take 5-15 seconds (fetching real AWS docs)
- **Always Disconnect MCP**: Prevents zombie processes

## Documentation References

- **Project Plan**: [PROJECT_PLAN.md](../../PROJECT_PLAN.md)
- **Quick Start**: [specs/001-week1-setup/quickstart.md](../../specs/001-week1-setup/quickstart.md)
- **Architecture Diagram**: [docs/architecture.mmd](../../docs/architecture.mmd)

<!-- MANUAL ADDITIONS END -->
