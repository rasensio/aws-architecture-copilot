# AWS Architecture Copilot

AI agent that generates AWS architectures from natural language using Strands + AWS Bedrock.

## Features

- 🤖 **Powered by Claude Sonnet 4** - Uses AWS Bedrock for state-of-the-art AI reasoning
- 📚 **AWS Best Practices** - Retrieves documentation via MCP integration
- 🎨 **Architecture Diagrams** - Generates Mermaid flowcharts automatically
- 📦 **Infrastructure as Code** - Produces TypeScript AWS CDK code
- ✅ **Battle-Tested** - Validated on 5+ architecture patterns

## Tech Stack

- **Agent Framework**: Strands Agents SDK (TypeScript)
- **AI Model**: Claude Sonnet 4 via AWS Bedrock
- **Documentation**: AWS Documentation MCP Server
- **IaC Output**: AWS CDK (TypeScript)
- **Deployment**: ECS Fargate (containerized)

## Quick Start

See [Quick Start Guide](specs/001-week1-setup/quickstart.md) for detailed setup instructions.

```bash
# Clone the repository
git clone https://github.com/rasensio/aws-architecture-copilot.git
cd aws-architecture-copilot

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

## Project Structure

```
aws-architecture-copilot/
├── src/
│   ├── agent/          # Core agent logic and state management
│   │                   # - Agent workflow orchestration
│   │                   # - State interface definitions
│   │                   # - Architecture classification
│   │
│   └── tools/          # Agent tools (CDK generator, MCP client)
│                       # - AWS Documentation MCP client helper
│                       # - CDK code generator tool
│                       # - Mermaid diagram generator tool
│
├── tests/              # Jest test suites
│                       # - Unit tests for tools and utilities
│                       # - Integration tests for agent workflows
│                       # - Contract tests for MCP integration
│
├── deployment/         # AWS CDK infrastructure code
│   ├── lib/            # CDK stack definitions
│   │                   # - ECS Fargate service stack
│   │                   # - Networking and security configurations
│   │
│   └── bin/            # CDK app entry point
│                       # - Infrastructure deployment scripts
│
├── examples/           # Learning examples and demos
│                       # - Strands framework basic patterns
│                       # - Bedrock model configuration
│                       # - Tool and state management examples
│                       # - MCP integration demonstrations
│
└── specs/              # Feature specifications and plans
    └── 001-week1-setup/
        ├── spec.md           # User stories and requirements
        ├── plan.md           # Implementation approach
        ├── tasks.md          # Task breakdown with dependencies
        ├── quickstart.md     # Developer onboarding guide
        └── research.md       # Technical research and decisions
```

### Directory Purposes

- **`src/agent/`**: Contains the core AI agent implementation including workflow orchestration, state management, and architecture classification logic
- **`src/tools/`**: Reusable tools that the agent invokes (MCP client for AWS docs, CDK code generator, diagram generator)
- **`tests/`**: Comprehensive test coverage including unit, integration, and contract tests following TDD practices
- **`deployment/`**: AWS CDK infrastructure-as-code for deploying the agent to ECS Fargate
- **`examples/`**: Educational scripts demonstrating Strands framework patterns and MCP integration
- **`specs/`**: Complete feature specifications following SpecKit methodology with user stories, plans, and task breakdowns

## Prerequisites

- **Node.js**: 20 or higher
- **AWS Account**: With Bedrock access enabled
- **AWS CLI**: Configured with valid credentials
- **Python 3**: For MCP server (via uvx)

## Development

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Configure your AWS credentials in `.env`:
   ```bash
   AWS_REGION=us-east-1
   AWS_BEDROCK_MODEL_ID=us.anthropic.claude-3-5-sonnet-20241022-v2:0
   ```

3. **Enable AWS Bedrock Model Access**:
   - Open the [AWS Bedrock Console - Model Access](https://console.aws.amazon.com/bedrock/home#/modelaccess)
   - Click **"Manage model access"** or **"Enable specific models"**
   - Select **"Anthropic Claude 3.5 Sonnet"** (with cross-region inference)
   - Click **"Request model access"** or **"Save changes"**
   - Wait 1-2 minutes for approval (usually instant)

4. **Verify Bedrock Access**:
   ```bash
   # Test that you can invoke the model
   npx tsx examples/bedrock-test.ts
   ```
   
   You should see a successful response explaining AWS Lambda.

   **Troubleshooting**:
   - If you get "AccessDenied", check IAM permissions for `bedrock:InvokeModel`
   - If you get "invalid model identifier", ensure cross-region inference profiles are enabled
   - Verify your AWS CLI is configured: `aws sts get-caller-identity`

### Build & Test

```bash
# Development mode (watch for changes)
npm run dev

# Build TypeScript
npm run build

# Run tests
npm test

# Start the agent
npm start
```

### Example Scripts

Learn Strands framework concepts by running the included examples:

```bash
# Example 1: Basic Agent
npx tsx examples/01-basic-agent.ts
# Demonstrates creating a simple agent with system prompt
# Query: "What is AWS Lambda?"
# Expected: Detailed explanation of AWS Lambda serverless computing

# Example 2: Custom Bedrock Configuration
npx tsx examples/02-bedrock-config.ts
# Shows how to configure custom model parameters
# Query: "What are the key components of a scalable web application on AWS?"
# Expected: Architecture guidance with specific AWS services

# Example 3: Agent with Tools
npx tsx examples/03-agent-with-tools.ts
# Demonstrates tool creation with Zod schemas
# Query: "What is 42 multiplied by 137?"
# Expected: Agent uses calculator tool, returns 5,754

# Example 4: State Management
npx tsx examples/04-agent-state.ts
# Shows how to maintain state across agent invocations
# Action: Increments counter 3 times
# Expected: Final counter value is 3

# Example 5: Streaming Responses
npx tsx examples/05-streaming.ts
# Demonstrates progressive text output
# Query: "Tell me a short story about a cloud architect"
# Expected: Text streams progressively (like ChatGPT)

# Example 6: MCP Integration
npx tsx examples/06-mcp-integration.ts
# Demonstrates AWS Documentation MCP server integration
# Queries: High availability best practices, Well-Architected Framework pillars
# Expected: Answers backed by official AWS documentation (10-30s response time)

# Example 7: MCP Architecture Scenarios
npx tsx examples/07-mcp-scenarios.ts
# Tests multiple AWS architecture queries via MCP
# Scenarios: Scalable web app, ElastiCache, RDS Multi-AZ, Lambda best practices
# Expected: Comprehensive architecture guidance for each scenario (2-5 minutes total)
```

### AWS Documentation MCP Setup

The AWS Documentation MCP server provides real-time access to AWS best practices and documentation.

**Prerequisites**:
- Python 3.8+ installed: `python3 --version`
- uvx installed: `brew install uv` (macOS) or `pip install uv`

**Installation**:
```bash
# Test MCP server (Ctrl+C to exit)
uvx awslabs.aws-documentation-mcp-server@latest
```

**Usage in Code**:
```typescript
import { Agent, BedrockModel } from '@strands-agents/sdk';
import { createAwsDocsMCP } from './src/tools/mcpClient.js';

// Create MCP client
const mcpClient = await createAwsDocsMCP();

// Create agent with MCP client attached
const agent = new Agent({
  systemPrompt: 'You are an AWS architecture expert.',
  model: new BedrockModel({ modelId: '...' }),
  tools: [mcpClient], // Agent can now query AWS docs
});

// Ask questions backed by AWS documentation
const response = await agent.invoke('What are AWS best practices for high availability?');

// Clean up
await mcpClient.disconnect();
```

**Troubleshooting**:

| Issue | Solution |
|-------|----------|
| `uvx: command not found` | Install with `brew install uv` (macOS) or `pip install uv` |
| `python3: command not found` | Install Python 3.8+ from https://python.org |
| Connection timeout | Increase `connectionWaitMs` in `createAwsDocsMCP(5000)` |
| Slow responses (>30s) | Normal for MCP queries (fetching docs); expect 5-15s per query |
| MCP server crashes | Check `AWS_REGION` environment variable is set |
| No documentation returned | Verify internet connection; MCP server needs AWS docs access |

## Architecture

The agent follows a 5-step workflow:

1. **Understand Requirements** - Parse natural language input and extract constraints
2. **Retrieve Best Practices** - Query AWS Documentation MCP for relevant guidance
3. **Design Architecture** - Use AI reasoning to select appropriate AWS services
4. **Generate Artifacts** - Create Mermaid diagrams and TypeScript CDK code
5. **Return Results** - Provide architecture explanation, diagram, and deployable code

## Documentation

- [Master Plan](master-plan.md) - Complete 4-week project roadmap
- [Week 1 Specification](specs/001-week1-setup/spec.md) - Setup and foundation requirements
- [Technical Plan](specs/001-week1-setup/plan.md) - Implementation approach
- [Quick Start Guide](specs/001-week1-setup/quickstart.md) - Developer onboarding

## Contributing

This is a learning project following the SpecKit methodology. See the [constitution](.specify/memory/constitution.md) for core principles.

## License

MIT

## Status

🚧 **Week 1: Setup & Foundation** (Feb 2-8, 2026) - In Progress

- ✅ Repository initialized
- 🔄 Dependencies installation (in progress)
- ⏳ Strands framework learning
- ⏳ MCP integration
- ⏳ AWS Bedrock verification

Next: Week 2 - Core agent development
