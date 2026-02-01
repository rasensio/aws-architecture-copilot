# Quick Start Guide: AWS Architecture Copilot (Week 1 Setup)

**Last Updated**: 2026-01-31  
**Target**: Developers setting up the project for the first time

## Prerequisites

Before you begin, ensure you have:

- **Operating System**: macOS or Linux (commands assume bash/zsh)
- **Node.js**: Version 20 or higher ([download](https://nodejs.org/))
- **AWS Account**: With permissions for AWS Bedrock
- **Git**: For repository operations
- **Homebrew** (macOS): For installing dependencies

## Quick Setup (5 Minutes)

```bash
# 1. Clone the repository
git clone https://github.com/rasensio/aws-architecture-copilot.git
cd aws-architecture-copilot

# 2. Checkout Week 1 branch
git checkout 001-week1-setup

# 3. Install dependencies
npm install

# 4. Build the project
npm run build

# 5. Verify installation
npm test  # Should show "0 tests" - this is expected for Week 1
```

If all commands succeed, your environment is ready! Proceed to "Testing Your Setup" below.

## Detailed Setup

### Step 1: Install Node.js 20+

**Check if already installed**:
```bash
node --version  # Should show v20.x.x or higher
```

**Install via Homebrew (macOS)**:
```bash
brew install node@20
```

**Install via nvm (cross-platform)**:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

### Step 2: Configure AWS Credentials

The project uses AWS Bedrock for AI capabilities. You need valid AWS credentials.

**Option A: AWS CLI (Recommended)**

1. Install AWS CLI:
   ```bash
   # macOS
   brew install awscli
   
   # Or download from: https://aws.amazon.com/cli/
   ```

2. Configure credentials:
   ```bash
   aws configure
   ```
   
   Enter:
   - **AWS Access Key ID**: Your access key
   - **AWS Secret Access Key**: Your secret key
   - **Default region**: `us-east-1` (recommended)
   - **Output format**: `json`

3. Verify configuration:
   ```bash
   aws sts get-caller-identity
   # Should show your account ID and user ARN
   ```

**Option B: Environment Variables**

Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

Edit `.env` and add:
```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_BEDROCK_MODEL_ID=anthropic.claude-sonnet-4-20250514-v1:0
```

**⚠️ Security Warning**: Never commit `.env` files to git!

### Step 3: Enable AWS Bedrock Model Access

1. Open [AWS Console → Bedrock → Model Access](https://console.aws.amazon.com/bedrock/home#/modelaccess)
2. Click **"Enable specific models"**
3. Select:
   - ✅ Claude 3.5 Sonnet
   - ✅ Claude 4 Sonnet (if available)
4. Click **"Request model access"**
5. Wait 1-2 minutes for approval (usually instant)

**Verify model access**:
```bash
aws bedrock list-foundation-models --region us-east-1 \
  | grep -A 5 "claude-sonnet-4"
```

### Step 4: Install Python Dependencies (for MCP)

The AWS Documentation MCP server requires Python. We'll use `uvx` (via `pipx`):

```bash
# Install pipx
brew install pipx
pipx ensurepath

# Verify uvx works
uvx --version
```

**Test MCP server**:
```bash
uvx awslabs.aws-documentation-mcp-server@latest
# Press Ctrl+C to exit if it starts successfully
```

### Step 5: Install Project Dependencies

```bash
cd aws-architecture-copilot

# Install all npm packages
npm install

# This installs:
# - @strands-agents/sdk (agent framework)
# - @aws-sdk/client-bedrock-runtime (AWS Bedrock API)
# - typescript, tsx (TypeScript tools)
# - jest, ts-jest (testing)
# - zod (schema validation)
# - aws-cdk-lib, constructs (for CDK code generation)
```

**Expected output**: No errors, `node_modules/` directory created

### Step 6: Build the Project

```bash
npm run build
```

**What this does**:
- Compiles TypeScript (`src/**/*.ts`) to JavaScript (`dist/**/*.js`)
- Performs type checking (strict mode)
- Generates type declaration files (`.d.ts`)

**Expected output**: 
```
✔ Successfully compiled
No errors found
```

### Step 7: Verify Installation

```bash
npm test
```

**Expected output** (Week 1):
```
No tests found, exiting with code 0
```

This is correct! Week 1 focuses on setup; automated tests come in Week 2+.

## Testing Your Setup

Run the example scripts to verify everything works:

### Example 1: Basic Agent

```bash
npx tsx examples/01-basic-agent.ts
```

**Expected**: The agent responds to "What is AWS Lambda?" with a detailed explanation.

### Example 2: Bedrock Configuration

```bash
npx tsx examples/02-bedrock-config.ts
```

**Expected**: Custom Bedrock model configuration, response about scalable web applications.

### Example 3: Agent with Tools

```bash
npx tsx examples/03-agent-with-tools.ts
```

**Expected**: Agent uses calculator tool to compute 42 × 137 = 5,754.

### Example 4: State Management

```bash
npx tsx examples/04-agent-state.ts
```

**Expected**: Final count reaches 3 after three increments.

### Example 5: Streaming Responses

```bash
npx tsx examples/05-streaming.ts
```

**Expected**: Text streams to stdout progressively (like ChatGPT).

### Example 6: MCP Integration

```bash
npx tsx examples/06-mcp-integration.ts
```

**Expected**: Queries AWS documentation about high availability and Well-Architected Framework.

**Note**: This example takes 5-10 seconds to start the MCP server.

### Example 7: MCP Scenarios

```bash
npx tsx examples/07-mcp-scenarios.ts
```

**Expected**: Multiple AWS queries answered with documentation-backed responses.

## Troubleshooting

### "Module not found" errors

**Problem**: TypeScript can't find imported modules

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### AWS "Access Denied" errors

**Problem**: Bedrock model access not enabled or invalid credentials

**Solutions**:

1. Check model access in [AWS Console → Bedrock → Model Access](https://console.aws.amazon.com/bedrock/home#/modelaccess)
2. Verify credentials:
   ```bash
   aws sts get-caller-identity
   ```
3. Ensure correct region:
   ```bash
   aws configure get region  # Should be us-east-1
   ```

### MCP Server connection timeout

**Problem**: `examples/06-mcp-integration.ts` hangs or times out

**Solutions**:

1. Verify Python is installed:
   ```bash
   python3 --version
   ```

2. Test MCP server directly:
   ```bash
   uvx awslabs.aws-documentation-mcp-server@latest
   ```

3. Increase connection wait time in code (edit `src/tools/mcpClient.ts`):
   ```typescript
   // Change from 2000 to 5000
   await new Promise(resolve => setTimeout(resolve, 5000))
   ```

### TypeScript compilation errors

**Problem**: `npm run build` shows type errors

**Solution**:

1. Ensure strict mode is enabled (check `tsconfig.json`):
   ```json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```

2. Fix type errors one at a time:
   - Replace `any` types with specific types
   - Add type annotations where needed
   - Use Zod schemas for runtime validation

### Node.js version mismatch

**Problem**: "Unsupported engine" warning during npm install

**Solution**:
```bash
# Check current version
node --version

# Install Node.js 20+ if needed
brew install node@20  # macOS
# Or use nvm: nvm install 20 && nvm use 20
```

## Project Structure Overview

```
aws-architecture-copilot/
├── src/                    # Production code (Week 2+)
│   ├── agent/             # Agent logic
│   └── tools/             # MCP client, generators
├── examples/              # Learning scripts (Week 1)
│   ├── 01-basic-agent.ts
│   ├── 02-bedrock-config.ts
│   ├── 03-agent-with-tools.ts
│   ├── 04-agent-state.ts
│   ├── 05-streaming.ts
│   ├── 06-mcp-integration.ts
│   └── 07-mcp-scenarios.ts
├── tests/                 # Test suites (Week 2+)
├── deployment/            # CDK deployment (Week 4)
├── docs/                  # Documentation
├── specs/                 # Feature specifications
│   └── 001-week1-setup/   # This week's spec
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── .gitignore            # Git exclusions
├── .env.example          # Environment template
└── README.md             # Project overview
```

## Next Steps

After completing Week 1 setup:

1. **Week 2**: Build the core agent with Strands
2. **Week 3**: Implement CDK and Mermaid generator tools
3. **Week 4**: Test, deploy, and launch

For detailed tasks, see:
- [Master Plan](../../master-plan.md)
- [Week 1 Specification](./spec.md)
- [Implementation Plan](./plan.md)

## Getting Help

- **Strands Documentation**: https://strandsagents.com/
- **AWS Bedrock Docs**: https://aws.amazon.com/bedrock/
- **MCP Protocol**: https://modelcontextprotocol.io/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

## Verification Checklist

Before proceeding to Week 2, verify:

- [ ] `npm install` completes without errors
- [ ] `npm run build` compiles successfully (zero errors)
- [ ] `npm test` runs (0 tests is OK)
- [ ] All 7 example scripts execute without errors
- [ ] AWS Bedrock responds to queries
- [ ] MCP server connects and returns documentation
- [ ] TypeScript strict mode enabled (`strict: true` in tsconfig.json)
- [ ] `.env` excluded from git (in `.gitignore`)
- [ ] AWS credentials configured (via CLI or `.env`)

**Status**: ✅ All items complete → Ready for Week 2

---

**Setup Time**: ~10-15 minutes (assuming prerequisites installed)  
**Support**: Open an issue on GitHub if you encounter problems not covered here