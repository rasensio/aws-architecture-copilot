# Feature Specification: Week 1 - Project Setup & Foundation

**Feature Branch**: `001-week1-setup`  
**Created**: 2026-01-31  
**Status**: Draft  
**Input**: Week 1: Setup & Foundation - Initialize project structure, install dependencies, learn Strands framework basics, set up AWS MCP server, and document technical architecture

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer Initializes Project (Priority: P1)

As a developer starting the AWS Architecture Copilot project, I need a properly configured TypeScript project with all necessary dependencies so that I can begin building the agent.

**Why this priority**: Without a working development environment, no other work can proceed. This is the foundation for all subsequent development.

**Independent Test**: Can be fully tested by running `npm install`, `npm run build`, and `npm test` successfully without errors.

**Acceptance Scenarios**:

1. **Given** a fresh clone of the repository, **When** I run `npm install`, **Then** all dependencies install without errors and the node_modules directory is created
2. **Given** dependencies are installed, **When** I run `npm run build`, **Then** TypeScript compiles successfully and creates the dist/ directory
3. **Given** the project is built, **When** I run `npm test`, **Then** Jest runs and reports 0 tests (no failures)
4. **Given** the project structure exists, **When** I inspect the directories, **Then** src/agent/, src/tools/, tests/, and deployment/ directories exist with proper structure

---

### User Story 2 - Developer Learns Strands Framework (Priority: P2)

As a developer new to Strands, I need working example scripts that demonstrate core Strands concepts so that I understand how to build agents before implementing the main application.

**Why this priority**: Understanding the framework is essential before building the production agent. Examples provide reference patterns for the main implementation.

**Independent Test**: Can be fully tested by running each example script (`npx tsx examples/01-basic-agent.ts` through `examples/05-streaming.ts`) and verifying they execute without errors and produce expected output.

**Acceptance Scenarios**:

1. **Given** the Strands SDK is installed, **When** I run the basic agent example, **Then** the agent responds to the query "What is AWS Lambda?" with relevant information
2. **Given** the tool example exists, **When** I run the calculator tool example, **Then** the agent correctly uses the tool to calculate 42 × 137 and returns 5,754
3. **Given** the state management example exists, **When** I run it and invoke increment three times, **Then** the final counter value is 3
4. **Given** the streaming example exists, **When** I run it, **Then** text streams to stdout progressively without waiting for complete response
5. **Given** all examples work, **When** I review the code, **Then** I understand agent creation, tools, state management, and streaming patterns

---

### User Story 3 - Developer Configures AWS MCP Integration (Priority: P2)

As a developer building the RAG component, I need the AWS Documentation MCP server working so that the agent can retrieve AWS best practices without building a custom vector store.

**Why this priority**: MCP integration is core to the architecture decision (simplicity over custom RAG). Must be proven working before proceeding to Week 2.

**Independent Test**: Can be fully tested by running the MCP integration example and verifying the agent can successfully query AWS documentation and return relevant answers.

**Acceptance Scenarios**:

1. **Given** uvx and the AWS MCP server are installed, **When** I run `uvx awslabs.aws-documentation-mcp-server@latest`, **Then** the server starts without errors
2. **Given** the MCP client is configured, **When** I run the MCP integration example with query "What are AWS best practices for high availability?", **Then** the agent returns relevant AWS Well-Architected Framework content
3. **Given** the MCP helper is created, **When** I import and use `createAwsDocsMCP()` in code, **Then** it returns a connected MCP client ready for use
4. **Given** the agent uses MCP tools, **When** I query multiple AWS topics, **Then** all queries return accurate, documentation-backed answers

---

### User Story 4 - Developer Documents Technical Architecture (Priority: P3)

As a developer or stakeholder, I need clear technical documentation explaining the system architecture, agent workflow, and design decisions so that I understand how the system works and why specific technologies were chosen.

**Why this priority**: Documentation is important for onboarding and decision-making but doesn't block development. Can be refined iteratively.

**Independent Test**: Can be fully tested by reviewing the PROJECT_PLAN.md document and verifying it contains all required sections with concrete details (no placeholders).

**Acceptance Scenarios**:

1. **Given** the PROJECT_PLAN.md exists, **When** I read the System Architecture section, **Then** I understand the data flow from user input through Strands agent to MCP and tool outputs
2. **Given** the agent workflow is documented, **When** I review the 5-step workflow, **Then** I can trace exactly how requirements become architecture designs
3. **Given** tech stack decisions are documented, **When** I read the rationale, **Then** I understand why Strands > LangGraph, MCP > custom RAG, and TypeScript > Python
4. **Given** agent state design is documented, **When** I review the TypeScript interface, **Then** I understand what data flows through the agent at each step

---

### User Story 5 - Developer Verifies AWS Bedrock Access (Priority: P1)

As a developer, I need confirmed access to AWS Bedrock with Claude Sonnet 4 so that I can build and test the agent without API failures.

**Why this priority**: Without Bedrock access, the entire agent system cannot function. This is a critical dependency that must be verified early.

**Independent Test**: Can be fully tested by running `aws bedrock list-foundation-models --region us-east-1` and verifying Claude models are listed, plus creating a simple BedrockModel test that successfully invokes the model.

**Acceptance Scenarios**:

1. **Given** AWS CLI is configured, **When** I run `aws bedrock list-foundation-models --region us-east-1`, **Then** the command succeeds and lists available models including Claude Sonnet 4
2. **Given** model access is enabled, **When** I check the AWS Bedrock console Model Access page, **Then** Claude 3.5 Sonnet and Claude 4 Sonnet show "Access granted" status
3. **Given** the BedrockModel example exists, **When** I run it with a test query, **Then** it successfully invokes Claude and returns a response without authentication errors
4. **Given** .env.example is configured, **When** I review the AWS settings, **Then** AWS_REGION and AWS_BEDROCK_MODEL_ID are properly documented

---

### Edge Cases

- What happens when npm install fails due to network issues? → User should see clear error message pointing to package registry issues; retry with `npm install --verbose` for debugging
- How does system handle missing AWS credentials? → AWS SDK throws clear authentication error; .env.example documents credential setup; README includes AWS CLI configuration steps
- What happens if Strands SDK version conflicts with Node.js version? → package.json specifies minimum Node.js 20+; installation fails fast with version mismatch error
- How does MCP server handle connection timeouts? → createAwsDocsMCP includes 2-second connection wait; longer timeouts should throw clear error with troubleshooting steps
- What happens when Bedrock model access is not enabled? → AWS SDK returns access denied error; documentation includes steps to enable model access in console
- How does system handle invalid tsconfig.json? → TypeScript compilation fails with syntax error; developer must fix config before proceeding

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST have a TypeScript project structure with src/, tests/, and deployment/ directories
- **FR-002**: System MUST compile TypeScript code with strict type checking enabled (strict: true)
- **FR-003**: System MUST install all required dependencies: Strands SDK, AWS SDK, Jest, TypeScript, CDK libraries
- **FR-004**: Developer MUST be able to run `npm install` successfully to install all dependencies
- **FR-005**: Developer MUST be able to run `npm run build` successfully to compile TypeScript to JavaScript
- **FR-006**: Developer MUST be able to run `npm test` to execute Jest tests
- **FR-007**: System MUST include 5 working Strands example scripts demonstrating: basic agent, Bedrock config, tools, state management, and streaming
- **FR-008**: System MUST connect to AWS Documentation MCP server using uvx and StdioClientTransport
- **FR-009**: System MUST provide a reusable `createAwsDocsMCP()` helper function that returns a connected MCP client
- **FR-010**: System MUST verify AWS Bedrock access with Claude Sonnet 4 model available
- **FR-011**: System MUST document the technical architecture in PROJECT_PLAN.md including system architecture diagram, agent workflow, tech stack decisions, and agent state design
- **FR-012**: System MUST include .gitignore file excluding node_modules/, dist/, .env, *.log, cdk.out/, .DS_Store
- **FR-013**: System MUST include .env.example documenting required AWS configuration variables
- **FR-014**: System MUST have package.json scripts for dev, build, test, and start commands
- **FR-015**: System MUST use Node.js 20+ as the runtime environment

### Key Entities

- **Project Structure**: Organized directory layout (src/, tests/, deployment/, examples/) enabling separation of concerns and clear code organization
- **Dependencies**: Third-party libraries (Strands SDK, AWS SDK, TypeScript, Jest) installed via npm and tracked in package.json
- **Configuration Files**: tsconfig.json (TypeScript compiler settings), jest.config.js (test configuration), .env.example (environment variables template)
- **Example Scripts**: Runnable TypeScript files in examples/ directory demonstrating Strands framework patterns
- **Documentation**: PROJECT_PLAN.md containing technical architecture, workflow diagrams, and design rationale
- **AWS Resources**: Bedrock model access, MCP server connection, AWS CLI configuration with valid credentials

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developer can clone the repository and run `npm install && npm run build` successfully in under 5 minutes
- **SC-002**: All 5 Strands example scripts execute without errors and produce expected output
- **SC-003**: MCP integration test successfully queries AWS documentation and returns relevant answers within 10 seconds
- **SC-004**: TypeScript compilation completes with 0 errors and generates valid JavaScript in dist/ directory
- **SC-005**: PROJECT_PLAN.md contains all 8 required sections (overview, architecture, workflow, tech decisions, state design, tool specs, metrics, milestones) with zero placeholders
- **SC-006**: AWS Bedrock test successfully invokes Claude Sonnet 4 and receives response without authentication errors
- **SC-007**: Jest test runner executes successfully (even with 0 tests initially)
- **SC-008**: All file paths follow documented project structure (src/agent/, src/tools/, tests/, deployment/)

## Assumptions *(optional)*

- Developer has macOS or Linux environment (commands assume bash/zsh shell)
- Developer has Homebrew installed for macOS dependency installation
- Developer has basic familiarity with TypeScript and npm workflows
- AWS account exists with permissions to access Bedrock service
- Internet connection available for npm package installation and AWS API calls
- Git is installed and configured for repository operations
- Docker Desktop will be installed but not used until Week 4

## Out of Scope

- Building the actual agent (Week 2)
- Creating CDK and Mermaid generator tools (Week 3)
- Testing with architecture scenarios (Week 4)
- Deployment to ECS Fargate (Week 4)
- Demo video or blog post creation (Week 4)
- Production error handling and logging (Week 2-3)
- API server or web interface (Week 4, optional)
- Cost estimation features (Phase 2)
- Multi-cloud support (Phase 3)

## Technical Notes *(optional)*

### TypeScript Configuration
- Using ESNext module system for modern JavaScript features
- bundler moduleResolution for better import resolution
- strict: true enables all strict type-checking options
- outDir: dist separates compiled JavaScript from source

### Strands Framework
- BedrockModel defaults to Claude Sonnet 4 when no modelId specified
- Agent state is mutable object accessed via .state.get() and .state.set()
- Tools use Zod schemas for input validation
- Streaming uses async iterators with modelContentBlockDeltaEvent

### MCP Integration
- StdioClientTransport spawns subprocess running MCP server
- 2-second wait after connection allows server initialization
- Must disconnect() client to clean up subprocess
- AWS MCP server maintained by AWS Labs, always up-to-date

### AWS Configuration
- Bedrock model ID format: anthropic.claude-sonnet-4-20250514-v1:0
- Default region us-east-1 chosen for widest service availability
- AWS CLI credentials via `aws configure` or environment variables
- Model access must be explicitly enabled in Bedrock console per region

## Dependencies *(optional)*

### External Dependencies
- Node.js 20+ (runtime)
- npm (package manager)
- AWS CLI (credential management and testing)
- uvx/pipx (for MCP server installation)
- Homebrew (macOS package manager)

### npm Packages
- @strands-agents/sdk - Agent framework
- zod - Schema validation
- @aws-sdk/client-bedrock-runtime - AWS Bedrock API
- aws-cdk-lib - CDK constructs for generated code
- constructs - CDK base classes
- typescript - TypeScript compiler
- @types/node - Node.js type definitions
- tsx - TypeScript execution engine
- jest - Testing framework
- @types/jest - Jest type definitions
- ts-jest - Jest TypeScript preprocessor

### AWS Services
- AWS Bedrock (Claude Sonnet 4 model access required)
- AWS IAM (credentials for API access)

### MCP Servers
- awslabs.aws-documentation-mcp-server@latest (Python-based, installed via uvx)

## References *(optional)*

- Strands Documentation: https://strandsagents.com/
- Strands GitHub: https://github.com/strands-agents/sdk-typescript
- Strands Examples: https://github.com/strands-agents/samples
- AWS Bedrock Documentation: https://aws.amazon.com/bedrock/
- AWS Documentation MCP Server: https://github.com/awslabs/aws-documentation-mcp-server
- Model Context Protocol: https://modelcontextprotocol.io/
- AWS CDK Documentation: https://docs.aws.amazon.com/cdk/
- TypeScript Documentation: https://www.typescriptlang.org/
- Jest Documentation: https://jestjs.io/
- Zod Documentation: https://zod.dev/
