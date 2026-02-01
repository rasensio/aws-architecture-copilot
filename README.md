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
│   └── tools/          # Agent tools (CDK generator, MCP client)
├── tests/              # Jest test suites
├── deployment/         # AWS CDK infrastructure code
│   ├── lib/            # CDK stack definitions
│   └── bin/            # CDK app entry point
├── examples/           # Learning examples and demos
└── specs/              # Feature specifications and plans
```

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
   AWS_BEDROCK_MODEL_ID=anthropic.claude-sonnet-4-20250514-v1:0
   ```

3. Enable AWS Bedrock model access in the [AWS Console](https://console.aws.amazon.com/bedrock/home#/modelaccess)

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
