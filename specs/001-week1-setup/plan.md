# Implementation Plan: Week 1 - Project Setup & Foundation


































































































































































































































































































































































































**Research Status**: ✅ COMPLETE - All questions resolved, ready for Phase 1 design---Phase 1 artifacts enable developers to quickly understand and set up the project, following the research decisions documented here.4. **Update agent context**: Run `.specify/scripts/bash/update-agent-context.sh copilot`3. **Create quickstart.md**: Developer onboarding guide2. **Create contracts/**: N/A for Week 1 (no APIs yet, agent built in Week 2)1. **Create data-model.md**: N/A for Week 1 (no data entities, this is infrastructure setup)After completing research, proceed to Phase 1:## Next Steps (Phase 1)| MCP connection timeout | Low - Occasional failures | Increase wait time, add retry logic, document troubleshooting || Node.js version mismatch | Medium - Runtime errors | Specify engines in package.json, document version requirement || npm dependency conflicts | Medium - Install fails | Use npm ci for clean installs, lock versions with package-lock.json || TypeScript compilation errors | Medium - Blocks progress | Use strict: true from start, fix errors incrementally || Bedrock model access denied | Critical - No LLM | Verify access in console early, document setup steps clearly || AWS MCP server unavailable | High - No RAG | Document manual fallback, cache common queries (future) || Strands SDK API changes | High - Examples break | Pin to specific version in package.json, monitor releases ||------|--------|-----------|| Risk | Impact | Mitigation |## Risks and Mitigations- Quota exceeded: Request quota increase or use different model- Access denied: Check model access enabled in console- Throttling errors: Implement exponential backoff (Week 2+)**Error Handling**:- Document in .env.example, exclude .env in .gitignore- Never commit credentials to git- Or environment variables: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY- Use AWS CLI profile (aws configure)**Credential Management**:- **Region us-east-1**: Most comprehensive model availability- **Max Tokens 4096-8192**: Sufficient for detailed architecture responses- **Temperature 0.3**: Balanced between creativity and consistency (architecture design)**Model Configuration**:### AWS Bedrock Best Practices```}  throw error  }    // AWS credentials issue  } else if (error.message.includes('Access Denied')) {    // MCP server failed to start  if (error.message.includes('Connection refused')) {} catch (error) {  const result = await agent.invoke('...')try {```typescript**Error Handling**:```await client.disconnect()// Clean up})  systemPrompt: '...',  tools: [client],const agent = new Agent({// Use as tool in agentawait new Promise(resolve => setTimeout(resolve, 2000))// Wait for connection})  }),    args: ['awslabs.aws-documentation-mcp-server@latest'],    command: 'uvx',  transport: new StdioClientTransport({const client = new McpClient({import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'import { McpClient } from '@strands-agents/sdk'```typescript**Client Setup**:### MCP Integration Patterns```}  }    process.stdout.write(event.delta.text)      event.delta.type === 'textDelta') {  if (event.type === 'modelContentBlockDeltaEvent' && for await (const event of agent.stream('Tell me a story')) {```typescript**Streaming**:```const finalState = agent.state.getAll()const result = await agent.invoke('...')// Access after invocation}  context.agent.state.set('counter', count + 1)  const count = context.agent.state.get('counter')callback: (input, context) => {// Access state in tool})  tools: [...],  state: { counter: 0, data: [] },const agent = new Agent({// Initialize with state```typescript**State Management**:```})  },    return result    // Access agent state: context.agent.state.get('key')    // Tool logic  callback: (input, context) => {  }),    param: z.string().describe('Parameter description'),  inputSchema: z.object({  description: 'What the tool does (shown to LLM)',  name: 'tool_name',const myTool = tool({import { z } from 'zod'import { tool } from '@strands-agents/sdk'```typescript**Tool Definition**:```const agent = new Agent({ model, systemPrompt: '...' })})  maxTokens: 4096,  temperature: 0.3,  modelId: 'anthropic.claude-sonnet-4-20250514-v1:0',  region: 'us-east-1',const model = new BedrockModel({// Custom: Explicit Bedrock configuration})  systemPrompt: 'You are a helpful assistant.',const agent = new Agent({// Simple: Uses default Bedrock model```typescript**Agent Creation**:### Strands Agent Patterns## Best Practices Research| Dev Runner | tsx | Fast TypeScript execution, no compilation step || Build Tool | tsc (TypeScript compiler) | Standard, no bundler needed for Node.js || Type Runtime Validation | Zod | Schema validation for tool inputs, type-safe || Testing | Jest + ts-jest | Standard TypeScript testing, good DX || Package Manager | npm | Standard Node.js tool, fast, reliable || RAG/Docs | AWS MCP Server | Maintained by AWS, always updated, zero infrastructure || LLM Model | Claude Sonnet 4 | Latest model, strong reasoning, production-ready || LLM Provider | AWS Bedrock | No external API keys, AWS-native, cost-effective || Agent Framework | Strands Agents SDK | Simpler than LangGraph, native Bedrock + MCP || Runtime | Node.js 20+ | LTS version, modern features, stable || Language | TypeScript 5.x | Type safety, AWS CDK standard, constitution requirement ||-----------|-----------|-----------|| Component | Technology | Rationale |## Technology Stack Summary---- Success criteria: all examples run without errors- Document expected output for each example- Examples double as validation and learning resources- Focus on getting environment working, not test coverage**Impact on Week 1**:```npx tsx examples/07-mcp-scenarios.ts        # Multiple queries succeednpx tsx examples/06-mcp-integration.ts      # MCP connectsnpx tsx examples/05-streaming.ts            # Streaming worksnpx tsx examples/04-agent-state.ts          # State management worksnpx tsx examples/03-agent-with-tools.ts     # Tools executenpx tsx examples/02-bedrock-config.ts       # Bedrock worksnpx tsx examples/01-basic-agent.ts          # Agent responds# Examples must executenpm test             # Jest runs (0 tests is OK for Week 1)npm run build        # TypeScript compilesnpm install           # All dependencies install# Must succeed```bash**Validation Criteria**:- **Week 4**: End-to-end scenario tests (5 architecture patterns)- **Week 3**: Tool integration tests (CDK, Mermaid generation)- **Week 2**: Unit tests for agent core logic**Automated Testing Plan (Future Weeks)**:- Jest configured but no test suites yet (0 tests expected)- Examples serve as "smoke tests" for dependencies- No production code to test (agent built in Week 2)- Week 1 is environment setup and learning**Why Not Automated Tests Yet**:- **Bedrock Access**: Model invocation succeeds- **MCP Integration**: AWS queries return relevant documentation- **Installation**: npm install completes without errors- **Compilation**: TypeScript compiles with zero errors- **Example Scripts**: Run each example, verify expected output**Week 1 Testing Approach**:**Decision**: Manual validation via example scripts, automated testing starts Week 2+### Q5: Testing Strategy - What's appropriate for Week 1 setup phase?---- Document fallback to Claude 3.5 if Sonnet 4 unavailable- Bedrock example script validates access works- README must include AWS configuration steps- .env.example must document AWS_REGION and AWS_BEDROCK_MODEL_ID**Impact on Week 1**:- **Quota limits**: New accounts may have lower quotas, request increase if needed- **Credential issues**: Use `aws configure` or set AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY- **Wrong region**: Model availability varies by region, us-east-1 most comprehensive- **Model access not enabled**: Go to AWS Console → Bedrock → Model access → Request access**Common Issues**:```npx tsx examples/02-bedrock-config.ts# 4. Test invocation (via example script)  --query 'modelSummaries[?modelId==`anthropic.claude-sonnet-4-20250514-v1:0`]'aws bedrock list-foundation-models --region us-east-1 \# 3. Check model access statusaws bedrock list-foundation-models --region us-east-1# 2. List available Bedrock modelsaws sts get-caller-identity# 1. Test AWS CLI configuration```bash**Validation Steps**:- Pricing: Pay-per-token (no upfront costs)- Fallback: Claude 3.5 Sonnet if Sonnet 4 unavailable- Region: us-east-1 (widest service availability)- Model ID: `anthropic.claude-sonnet-4-20250514-v1:0`**Model Details**:4. AWS CLI configured with valid credentials3. Model access explicitly enabled in Bedrock console (per region)2. IAM permissions for bedrock:InvokeModel1. AWS account with Bedrock access**Prerequisites**:**Decision**: Use Claude Sonnet 4 via AWS Bedrock in us-east-1### Q4: AWS Bedrock Access - What are the prerequisites and model availability?---- package.json must include "type": "module"- Type errors must be resolved before compilation succeeds- Import statements use ESM syntax (import/export, not require)- All example scripts must use .ts extension**Impact on Week 1**:- tsx supports ESNext for development- Jest works with ts-jest preprocessor- Compatible with Node.js 20+ ESM- TypeScript 5.x supports all features**Validation**:3. **AMD/UMD**: Unnecessary complexity for Node.js target2. **Loose type checking**: Defeats purpose of TypeScript, violates constitution1. **CommonJS modules**: Older, less tree-shaking, verbose imports**Alternatives Considered**:- **declaration: true**: Generate .d.ts files for better tooling- **bundler moduleResolution**: Better import resolution for TypeScript projects- **ESNext modules**: Modern JavaScript features, tree-shaking support- **strict: true**: Enables all strict type-checking (noImplicitAny, strictNullChecks, etc.) - NON-NEGOTIABLE per constitution**Rationale**:```}  }    "declaration": true    "resolveJsonModule": true,    "forceConsistentCasingInFileNames": true,    "skipLibCheck": true,    "esModuleInterop": true,    "strict": true,    "rootDir": "src",    "outDir": "dist",    "moduleResolution": "bundler",    "module": "ESNext",    "target": "ES2022",  "compilerOptions": {{```json**Configuration**:**Decision**: Use strict TypeScript configuration with ESNext modules### Q3: TypeScript Configuration - What compiler settings ensure type safety?---- Document troubleshooting steps (connection timeouts, Python dependencies)- Test with multiple AWS query scenarios- Create reusable helper function (createAwsDocsMCP)- Must install uvx/pipx for MCP server**Impact on Week 1**:- Query Types: Full-text search, documentation retrieval, best practices lookup- Cleanup: Must call disconnect() to terminate subprocess- Connection: Requires 2-second initialization wait- Transport: StdioClientTransport (subprocess communication)**Technical Details**:- Performance: Queries return results in 2-5 seconds typically- Installation: Python-based, installed via uvx (pipx wrapper)- MCP Protocol: https://modelcontextprotocol.io/ (standard protocol, multiple implementations)- GitHub: https://github.com/awslabs/aws-documentation-mcp-server**Validation**:3. **Pure LLM knowledge**: Risk of hallucinations, outdated information2. **LangChain RAG**: Additional dependency, more complexity than needed1. **Custom RAG with Chroma/Pinecone**: Requires vector store, embeddings, chunking logic, maintenance**Alternatives Considered**:- Aligns with KISS principle- Eliminates 10-15 hours of RAG pipeline development- Zero infrastructure (no vector database, no embeddings generation)- Always up-to-date (no stale embeddings or manual updates)- Provides access to full AWS documentation, Well-Architected Framework, best practices- Official AWS Labs project (maintained by AWS)**Rationale**:**Decision**: Use AWS Documentation MCP Server instead of building custom RAG### Q2: AWS Documentation MCP Server - Does it provide comprehensive AWS knowledge?---- MCP integration test critical to validate AWS docs server compatibility- Must verify SDK installs and works with Node.js 20+- Example scripts will demonstrate core patterns**Impact on Week 1**:- Community: Discord channel for support- Examples: https://github.com/strands-agents/samples (multiple working examples)- GitHub: https://github.com/strands-agents/sdk-typescript (active commits, issue resolution)- Documentation: https://strandsagents.com/ (comprehensive guides + API reference)**Validation**:3. **Build custom agent framework**: Massive time investment, reinventing wheel2. **Direct AWS Bedrock SDK**: Would require custom agent orchestration, tool calling logic, state management1. **LangGraph**: More complex, requires graph state management, heavier abstraction**Alternatives Considered**:- Active development with recent releases- Simpler than LangGraph (function-based tools vs graph state machines)- TypeScript-first design with strong typing- Built-in MCP client integration (no custom implementation needed)- Native AWS Bedrock support (BedrockModel class)- Official SDK maintained by Strands team**Rationale**:**Decision**: Use Strands Agents SDK for agent orchestration### Q1: Strands Agents SDK - Is it production-ready and well-documented?This phase resolves "NEEDS CLARIFICATION" items from Technical Context and validates technology choices.## Research Questions**Phase**: 0 - Technology Research and Decision Validation**Feature**: 001-week1-setup | **Date**: 2026-01-31  **Branch**: `001-week1-setup` | **Date**: 2026-01-31 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-week1-setup/spec.md`

## Summary

Initialize the AWS Architecture Copilot project with TypeScript, Strands Agents SDK, and AWS Bedrock integration. Establish development environment, create working examples demonstrating Strands framework capabilities, integrate AWS Documentation MCP server for RAG functionality, and document technical architecture. This foundation enables Week 2-4 development of the core agent system.

**Technical Approach**: Follow constitution principles (TypeScript-first, KISS, AWS-native) by setting up a single-project structure with strict TypeScript compilation, installing Strands SDK for agent orchestration, using AWS Bedrock for LLM access (no external API keys), and leveraging AWS MCP server instead of building custom RAG infrastructure.

## Technical Context

**Language/Version**: TypeScript 5.x with Node.js 20+  
**Primary Dependencies**: @strands-agents/sdk, @aws-sdk/client-bedrock-runtime, zod, aws-cdk-lib  
**Storage**: N/A (Week 1 is environment setup only)  
**Testing**: Jest with ts-jest, TypeScript type checking  
**Target Platform**: Node.js 20+ on macOS/Linux development environment  
**Project Type**: Single project (agent application)  
**Performance Goals**: N/A (Week 1 is setup/validation only)  
**Constraints**: 
- npm install + build must complete in <5 minutes
- All example scripts must execute without errors
- MCP queries must return within 10 seconds
- TypeScript compilation with zero errors (strict: true)

**Scale/Scope**: 
- 5 Strands example scripts (basic agent, Bedrock config, tools, state, streaming)
- 1 MCP integration helper function
- 1 technical architecture document (PROJECT_PLAN.md)
- Development environment verification (AWS Bedrock access, CLI configuration)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Initial Check (Pre-Research)

✅ **I. TypeScript-First Development**
- Spec requires TypeScript with strict type checking
- tsconfig.json with strict: true explicitly required
- All examples must be TypeScript (.ts files)
- **STATUS**: PASS

✅ **II. Simplicity Over Complexity (KISS)**
- Using Strands (simpler) vs LangGraph (complex)
- Using MCP (no custom RAG) vs vector store implementation
- Single project structure (no monorepo complexity)
- **STATUS**: PASS

✅ **III. AWS-Native Solutions**
- AWS Bedrock for LLM (not external APIs)
- AWS Documentation MCP server (AWS-maintained)
- AWS SDK v3 for Bedrock access
- AWS CLI configuration required
- **STATUS**: PASS

✅ **IV. Security & Cost-Optimization First**
- No credentials in code (environment variables only)
- .env.example documents required variables
- .gitignore excludes sensitive files
- **STATUS**: PASS

✅ **V. Production-Ready From Day One**
- All examples must execute without errors
- Comprehensive edge case handling documented
- Input validation planned for Week 2+
- **STATUS**: PASS

**Overall Gate Status**: ✅ **PASS** - No constitution violations. Week 1 setup aligns with all principles.

### Post-Phase 1 Re-Check

✅ **I. TypeScript-First Development**
- research.md confirms TypeScript 5.x with strict: true
- quickstart.md documents TypeScript compilation verification
- All example scripts use .ts extension
- No compromises on type safety
- **STATUS**: PASS

✅ **II. Simplicity Over Complexity (KISS)**
- Research validated Strands simplicity vs LangGraph complexity
- MCP eliminates 10-15 hours of custom RAG development
- Single project structure chosen (not monorepo)
- Zero complexity violations
- **STATUS**: PASS

✅ **III. AWS-Native Solutions**
- Research confirmed AWS Bedrock with Claude Sonnet 4
- AWS MCP server (AWS Labs maintained)
- us-east-1 region for maximum service availability
- AWS CLI configuration guide in quickstart.md
- **STATUS**: PASS

✅ **IV. Security & Cost-Optimization First**
- .env.example created (never .env in git)
- Quickstart includes security warning about credentials
- Bedrock pay-per-token pricing (no upfront costs)
- .gitignore properly excludes sensitive files
- **STATUS**: PASS

✅ **V. Production-Ready From Day One**
- All 7 examples have documented expected outputs
- Troubleshooting guide covers common failures
- Verification checklist ensures quality gate
- Error handling patterns documented in research.md
- **STATUS**: PASS

**Final Gate Status**: ✅ **PASS** - Constitution compliance maintained through all phases. Ready for Phase 2 (task creation).

## Project Structure

### Documentation (this feature)

```text
specs/001-week1-setup/
├── plan.md              # This file
├── research.md          # Phase 0: Technology research
├── data-model.md        # Phase 1: N/A for Week 1 (no data entities)
├── quickstart.md        # Phase 1: Getting started guide
├── contracts/           # Phase 1: N/A for Week 1 (no APIs yet)
└── checklists/
    └── requirements.md  # Spec validation checklist (already created)
```

### Source Code (repository root)

```text
aws-architecture-copilot/
├── src/
│   ├── agent/
│   │   ├── index.ts          # Main agent (Week 2)
│   │   └── state.ts          # Agent state interface (Week 2)
│   ├── tools/
│   │   ├── mcpClient.ts      # MCP helper (Week 1, Phase 1)
│   │   ├── cdkGenerator.ts   # CDK code generator (Week 3)
│   │   └── mermaidGenerator.ts # Diagram generator (Week 3)
│   └── index.ts              # Entry point (Week 2)
├── examples/                  # Week 1, Phase 1
│   ├── 01-basic-agent.ts
│   ├── 02-bedrock-config.ts
│   ├── 03-agent-with-tools.ts
│   ├── 04-agent-state.ts
│   ├── 05-streaming.ts
│   ├── 06-mcp-integration.ts
│   └── 07-mcp-scenarios.ts
├── tests/
│   ├── scenarios.test.ts     # Week 4
│   └── tools.test.ts         # Week 3-4
├── deployment/               # Week 4
│   ├── lib/
│   │   └── deployment-stack.ts
│   ├── bin/
│   │   └── deployment.ts
│   └── cdk.json
├── docs/
│   └── architecture.png      # Week 1, Phase 1
├── package.json
├── tsconfig.json
├── jest.config.js
├── .gitignore
├── .env.example
├── README.md
├── master-plan.md
└── PROJECT_PLAN.md           # Week 1, Phase 1
```

**Structure Decision**: Single project structure (Option 1) chosen because:
- This is a unified agent application, not a web app with frontend/backend
- All code runs in Node.js environment
- No need for separate mobile or API projects
- Aligns with KISS principle (simplest structure that works)
- src/ for production code, examples/ for learning, tests/ for test code

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

*No violations detected. This section intentionally left empty.*
