# AWS ARCHITECTURE COPILOT - MASTER PLAN
**TypeScript + Strands + AWS Bedrock Edition**

**Project Duration:** February 2 - March 1, 2026 (4 weeks)

**Project Goal:** Build an agentic AI system that generates production-ready AWS architectures (diagrams + CDK code) from natural language requirements using TypeScript, Strands Agents framework, and AWS Bedrock.

---

## TABLE OF CONTENTS

1. [Week 1: Setup & Foundation](#week-1-setup--foundation-feb-2-8) (5 tasks)
2. [Week 2: Core Agent Development](#week-2-core-agent-development-feb-9-15) (1 task)
3. [Week 3: Tool Integration](#week-3-tool-integration-feb-16-22) (2 tasks)
4. [Week 4: Testing, Demo & Launch](#week-4-testing-demo--launch-feb-23---march-1) (6 tasks)

**Total Tasks: 14**

---

## TECH STACK

**Core Technologies:**
- **Language:** TypeScript (100% - agent code + CDK generation)
- **Runtime:** Node.js 20+
- **Agent Framework:** Strands Agents SDK (`@strands-agents/sdk`)
- **LLM Provider:** AWS Bedrock (Claude Sonnet 4)
- **Documentation/RAG:** AWS Documentation MCP Server (native integration)
- **IaC:** AWS CDK (TypeScript)
- **Diagrams:** Mermaid.js
- **Testing:** Jest + TypeScript
- **Deployment:** AWS ECS Fargate (containerized Node.js app)

**Why This Stack?**
- **TypeScript**: Type safety, better tooling, industry standard for AWS CDK
- **Strands**: Simpler than LangGraph, native AWS Bedrock support, built-in MCP
- **AWS Bedrock**: Native AWS integration, no API keys to manage externally
- **MCP**: Eliminates need for custom RAG/vector store implementation

---

## PROJECT STRUCTURE

```
aws-architecture-copilot/
├── src/
│   ├── agent/
│   │   ├── index.ts              # Main agent setup with Strands
│   │   ├── state.ts              # Agent state interface
│   ├── tools/
│   │   ├── cdkGenerator.ts       # Generate TypeScript CDK code
│   │   ├── mermaidGenerator.ts   # Generate Mermaid diagrams
│   ├── index.ts                  # Application entry point
│   ├── server.ts                 # Express API server (optional)
├── tests/
│   ├── scenarios.test.ts         # 5 scenario tests
│   ├── tools.test.ts             # Tool unit tests
├── deployment/
│   ├── lib/
│   │   └── deployment-stack.ts   # CDK stack for ECS deployment
│   ├── bin/
│   │   └── deployment.ts         # CDK app
│   ├── cdk.json
├── package.json
├── tsconfig.json
├── jest.config.js
├── Dockerfile                    # Node.js container
├── .env.example                  # AWS region, model config
├── README.md
└── master-plan.md                # This file
```

---

## WEEK 1: Setup & Foundation (Feb 2-8)

### Task 1: Set up GitHub Repository & Project Structure
**Due:** Monday, Feb 2, 2026  
**Priority:** High  
**Time Estimate:** 1 hour

**Details:**

**1. Initialize Repository:**
```bash
cd ~/projects/aws-architecture-copilot
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/rasensio/aws-architecture-copilot.git
git push -u origin main
```

**2. Create Basic Project Structure:**
```bash
# Create directories
mkdir -p src/{agent,tools} tests deployment/{lib,bin}

# Initialize Node.js project
npm init -y

# Update package.json type
npm pkg set type=module
npm pkg set scripts.dev="tsx watch src/index.ts"
npm pkg set scripts.build="tsc"
npm pkg set scripts.test="jest"
npm pkg set scripts.start="node dist/index.js"
```

**3. Create `.gitignore`:**
```
node_modules/
dist/
.env
*.log
cdk.out/
.DS_Store
```

**4. Update README.md:**
```markdown
# AWS Architecture Copilot

AI agent that generates AWS architectures from natural language using Strands + AWS Bedrock.

## Features
- 🤖 Powered by Claude Sonnet 4 via AWS Bedrock
- 📚 AWS best practices via MCP integration
- 🎨 Generates Mermaid architecture diagrams
- 📦 Produces TypeScript AWS CDK code
- ✅ Tested on 5+ architecture patterns

## Tech Stack
- TypeScript + Strands Agents
- AWS Bedrock (Claude Sonnet 4)
- AWS CDK (TypeScript)
- Deployed on ECS Fargate

[More details coming soon...]
```

**Acceptance Criteria:**
- ✅ GitHub repo initialized and pushed
- ✅ Project structure created
- ✅ README with project description
- ✅ .gitignore configured

---

### Task 2: Install Development Environment
**Due:** Tuesday, Feb 3, 2026  
**Priority:** High  
**Time Estimate:** 2 hours

**Details:**

**1. Install Node.js 20+ (if not installed):**
```bash
# macOS (using Homebrew)
brew install node@20

# Verify
node --version  # Should be 20+
npm --version
```

**2. Install TypeScript and Development Tools:**
```bash
npm install -D typescript @types/node tsx
npm install -D @tsconfig/node20

# Create tsconfig.json
npx tsc --init --target ES2022 --module ESNext --moduleResolution bundler \
  --outDir dist --rootDir src --strict --esModuleInterop
```

**3. Install Strands Agents SDK:**
```bash
npm install @strands-agents/sdk zod
```

**4. Install AWS SDK and Tools:**
```bash
# AWS SDK v3
npm install @aws-sdk/client-bedrock-runtime

# AWS CDK CLI (global)
npm install -g aws-cdk

# AWS CDK libraries (for code generation)
npm install aws-cdk-lib constructs
```

**5. Install Testing Framework:**
```bash
npm install -D jest @types/jest ts-jest
npx ts-jest config:init
```

**6. Install AWS CLI (if not installed):**
```bash
# macOS
brew install awscli

# Configure AWS credentials
aws configure
# Enter: Access Key ID, Secret Access Key, Region (us-east-1), Output (json)
```

**7. Install Docker Desktop:**
- Download from docker.com
- Verify: `docker --version`

**8. Install VS Code Extensions:**
- TypeScript (Microsoft)
- ESLint
- Prettier
- AWS Toolkit
- Docker

**9. Configure AWS Bedrock Access:**
```bash
# Ensure Bedrock model access in AWS Console
# Go to: AWS Console → Bedrock → Model access
# Enable: Claude 3.5 Sonnet and Claude 4 Sonnet

# Test Bedrock access
aws bedrock list-foundation-models --region us-east-1
```

**10. Create `.env.example`:**
```bash
# AWS Configuration
AWS_REGION=us-east-1
AWS_BEDROCK_MODEL_ID=anthropic.claude-sonnet-4-20250514-v1:0

# Optional: Specify AWS credentials (if not using default profile)
# AWS_ACCESS_KEY_ID=your_key
# AWS_SECRET_ACCESS_KEY=your_secret
```

**Acceptance Criteria:**
- ✅ Node.js 20+ installed
- ✅ TypeScript configured
- ✅ Strands SDK installed
- ✅ AWS CLI configured with Bedrock access
- ✅ Docker running
- ✅ VS Code with extensions

---

### Task 3: Learn Strands Framework Basics
**Due:** Thursday, Feb 5, 2026  
**Priority:** High  
**Time Estimate:** 4-5 hours

**Details:**

**Goal:** Understand Strands agent architecture and build a simple example

**Official Resources:**
- Strands Docs: https://strandsagents.com/
- GitHub: https://github.com/strands-agents/sdk-typescript
- TypeScript Examples: https://github.com/strands-agents/samples

**Learning Path:**

**1. Basic Agent Creation (1 hour):**

Create `examples/01-basic-agent.ts`:
```typescript
import { Agent, BedrockModel } from '@strands-agents/sdk'

// Create agent with default Bedrock model (Claude Sonnet 4)
const agent = new Agent({
  systemPrompt: 'You are a helpful assistant.',
})

// Invoke agent
const result = await agent.invoke('What is AWS Lambda?')
console.log(result.lastMessage)
```

Run: `npx tsx examples/01-basic-agent.ts`

**2. Agent with Custom Bedrock Configuration (30 min):**

Create `examples/02-bedrock-config.ts`:
```typescript
import { Agent, BedrockModel } from '@strands-agents/sdk'

const model = new BedrockModel({
  region: 'us-east-1',
  modelId: 'anthropic.claude-sonnet-4-20250514-v1:0',
  temperature: 0.3,
  maxTokens: 4096,
})

const agent = new Agent({
  model,
  systemPrompt: 'You are an AWS architecture expert.',
})

const result = await agent.invoke(
  'What are the key components of a scalable web application on AWS?'
)
console.log(result.lastMessage)
```

**3. Agent with Tools (1.5 hours):**

Create `examples/03-agent-with-tools.ts`:
```typescript
import { Agent, tool } from '@strands-agents/sdk'
import { z } from 'zod'

// Define a simple calculator tool
const calculator = tool({
  name: 'calculator',
  description: 'Performs basic arithmetic operations',
  inputSchema: z.object({
    operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
    a: z.number().describe('First number'),
    b: z.number().describe('Second number'),
  }),
  callback: (input) => {
    switch (input.operation) {
      case 'add': return input.a + input.b
      case 'subtract': return input.a - input.b
      case 'multiply': return input.a * input.b
      case 'divide': 
        if (input.b === 0) throw new Error('Cannot divide by zero')
        return input.a / input.b
    }
  },
})

// Create agent with tool
const agent = new Agent({
  systemPrompt: 'You are a helpful assistant. Use the calculator tool when needed.',
  tools: [calculator],
})

await agent.invoke('What is 42 multiplied by 137?')
console.log('Agent response:', agent.messages[agent.messages.length - 1])
```

**4. Agent State Management (1 hour):**

Create `examples/04-agent-state.ts`:
```typescript
import { Agent, tool } from '@strands-agents/sdk'
import { z } from 'zod'

// Tool that uses agent state
const counterTool = tool({
  name: 'increment_counter',
  description: 'Increments a counter stored in agent state',
  inputSchema: z.object({}),
  callback: (input, context) => {
    if (!context) throw new Error('Context required')
    
    const currentCount = context.agent.state.get<number>('counter') ?? 0
    const newCount = currentCount + 1
    context.agent.state.set('counter', newCount)
    
    return `Counter incremented to ${newCount}`
  },
})

const agent = new Agent({
  state: { counter: 0 },
  tools: [counterTool],
})

await agent.invoke('Increment the counter')
await agent.invoke('Increment it again')
await agent.invoke('Increment one more time')

console.log('Final count:', agent.state.get('counter')) // Should be 3
```

**5. Streaming Responses (30 min):**

Create `examples/05-streaming.ts`:
```typescript
import { Agent } from '@strands-agents/sdk'

const agent = new Agent({
  systemPrompt: 'You are a storyteller.',
})

console.log('Streaming response:')
for await (const event of agent.stream('Tell me a short story about a cloud architect.')) {
  if (event.type === 'modelContentBlockDeltaEvent' && event.delta.type === 'textDelta') {
    process.stdout.write(event.delta.text)
  }
}
console.log('\n\nDone!')
```

**6. Study MCP Integration (30 min):**

Read about MCP (Model Context Protocol) integration:
- Strands has native MCP client support
- We'll use AWS Documentation MCP server for RAG
- No need to build custom vector store

**Acceptance Criteria:**
- ✅ Created and ran all 5 example scripts
- ✅ Understand agent creation, tools, and state
- ✅ Can create custom tools with Zod schemas
- ✅ Understand streaming responses
- ✅ Know how MCP works in Strands

---

### Task 4: Set up AWS Documentation MCP Server
**Due:** Saturday, Feb 7, 2026  
**Priority:** High  
**Time Estimate:** 2-3 hours

**Details:**

**Goal:** Integrate AWS Documentation MCP server for RAG-powered best practices

**Background:**
Instead of building a custom RAG pipeline with vector stores, we'll use the official AWS Documentation MCP server. This provides instant access to AWS docs, best practices, and Well-Architected Framework content.

**Implementation:**

**1. Install MCP Server (Python-based):**
```bash
# Install uvx (pipx wrapper) if not installed
brew install pipx
pipx ensurepath

# Test AWS docs MCP server
uvx awslabs.aws-documentation-mcp-server@latest
```

**2. Create MCP Integration Test:**

Create `examples/06-mcp-integration.ts`:
```typescript
import { Agent, McpClient } from '@strands-agents/sdk'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

// Create MCP client for AWS documentation
const awsDocs = new McpClient({
  transport: new StdioClientTransport({
    command: 'uvx',
    args: ['awslabs.aws-documentation-mcp-server@latest'],
  }),
})

// Wait for connection
await new Promise(resolve => setTimeout(resolve, 2000))

// Create agent with MCP tools
const agent = new Agent({
  systemPrompt: `You are an AWS architecture expert. Use the AWS documentation 
tools to answer questions with accurate, up-to-date information.`,
  tools: [awsDocs],
})

// Test queries
console.log('Testing MCP integration...\n')

const result1 = await agent.invoke(
  'What are AWS best practices for high availability?'
)
console.log('Answer 1:', result1.lastMessage, '\n')

const result2 = await agent.invoke(
  'Explain the AWS Well-Architected Framework pillars'
)
console.log('Answer 2:', result2.lastMessage, '\n')

// Clean up
await awsDocs.disconnect()
```

Run: `npx tsx examples/06-mcp-integration.ts`

**3. Create Reusable MCP Helper:**

Create `src/tools/mcpClient.ts`:
```typescript
import { McpClient } from '@strands-agents/sdk'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

export async function createAwsDocsMCP(): Promise<McpClient> {
  const client = new McpClient({
    transport: new StdioClientTransport({
      command: 'uvx',
      args: ['awslabs.aws-documentation-mcp-server@latest'],
    }),
  })

  // Wait for connection to establish
  await new Promise(resolve => setTimeout(resolve, 2000))

  return client
}
```

**4. Test Different AWS Queries:**

Create `examples/07-mcp-scenarios.ts`:
```typescript
import { Agent } from '@strands-agents/sdk'
import { createAwsDocsMCP } from '../src/tools/mcpClient.js'

const awsDocs = await createAwsDocsMCP()

const agent = new Agent({
  systemPrompt: 'You are an AWS solutions architect.',
  tools: [awsDocs],
})

const testQueries = [
  'What services should I use for a scalable web application?',
  'How do I implement caching with ElastiCache?',
  'What are the key considerations for RDS Multi-AZ?',
  'Explain AWS Lambda best practices',
]

for (const query of testQueries) {
  console.log(`\nQuery: ${query}`)
  const result = await agent.invoke(query)
  console.log(`Answer: ${result.lastMessage}\n`)
  console.log('---')
}

await awsDocs.disconnect()
```

**Troubleshooting:**

If MCP server fails to start:
```bash
# Test directly
uvx awslabs.aws-documentation-mcp-server@latest

# Check Python/uvx installation
which uvx
python3 --version
```

**Acceptance Criteria:**
- ✅ AWS Documentation MCP server working
- ✅ Agent can query AWS docs successfully
- ✅ Reusable MCP helper created
- ✅ Tested with multiple AWS-related queries
- ✅ Understand MCP vs custom RAG tradeoffs

---

### Task 5: Create Project Architecture Plan
**Due:** Sunday, Feb 8, 2026  
**Priority:** High  
**Time Estimate:** 2-3 hours

**Details:**

**Goal:** Document the technical architecture and agent workflow

**Create `PROJECT_PLAN.md`:**

```markdown
# AWS Architecture Copilot - Technical Design

## 1. Project Overview

**Problem:** Cloud architecture design is time-consuming, requires deep AWS expertise, and translating requirements to infrastructure code is tedious.

**Solution:** An AI agent that:
- Understands requirements in natural language
- Retrieves AWS best practices via MCP
- Designs appropriate architecture
- Generates both Mermaid diagrams and TypeScript CDK code

**Target Users:**
- Cloud architects exploring design options
- DevOps engineers needing quick IaC templates
- Developers learning AWS best practices

## 2. Technical Architecture

### System Architecture
```
User Input (Natural Language)
    ↓
Strands Agent (Claude Sonnet 4 via Bedrock)
    ↓
├─→ AWS Docs MCP Server (Best Practices)
├─→ CDK Generator Tool (TypeScript)
└─→ Mermaid Generator Tool (Diagrams)
    ↓
Output: Architecture Design + Diagram + CDK Code
```

### Agent Workflow
```
Step 1: UNDERSTAND REQUIREMENTS
- Parse user input
- Classify architecture type (web_app, data_pipeline, ml_platform, etc.)
- Extract constraints (scale, cost, security requirements)

Step 2: RETRIEVE BEST PRACTICES
- Query AWS Documentation MCP
- Get relevant Well-Architected Framework content
- Retrieve service-specific recommendations

Step 3: DESIGN ARCHITECTURE
- Use agent reasoning with MCP context
- Select appropriate AWS services
- Define service relationships
- Document architecture decisions

Step 4: GENERATE ARTIFACTS
- Call CDK Generator Tool → TypeScript CDK code
- Call Mermaid Generator Tool → Architecture diagram
- Validate both outputs

Step 5: RETURN RESULTS
- Architecture explanation
- Mermaid diagram code
- TypeScript CDK code
- Deployment instructions
```

## 3. Tech Stack Decisions

### Why Strands vs LangGraph?
- **Simpler:** Function-based tools vs graph state management
- **AWS Native:** Built-in Bedrock support, no API key management
- **TypeScript First:** Better for CDK code generation
- **MCP Built-in:** Native integration vs custom implementation

### Why MCP vs Custom RAG?
- **Less Code:** No vector store, embeddings, or chunking logic
- **Always Updated:** AWS docs server maintained by AWS
- **Multiple Sources:** Can add more MCP servers easily
- **Production Ready:** Battle-tested by AWS

### Why TypeScript CDK Output?
- **Consistency:** Same language as agent code
- **Type Safety:** Better IDE support for generated code
- **Modern Standard:** Most new AWS CDK projects use TypeScript
- **Ecosystem:** Better tooling and community support

## 4. Agent State Design

```typescript
interface ArchitectureState {
  // User input
  requirements: string
  
  // Classification
  architectureType: 'web_app' | 'data_pipeline' | 'ml_platform' | 
                    'serverless_api' | 'data_warehouse' | 'other'
  
  // Constraints
  constraints: {
    scale?: string           // "50k users", "10k events/sec"
    budget?: string          // "cost-optimized", "performance-first"
    security?: string[]      // ["PCI-DSS", "HIPAA"]
    availability?: string    // "high", "standard"
  }
  
  // Architecture design
  components: string[]       // AWS service names
  reasoning: string          // Why these services
  bestPractices: string      // Retrieved from MCP
  
  // Generated artifacts
  cdkCode: string           // TypeScript CDK
  diagram: string           // Mermaid syntax
}
```

## 5. Tool Specifications

### Tool 1: CDK Code Generator
```typescript
{
  name: 'generate_cdk_code',
  description: 'Generates TypeScript AWS CDK code for the architecture',
  inputs: {
    components: string[],
    architectureType: string,
    reasoning: string
  },
  output: string (TypeScript CDK code)
}
```

### Tool 2: Mermaid Diagram Generator
```typescript
{
  name: 'generate_mermaid_diagram',
  description: 'Generates Mermaid flowchart for the architecture',
  inputs: {
    components: string[],
    relationships: Array<{from: string, to: string, label: string}>
  },
  output: string (Mermaid syntax)
}
```

## 6. Success Metrics

**Functional:**
- ✅ Generates valid architectures for 5+ scenarios
- ✅ CDK code compiles without errors
- ✅ Diagrams render correctly in Mermaid Live
- ✅ Follows AWS Well-Architected principles

**Non-Functional:**
- Response time: < 30 seconds
- CDK synthesis: 100% success rate
- Best practices coverage: 80%+ accuracy

## 7. Milestones

- **Week 1 (Done):** Setup, Strands learning, MCP integration
- **Week 2:** Core agent with state management
- **Week 3:** CDK and Mermaid generator tools
- **Week 4:** Testing, demo, deployment, launch

## 8. Future Enhancements

**Phase 2 (Post-Launch):**
- Cost estimation tool
- Interactive refinement (multi-turn conversations)
- Architecture comparison (Option A vs B)
- Export to Terraform (in addition to CDK)

**Phase 3 (Long-term):**
- Multi-cloud support (Azure, GCP)
- Integration with existing AWS accounts
- Automated deployment via CDK pipelines
- Architecture review/audit mode
```

**Create Architecture Diagram:**

Use Excalidraw or Draw.io to create a visual diagram, save as `docs/architecture.png`

**Acceptance Criteria:**
- ✅ PROJECT_PLAN.md created and detailed
- ✅ Agent workflow documented
- ✅ Tool specifications defined
- ✅ Success metrics established
- ✅ Architecture diagram created

---

## WEEK 2: Core Agent Development (Feb 9-15)

### Task 6: Build Core Agent with Strands
**Due:** Saturday, Feb 14, 2026  
**Priority:** High  
**Time Estimate:** 10-12 hours

**Details:**

**Goal:** Create the main agent that orchestrates the architecture generation process

**Implementation Steps:**

**1. Define Agent State Interface:**

Create `src/agent/state.ts`:
```typescript
export interface ArchitectureState {
  // User input
  requirements: string
  
  // Classification
  architectureType: 'web_app' | 'data_pipeline' | 'ml_platform' | 
                    'serverless_api' | 'data_warehouse' | 'other'
  
  // Constraints
  constraints: {
    scale?: string
    budget?: 'cost-optimized' | 'balanced' | 'performance-first'
    security?: string[]
    availability?: 'standard' | 'high' | 'maximum'
  }
  
  // AWS components
  components: AWSComponent[]
  reasoning: string
  bestPractices: string
  
  // Generated outputs
  cdkCode?: string
  diagram?: string
}

export interface AWSComponent {
  service: string           // e.g., "Amazon RDS"
  purpose: string          // e.g., "Primary database"
  configuration?: string   // e.g., "Multi-AZ, PostgreSQL"
}
```

**2. Create Main Agent:**

Create `src/agent/index.ts`:
```typescript
import { Agent, BedrockModel } from '@strands-agents/sdk'
import { createAwsDocsMCP } from '../tools/mcpClient.js'
import { cdkGeneratorTool } from '../tools/cdkGenerator.js'
import { mermaidGeneratorTool } from '../tools/mermaidGenerator.js'
import type { ArchitectureState } from './state.js'

export async function createArchitectureAgent() {
  // Initialize MCP for AWS documentation
  const awsDocs = await createAwsDocsMCP()
  
  // Configure Bedrock model
  const model = new BedrockModel({
    region: process.env.AWS_REGION || 'us-east-1',
    modelId: process.env.AWS_BEDROCK_MODEL_ID || 
             'anthropic.claude-sonnet-4-20250514-v1:0',
    temperature: 0.3,
    maxTokens: 8192,
  })
  
  // Create agent with tools
  const agent = new Agent({
    model,
    systemPrompt: `You are an expert AWS Solutions Architect with 20+ years of experience.

Your role is to:
1. Understand user requirements for AWS architectures
2. Retrieve relevant AWS best practices and documentation
3. Design production-ready architectures following AWS Well-Architected Framework
4. Generate both visual diagrams (Mermaid) and infrastructure code (AWS CDK TypeScript)

Key principles:
- Always prioritize security and cost-optimization
- Follow AWS Well-Architected Framework (5 pillars)
- Suggest managed services over self-managed when possible
- Consider scale, availability, and disaster recovery
- Generate clear, well-documented code

When a user provides requirements:
1. First, classify the architecture type (web app, data pipeline, etc.)
2. Use AWS documentation tools to find best practices
3. Design the architecture with proper service selection
4. Use the CDK generator tool to create TypeScript code
5. Use the Mermaid generator tool to create a diagram
6. Explain your reasoning clearly`,
    
    tools: [
      awsDocs,
      cdkGeneratorTool,
      mermaidGeneratorTool,
    ],
    
    state: {
      requirements: '',
      architectureType: 'other' as const,
      constraints: {},
      components: [],
      reasoning: '',
      bestPractices: '',
    },
  })
  
  return { agent, awsDocs }
}

// Helper to generate architecture
export async function generateArchitecture(
  requirements: string
): Promise<ArchitectureState> {
  const { agent, awsDocs } = await createArchitectureAgent()
  
  try {
    // Invoke agent with user requirements
    const result = await agent.invoke(
      `Generate an AWS architecture for the following requirements:\n\n${requirements}\n\n
Please:
1. Analyze the requirements
2. Search AWS documentation for best practices
3. Design the architecture
4. Generate CDK code using the generate_cdk_code tool
5. Generate a Mermaid diagram using the generate_mermaid_diagram tool
6. Provide a detailed explanation`
    )
    
    // Extract state
    const state = agent.state.getAll() as ArchitectureState
    
    return {
      requirements,
      architectureType: state.architectureType || 'other',
      constraints: state.constraints || {},
      components: state.components || [],
      reasoning: state.reasoning || result.lastMessage,
      bestPractices: state.bestPractices || '',
      cdkCode: state.cdkCode,
      diagram: state.diagram,
    }
  } finally {
    await awsDocs.disconnect()
  }
}
```

**3. Create Entry Point:**

Create `src/index.ts`:
```typescript
import { generateArchitecture } from './agent/index.js'

// Example usage
const requirements = `
I need a scalable e-commerce platform that can handle:
- 50,000 concurrent users
- Product catalog with images
- Shopping cart and checkout
- Payment processing
- Order tracking
- Must be highly available and secure
- Budget: balanced between cost and performance
`

console.log('Generating AWS architecture...\n')

const result = await generateArchitecture(requirements)

console.log('=== ARCHITECTURE GENERATED ===\n')
console.log('Type:', result.architectureType)
console.log('\nComponents:')
result.components.forEach(c => {
  console.log(`  - ${c.service}: ${c.purpose}`)
})

console.log('\nReasoning:', result.reasoning)

if (result.cdkCode) {
  console.log('\n=== CDK CODE (PREVIEW) ===')
  console.log(result.cdkCode.substring(0, 500) + '...')
}

if (result.diagram) {
  console.log('\n=== MERMAID DIAGRAM ===')
  console.log(result.diagram)
}
```

**4. Create Placeholder Tools (to be implemented in Week 3):**

Create `src/tools/cdkGenerator.ts`:
```typescript
import { tool } from '@strands-agents/sdk'
import { z } from 'zod'

export const cdkGeneratorTool = tool({
  name: 'generate_cdk_code',
  description: 'Generates TypeScript AWS CDK code for the architecture',
  inputSchema: z.object({
    components: z.array(z.string()).describe('List of AWS services to provision'),
    architectureType: z.string().describe('Type of architecture (web_app, data_pipeline, etc.)'),
    reasoning: z.string().describe('Architecture decisions and reasoning'),
  }),
  callback: async (input, context) => {
    // Placeholder - will implement in Task 7
    const code = `import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'

export class GeneratedArchitectureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)
    
    // TODO: Generate based on ${input.architectureType}
    // Components: ${input.components.join(', ')}
  }
}`
    
    if (context) {
      context.agent.state.set('cdkCode', code)
    }
    
    return code
  },
})
```

Create `src/tools/mermaidGenerator.ts`:
```typescript
import { tool } from '@strands-agents/sdk'
import { z } from 'zod'

export const mermaidGeneratorTool = tool({
  name: 'generate_mermaid_diagram',
  description: 'Generates Mermaid flowchart diagram for the architecture',
  inputSchema: z.object({
    components: z.array(z.string()).describe('List of AWS services'),
    relationships: z.array(z.object({
      from: z.string(),
      to: z.string(),
      label: z.string().optional(),
    })).optional(),
  }),
  callback: async (input, context) => {
    // Placeholder - will implement in Task 8
    const diagram = `graph TD
    A[User/Client] -->|HTTPS| B[CloudFront]
    B --> C[Application Load Balancer]
    C --> D[ECS Fargate]
    D --> E[RDS PostgreSQL]
    
    %% Components: ${input.components.join(', ')}`
    
    if (context) {
      context.agent.state.set('diagram', diagram)
    }
    
    return diagram
  },
})
```

**5. Test the Agent:**

```bash
npm run dev
# Or: npx tsx src/index.ts
```

**6. Add Error Handling:**

Update `src/agent/index.ts` with proper error handling:
```typescript
export async function generateArchitecture(
  requirements: string
): Promise<ArchitectureState> {
  // Validate input
  if (!requirements || requirements.length < 20) {
    throw new Error('Requirements too short. Please provide more detail.')
  }
  
  if (requirements.length > 5000) {
    throw new Error('Requirements too long. Please be more concise.')
  }
  
  const { agent, awsDocs } = await createArchitectureAgent()
  
  try {
    const result = await agent.invoke(/* ... */)
    return { /* ... */ }
  } catch (error) {
    console.error('Architecture generation failed:', error)
    throw new Error(
      `Failed to generate architecture: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  } finally {
    await awsDocs.disconnect()
  }
}
```

**7. Test with Multiple Scenarios:**

Create `tests/manual-test.ts`:
```typescript
import { generateArchitecture } from '../src/agent/index.js'

const scenarios = [
  'I need a simple REST API for a mobile app with user authentication',
  'I need a real-time data pipeline for clickstream analytics',
  'I need an ML training platform for computer vision models',
]

for (const req of scenarios) {
  console.log(`\n${'='.repeat(60)}`)
  console.log('Requirements:', req)
  console.log('='.repeat(60))
  
  try {
    const result = await generateArchitecture(req)
    console.log('✅ Success!')
    console.log('Type:', result.architectureType)
    console.log('Components:', result.components.map(c => c.service).join(', '))
  } catch (error) {
    console.error('❌ Error:', error)
  }
}
```

**Acceptance Criteria:**
- ✅ Agent successfully invokes with user requirements
- ✅ MCP integration works for AWS documentation queries
- ✅ Agent state is properly managed
- ✅ Placeholder tools are called correctly
- ✅ Error handling prevents crashes
- ✅ Tested with 3+ different scenarios
- ✅ Code is well-structured and typed

---

## WEEK 3: Tool Integration (Feb 16-22)

### Task 7: Implement AWS CDK Code Generator Tool
**Due:** Wednesday, Feb 18, 2026  
**Priority:** High  
**Time Estimate:** 8-10 hours

**Details:**

**Goal:** Generate production-ready TypeScript AWS CDK code

**Implementation:**

Update `src/tools/cdkGenerator.ts`:
```typescript
import { tool } from '@strands-agents/sdk'
import { z } from 'zod'

export const cdkGeneratorTool = tool({
  name: 'generate_cdk_code',
  description: `Generates production-ready TypeScript AWS CDK code for infrastructure.
Supports: web applications, data pipelines, ML platforms, serverless APIs, and data warehouses.`,
  
  inputSchema: z.object({
    components: z.array(z.string()).describe(
      'List of AWS services (e.g., ["ALB", "ECS", "RDS", "ElastiCache"])'
    ),
    architectureType: z.enum([
      'web_app',
      'data_pipeline', 
      'ml_platform',
      'serverless_api',
      'data_warehouse',
      'other',
    ]).describe('Type of architecture to generate'),
    reasoning: z.string().describe('Architecture decisions and requirements'),
  }),
  
  callback: async (input, context) => {
    const { components, architectureType, reasoning } = input
    
    // Generate CDK code based on architecture type
    let code = generateCDKBoilerplate()
    
    // Add components based on type
    switch (architectureType) {
      case 'web_app':
        code += generateWebAppStack(components, reasoning)
        break
      case 'data_pipeline':
        code += generateDataPipelineStack(components, reasoning)
        break
      case 'ml_platform':
        code += generateMLPlatformStack(components, reasoning)
        break
      case 'serverless_api':
        code += generateServerlessAPIStack(components, reasoning)
        break
      case 'data_warehouse':
        code += generateDataWarehouseStack(components, reasoning)
        break
      default:
        code += generateGenericStack(components, reasoning)
    }
    
    code += generateStackFooter()
    
    // Save to agent state
    if (context) {
      context.agent.state.set('cdkCode', code)
    }
    
    return code
  },
})

function generateCDKBoilerplate(): string {
  return `import * as cdk from 'aws-cdk-lib'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as rds from 'aws-cdk-lib/aws-rds'
import * as elasticache from 'aws-cdk-lib/aws-elasticache'
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as cognito from 'aws-cdk-lib/aws-cognito'
import { Construct } from 'constructs'

/**
 * Generated AWS Architecture Stack
 * 
 * This infrastructure code was automatically generated by AWS Architecture Copilot.
 * Review and customize before deploying to production.
 */
export class GeneratedArchitectureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)
    
`
}

function generateWebAppStack(components: string[], reasoning: string): string {
  let code = `    // VPC for network isolation\n`
  code += `    const vpc = new ec2.Vpc(this, 'VPC', {\n`
  code += `      maxAzs: 2,\n`
  code += `      natGateways: 1,\n`
  code += `    })\n\n`
  
  if (components.some(c => c.match(/ALB|Load Balancer/i))) {
    code += `    // Application Load Balancer\n`
    code += `    const alb = new elbv2.ApplicationLoadBalancer(this, 'ALB', {\n`
    code += `      vpc,\n`
    code += `      internetFacing: true,\n`
    code += `    })\n\n`
  }
  
  if (components.some(c => c.match(/ECS|Fargate/i))) {
    code += `    // ECS Cluster for containerized applications\n`
    code += `    const cluster = new ecs.Cluster(this, 'Cluster', { vpc })\n\n`
    
    code += `    // Fargate Task Definition\n`
    code += `    const taskDef = new ecs.FargateTaskDefinition(this, 'TaskDef', {\n`
    code += `      memoryLimitMiB: 2048,\n`
    code += `      cpu: 1024,\n`
    code += `    })\n\n`
    
    code += `    taskDef.addContainer('app', {\n`
    code += `      image: ecs.ContainerImage.fromRegistry('nginx'),\n`
    code += `      portMappings: [{ containerPort: 80 }],\n`
    code += `      logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'app' }),\n`
    code += `    })\n\n`
    
    code += `    // Fargate Service\n`
    code += `    const service = new ecs.FargateService(this, 'Service', {\n`
    code += `      cluster,\n`
    code += `      taskDefinition: taskDef,\n`
    code += `      desiredCount: 2,\n`
    code += `    })\n\n`
  }
  
  if (components.some(c => c.match(/RDS|Database/i))) {
    code += `    // RDS PostgreSQL Database (Multi-AZ for high availability)\n`
    code += `    const database = new rds.DatabaseInstance(this, 'Database', {\n`
    code += `      engine: rds.DatabaseInstanceEngine.postgres({\n`
    code += `        version: rds.PostgresEngineVersion.VER_15,\n`
    code += `      }),\n`
    code += `      vpc,\n`
    code += `      multiAz: true,\n`
    code += `      allocatedStorage: 100,\n`
    code += `      instanceType: ec2.InstanceType.of(\n`
    code += `        ec2.InstanceClass.T3,\n`
    code += `        ec2.InstanceSize.MEDIUM\n`
    code += `      ),\n`
    code += `      removalPolicy: cdk.RemovalPolicy.SNAPSHOT,\n`
    code += `    })\n\n`
  }
  
  if (components.some(c => c.match(/ElastiCache|Redis|Cache/i))) {
    code += `    // ElastiCache Redis for caching\n`
    code += `    const subnetGroup = new elasticache.CfnSubnetGroup(this, 'CacheSubnetGroup', {\n`
    code += `      description: 'Subnet group for ElastiCache',\n`
    code += `      subnetIds: vpc.privateSubnets.map(s => s.subnetId),\n`
    code += `    })\n\n`
    
    code += `    const cache = new elasticache.CfnCacheCluster(this, 'Cache', {\n`
    code += `      engine: 'redis',\n`
    code += `      cacheNodeType: 'cache.t3.micro',\n`
    code += `      numCacheNodes: 1,\n`
    code += `      cacheSubnetGroupName: subnetGroup.ref,\n`
    code += `    })\n\n`
  }
  
  if (components.some(c => c.match(/S3|Storage/i))) {
    code += `    // S3 Bucket for static assets\n`
    code += `    const assetBucket = new s3.Bucket(this, 'AssetBucket', {\n`
    code += `      encryption: s3.BucketEncryption.S3_MANAGED,\n`
    code += `      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,\n`
    code += `      removalPolicy: cdk.RemovalPolicy.RETAIN,\n`
    code += `    })\n\n`
  }
  
  if (components.some(c => c.match(/CloudFront|CDN/i))) {
    code += `    // CloudFront Distribution for content delivery\n`
    code += `    const distribution = new cloudfront.Distribution(this, 'Distribution', {\n`
    code += `      defaultBehavior: {\n`
    code += `        origin: new cloudfront.HttpOrigin(alb.loadBalancerDnsName),\n`
    code += `      },\n`
    code += `    })\n\n`
  }
  
  return code
}

function generateServerlessAPIStack(components: string[], reasoning: string): string {
  let code = `    // DynamoDB Table\n`
  code += `    const table = new dynamodb.Table(this, 'Table', {\n`
  code += `      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },\n`
  code += `      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,\n`
  code += `      removalPolicy: cdk.RemovalPolicy.RETAIN,\n`
  code += `    })\n\n`
  
  if (components.some(c => c.match(/Cognito|Auth/i))) {
    code += `    // Cognito User Pool for authentication\n`
    code += `    const userPool = new cognito.UserPool(this, 'UserPool', {\n`
    code += `      selfSignUpEnabled: true,\n`
    code += `      signInAliases: { email: true },\n`
    code += `      autoVerify: { email: true },\n`
    code += `    })\n\n`
  }
  
  code += `    // Lambda Function\n`
  code += `    const fn = new lambda.Function(this, 'ApiFunction', {\n`
  code += `      runtime: lambda.Runtime.NODEJS_20_X,\n`
  code += `      handler: 'index.handler',\n`
  code += `      code: lambda.Code.fromInline('exports.handler = async () => ({ statusCode: 200, body: "Hello" })'),\n`
  code += `      environment: {\n`
  code += `        TABLE_NAME: table.tableName,\n`
  code += `      },\n`
  code += `    })\n\n`
  
  code += `    table.grantReadWriteData(fn)\n\n`
  
  code += `    // API Gateway\n`
  code += `    const api = new apigateway.RestApi(this, 'Api', {\n`
  code += `      restApiName: 'Serverless API',\n`
  code += `    })\n\n`
  
  code += `    const integration = new apigateway.LambdaIntegration(fn)\n`
  code += `    api.root.addMethod('ANY', integration)\n\n`
  
  return code
}

function generateDataPipelineStack(components: string[], reasoning: string): string {
  let code = `    // Kinesis Data Stream for real-time ingestion\n`
  code += `    const stream = new cdk.aws_kinesis.Stream(this, 'DataStream', {\n`
  code += `      shardCount: 2,\n`
  code += `    })\n\n`
  
  code += `    // Lambda for stream processing\n`
  code += `    const processor = new lambda.Function(this, 'StreamProcessor', {\n`
  code += `      runtime: lambda.Runtime.NODEJS_20_X,\n`
  code += `      handler: 'index.handler',\n`
  code += `      code: lambda.Code.fromInline('exports.handler = async (event) => console.log(event)'),\n`
  code += `    })\n\n`
  
  code += `    processor.addEventSource(\n`
  code += `      new cdk.aws_lambda_event_sources.KinesisEventSource(stream, {\n`
  code += `        startingPosition: lambda.StartingPosition.LATEST,\n`
  code += `      })\n`
  code += `    )\n\n`
  
  code += `    // S3 Bucket for data lake\n`
  code += `    const dataLake = new s3.Bucket(this, 'DataLake', {\n`
  code += `      encryption: s3.BucketEncryption.S3_MANAGED,\n`
  code += `      lifecycleRules: [\n`
  code += `        { transitions: [{ storageClass: s3.StorageClass.GLACIER, transitionAfter: cdk.Duration.days(90) }] },\n`
  code += `      ],\n`
  code += `    })\n\n`
  
  return code
}

function generateMLPlatformStack(components: string[], reasoning: string): string {
  return `    // S3 Bucket for ML artifacts\n` +
    `    const mlBucket = new s3.Bucket(this, 'MLBucket', {\n` +
    `      versioned: true,\n` +
    `      encryption: s3.BucketEncryption.S3_MANAGED,\n` +
    `    })\n\n` +
    `    // SageMaker execution role\n` +
    `    const sagemakerRole = new cdk.aws_iam.Role(this, 'SageMakerRole', {\n` +
    `      assumedBy: new cdk.aws_iam.ServicePrincipal('sagemaker.amazonaws.com'),\n` +
    `      managedPolicies: [\n` +
    `        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSageMakerFullAccess'),\n` +
    `      ],\n` +
    `    })\n\n` +
    `    mlBucket.grantReadWrite(sagemakerRole)\n\n`
}

function generateDataWarehouseStack(components: string[], reasoning: string): string {
  return `    // S3 Data Lake\n` +
    `    const dataLake = new s3.Bucket(this, 'DataLake', {\n` +
    `      encryption: s3.BucketEncryption.S3_MANAGED,\n` +
    `    })\n\n` +
    `    // Glue Database for data catalog\n` +
    `    const database = new cdk.aws_glue.CfnDatabase(this, 'GlueDatabase', {\n` +
    `      catalogId: cdk.Aws.ACCOUNT_ID,\n` +
    `      databaseInput: { name: 'analytics_db' },\n` +
    `    })\n\n` +
    `    // Redshift Cluster (for data warehouse)\n` +
    `    // Note: Consider using Redshift Serverless for cost optimization\n\n`
}

function generateGenericStack(components: string[], reasoning: string): string {
  return `    // Generic infrastructure\n` +
    `    // Components: ${components.join(', ')}\n` +
    `    // Customize based on your specific requirements\n\n`
}

function generateStackFooter(): string {
  return `  }
}

// CDK App
const app = new cdk.App()
new GeneratedArchitectureStack(app, 'GeneratedArchitectureStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
})
`
}
```

**Test CDK Code Generation:**

Create `tests/cdk-generation.test.ts`:
```typescript
import { cdkGeneratorTool } from '../src/tools/cdkGenerator.js'
import { writeFileSync } from 'fs'

const testCases = [
  {
    name: 'Web App',
    components: ['ALB', 'ECS', 'RDS', 'ElastiCache', 'S3', 'CloudFront'],
    architectureType: 'web_app' as const,
    reasoning: 'Scalable web application with caching and CDN',
  },
  {
    name: 'Serverless API',
    components: ['API Gateway', 'Lambda', 'DynamoDB', 'Cognito'],
    architectureType: 'serverless_api' as const,
    reasoning: 'Serverless REST API with authentication',
  },
]

for (const tc of testCases) {
  console.log(`\nTesting: ${tc.name}`)
  
  const result = await cdkGeneratorTool.invoke({
    components: tc.components,
    architectureType: tc.architectureType,
    reasoning: tc.reasoning,
  })
  
  console.log('✅ Code generated')
  
  // Save to file for manual inspection
  writeFileSync(`tests/output/cdk-${tc.name.toLowerCase().replace(' ', '-')}.ts`, result)
  
  // Test compilation
  console.log('Testing TypeScript syntax...')
  // You can use ts-node or tsc to validate syntax
}
```

**Acceptance Criteria:**
- ✅ Generates valid TypeScript CDK code
- ✅ Supports 5+ architecture types
- ✅ Code includes proper imports and constructs
- ✅ Generated code is well-commented
- ✅ Code can be compiled with `tsc`
- ✅ Tool properly updates agent state

---

### Task 8: Implement Mermaid Diagram Generator Tool
**Due:** Friday, Feb 20, 2026  
**Priority:** High  
**Time Estimate:** 6-8 hours

**Details:**

**Goal:** Generate clear, accurate Mermaid diagrams

Update `src/tools/mermaidGenerator.ts`:
```typescript
import { tool } from '@strands-agents/sdk'
import { z } from 'zod'

export const mermaidGeneratorTool = tool({
  name: 'generate_mermaid_diagram',
  description: `Generates Mermaid flowchart diagram for AWS architecture.
Shows data flow, service relationships, and protocols.`,
  
  inputSchema: z.object({
    components: z.array(z.object({
      service: z.string(),
      id: z.string(),
    })).describe('AWS services with unique IDs'),
    relationships: z.array(z.object({
      from: z.string(),
      to: z.string(),
      label: z.string().optional(),
    })).describe('Connections between services'),
  }),
  
  callback: async (input, context) => {
    const { components, relationships } = input
    
    // Generate Mermaid diagram
    let diagram = 'graph TD\n'
    
    // Add nodes
    components.forEach(c => {
      const label = formatServiceLabel(c.service)
      diagram += `    ${c.id}[${label}]\n`
    })
    
    diagram += '\n'
    
    // Add relationships
    relationships.forEach(r => {
      const arrow = r.label ? `-->|${r.label}|` : '-->'
      diagram += `    ${r.from} ${arrow} ${r.to}\n`
    })
    
    // Add styling
    diagram += `\n    classDef compute fill:#FF9900,stroke:#232F3E,stroke-width:2px`
    diagram += `\n    classDef database fill:#3B48CC,stroke:#232F3E,stroke-width:2px`
    diagram += `\n    classDef storage fill:#569A31,stroke:#232F3E,stroke-width:2px`
    
    if (context) {
      context.agent.state.set('diagram', diagram)
    }
    
    return diagram
  },
})

function formatServiceLabel(service: string): string {
  // Map service names to user-friendly labels
  const labelMap: Record<string, string> = {
    'ALB': 'Application Load Balancer',
    'ECS': 'ECS Fargate',
    'RDS': 'RDS PostgreSQL',
    'ElastiCache': 'ElastiCache Redis',
    'S3': 'S3 Bucket',
    'CloudFront': 'CloudFront CDN',
    'Lambda': 'Lambda Function',
    'DynamoDB': 'DynamoDB Table',
    'Cognito': 'Cognito User Pool',
    'Kinesis': 'Kinesis Data Stream',
  }
  
  return labelMap[service] || service
}
```

**Test Diagram Generation:**

Create `tests/diagram-generation.test.ts` and test with Mermaid Live Editor.

**Acceptance Criteria:**
- ✅ Generates valid Mermaid syntax
- ✅ Diagrams render in Mermaid Live Editor
- ✅ Shows proper data flow
- ✅ Includes connection labels
- ✅ Tested with 3+ architectures

---

## WEEK 4: Testing, Demo & Launch (Feb 23 - March 1)

### Task 9: Test with 5 Architecture Scenarios
**Due:** Tuesday, Feb 24, 2026  
**Priority:** High  
**Time Estimate:** 8-10 hours

Create comprehensive test suite in `tests/scenarios.test.ts` with the 5 scenarios from the original plan.

**Acceptance Criteria:**
- ✅ All 5 scenarios pass
- ✅ CDK code compiles
- ✅ Diagrams render correctly
- ✅ Agent follows AWS best practices

---

### Task 10: Add Error Handling & Validation
**Due:** Wednesday, Feb 25, 2026  
**Priority:** Medium  
**Time Estimate:** 4-5 hours

Implement:
- Input validation
- LLM retry logic with Strands hooks
- CDK code syntax validation
- Comprehensive logging
- User-friendly error messages

---

### Task 11: Create Demo Video
**Due:** Thursday, Feb 26, 2026  
**Priority:** High  
**Time Estimate:** 3-4 hours

Record 2-3 minute demo showing the agent in action.

---

### Task 12: Write Technical Blog Post
**Due:** Friday, Feb 27, 2026  
**Priority:** High  
**Time Estimate:** 6-8 hours

Write 2000+ word article explaining Strands, TypeScript, AWS Bedrock integration.

---

### Task 13: Deploy to AWS ECS Fargate
**Due:** Saturday, Feb 28, 2026  
**Priority:** High  
**Time Estimate:** 6-8 hours

**Dockerfile:**
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/
COPY tsconfig.json ./

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

**Deployment CDK Stack:**
Use TypeScript CDK to deploy the app itself to ECS Fargate.

---

### Task 14: Launch on LinkedIn
**Due:** Sunday, March 1, 2026  
**Priority:** High  
**Time Estimate:** 2-3 hours

Publish launch announcement with demo, GitHub link, and live demo URL.

Update LinkedIn post template to mention **Strands** instead of LangGraph.

---

## SUCCESS CRITERIA

**Project Completion:**
- ✅ Agent generates architectures for 5+ scenarios
- ✅ CDK code compiles and can be deployed
- ✅ Diagrams render correctly
- ✅ Follows AWS Well-Architected Framework
- ✅ Deployed live on AWS
- ✅ Demo video published
- ✅ Technical blog post published
- ✅ GitHub repo public with clear README

**Technical Quality:**
- Type-safe TypeScript throughout
- Comprehensive error handling
- Test coverage for critical paths
- Production-ready deployment
- Clear documentation

**Learning Outcomes:**
- Master Strands Agents framework
- Deep understanding of AWS Bedrock
- MCP integration patterns
- TypeScript + AWS CDK expertise
- Production AI deployment

---

## NEXT STEPS AFTER LAUNCH

**Week 5+:**
1. Gather user feedback
2. Add cost estimation feature
3. Support multi-turn conversations
4. Add architecture comparison mode
5. Create VS Code extension

**Long-term:**
- Multi-cloud support (Azure, GCP)
- Terraform output option
- Integration with AWS Organizations
- Architecture audit/review mode
- Automated deployment via CDK Pipelines

---

## RESOURCES

**Official Docs:**
- Strands: https://strandsagents.com/
- AWS Bedrock: https://aws.amazon.com/bedrock/
- AWS CDK: https://docs.aws.amazon.com/cdk/
- Mermaid: https://mermaid.js.org/

**Tools:**
- AWS Documentation MCP: https://github.com/awslabs/aws-documentation-mcp-server
- TypeScript: https://www.typescriptlang.org/
- Jest: https://jestjs.io/

**Community:**
- Strands Discord: (check strandsagents.com)
- AWS CDK Slack: cdk.dev
- MCP Community: modelcontextprotocol.io

---

**END OF MASTER PLAN**

Ready to build! 🚀
