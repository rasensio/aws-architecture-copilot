---
description: "Week 1 Setup & Foundation - Implementation tasks organized by user story"
---

# Tasks: Week 1 - Project Setup & Foundation

**Feature Branch**: `001-week1-setup`  
**Input**: Design documents from `/specs/001-week1-setup/`  
**Prerequisites**: plan.md, spec.md, quickstart.md

**Tests**: No test tasks included - Week 1 focuses on environment setup and validation through example scripts.

**Organization**: Tasks are grouped by user story to enable independent verification and incremental progress.

## Format: `- [ ] [ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5)
- File paths included in descriptions

## Path Conventions

- Single TypeScript project structure
- `src/agent/`, `src/tools/` for application code
- `examples/` for Strands learning scripts
- `tests/` for Jest tests (Week 2+)
- `deployment/` for AWS CDK infrastructure

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create basic repository structure and configuration files

- [X] T001 Initialize Git repository with .gitignore excluding node_modules/, dist/, .env, *.log, cdk.out/, .DS_Store
- [X] T002 [P] Create directory structure: src/agent/, src/tools/, tests/, deployment/lib/, deployment/bin/, examples/
- [X] T003 [P] Create README.md with project description, features (Claude Sonnet 4, MCP, CDK), and tech stack
- [X] T004 [P] Create .env.example documenting AWS_REGION, AWS_BEDROCK_MODEL_ID, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core dependencies and build tooling that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Initialize package.json with type=module, Node.js 20+ requirement, and scripts (dev, build, test, start)
- [X] T006 [P] Install TypeScript dependencies: typescript, @types/node, tsx, @tsconfig/node20
- [X] T007 [P] Create tsconfig.json with strict=true, target=ES2022, module=ESNext, moduleResolution=bundler, outDir=dist, rootDir=src
- [X] T008 [P] Install Jest testing framework: jest, @types/jest, ts-jest and create jest.config.js
- [X] T009 [P] Install Strands SDK: @strands-agents/sdk, zod
- [X] T010 [P] Install AWS SDK: @aws-sdk/client-bedrock-runtime, aws-cdk-lib, constructs
- [X] T011 Verify TypeScript compilation succeeds with npm run build (should create dist/ directory)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Developer Initializes Project (Priority: P1) 🎯 MVP

**Goal**: Establish working TypeScript build pipeline with all dependencies installed and verified

**Independent Test**: Run `npm install`, `npm run build`, and `npm test` successfully without errors

### Implementation for User Story 1

- [ ] T012 [US1] Verify all dependencies installed successfully with npm list --depth=0 (no missing packages)
- [ ] T013 [US1] Verify TypeScript strict mode compilation completes with 0 errors via npm run build
- [ ] T014 [US1] Verify Jest test runner executes successfully via npm test (0 tests expected)
- [ ] T015 [US1] Create src/index.ts with placeholder comment "// AWS Architecture Copilot - Main entry point"
- [ ] T016 [US1] Verify dist/index.js generated after build with proper ESNext module format
- [ ] T017 [US1] Document project structure in README.md with directory tree and purpose of each folder

**Checkpoint**: At this point, User Story 1 is complete - project structure exists and builds successfully

---

## Phase 4: User Story 5 - Developer Verifies AWS Bedrock Access (Priority: P1) 🎯 MVP

**Goal**: Confirm AWS credentials configured and Bedrock model access enabled

**Independent Test**: Run `aws bedrock list-foundation-models` and execute BedrockModel test script successfully

**Note**: Running this phase after US1 since it depends on working Node.js environment but NOT on Strands examples

### Implementation for User Story 5

- [ ] T018 [US5] Verify AWS CLI installed and configured with aws sts get-caller-identity (shows account ID)
- [ ] T019 [US5] Verify AWS region set to us-east-1 with aws configure get region
- [ ] T020 [US5] Verify Bedrock model access enabled by running aws bedrock list-foundation-models --region us-east-1 | grep claude-sonnet-4
- [ ] T021 [P] [US5] Create examples/bedrock-test.ts with BedrockModel invoking Claude Sonnet 4 with test query "What is AWS Lambda?"
- [ ] T022 [US5] Run npx tsx examples/bedrock-test.ts and verify successful response without authentication errors
- [ ] T023 [US5] Update .env.example with confirmed working values for AWS_REGION and AWS_BEDROCK_MODEL_ID
- [ ] T024 [US5] Document AWS setup steps in README.md including Bedrock console link for model access

**Checkpoint**: At this point, User Stories 1 AND 5 are complete - AWS Bedrock integration verified

---

## Phase 5: User Story 2 - Developer Learns Strands Framework (Priority: P2)

**Goal**: Create working example scripts demonstrating core Strands concepts for learning and reference

**Independent Test**: Run each example script (`npx tsx examples/01-basic-agent.ts` through `examples/05-streaming.ts`) and verify expected outputs

### Implementation for User Story 2

- [ ] T025 [P] [US2] Create examples/01-basic-agent.ts with basic Agent and systemPrompt querying "What is AWS Lambda?"
- [ ] T026 [P] [US2] Create examples/02-bedrock-config.ts with custom BedrockModel configuration (region, modelId, temperature=0.3, maxTokens=4096)
- [ ] T027 [P] [US2] Create examples/03-agent-with-tools.ts with calculator tool using Zod schema (add, subtract, multiply, divide operations)
- [ ] T028 [P] [US2] Create examples/04-agent-state.ts with counter tool demonstrating agent state management (increment counter 3 times)
- [ ] T029 [P] [US2] Create examples/05-streaming.ts with agent.stream() demonstrating progressive text output
- [ ] T030 [US2] Run all 5 example scripts and verify outputs: 01 (Lambda explanation), 02 (scalable web app), 03 (42×137=5754), 04 (counter=3), 05 (streaming story)
- [ ] T031 [US2] Document example scripts in README.md with descriptions and expected outputs

**Checkpoint**: At this point, User Stories 1, 2, AND 5 are complete - Strands learning examples working

---

## Phase 6: User Story 3 - Developer Configures AWS MCP Integration (Priority: P2)

**Goal**: Integrate AWS Documentation MCP server and verify agent can query AWS best practices

**Independent Test**: Run MCP integration examples and verify agent retrieves relevant AWS documentation

### Implementation for User Story 3

- [ ] T032 [US3] Verify Python and uvx installed with python3 --version and uvx --version
- [ ] T033 [US3] Test AWS MCP server directly with uvx awslabs.aws-documentation-mcp-server@latest (Ctrl+C to exit)
- [ ] T034 [P] [US3] Create src/tools/mcpClient.ts with createAwsDocsMCP() helper using StdioClientTransport and 2-second connection wait
- [ ] T035 [P] [US3] Create examples/06-mcp-integration.ts with Agent using McpClient querying "AWS best practices for high availability" and "Well-Architected Framework pillars"
- [ ] T036 [P] [US3] Create examples/07-mcp-scenarios.ts testing multiple AWS queries: scalable web app, ElastiCache, RDS Multi-AZ, Lambda best practices
- [ ] T037 [US3] Run npx tsx examples/06-mcp-integration.ts and verify AWS documentation-backed responses within 10 seconds
- [ ] T038 [US3] Run npx tsx examples/07-mcp-scenarios.ts and verify all 4 queries return relevant AWS content
- [ ] T039 [US3] Document MCP setup and troubleshooting in README.md including uvx installation and connection timeout solutions

**Checkpoint**: At this point, User Stories 1, 2, 3, AND 5 are complete - MCP integration working

---

## Phase 7: User Story 4 - Developer Documents Technical Architecture (Priority: P3)

**Goal**: Create comprehensive technical documentation explaining system design and architectural decisions

**Independent Test**: Review PROJECT_PLAN.md and verify all 8 required sections present with concrete details (no placeholders)

### Implementation for User Story 4

- [ ] T040 [P] [US4] Create PROJECT_PLAN.md Section 1: Project Overview with problem statement, solution description, and target users
- [ ] T041 [P] [US4] Create PROJECT_PLAN.md Section 2: Technical Architecture with system architecture diagram (user input → agent → MCP/tools → outputs)
- [ ] T042 [P] [US4] Create PROJECT_PLAN.md Section 3: Agent Workflow documenting 5-step process (understand → retrieve → design → generate → return)
- [ ] T043 [P] [US4] Create PROJECT_PLAN.md Section 4: Tech Stack Decisions explaining Strands>LangGraph, MCP>custom RAG, TypeScript>Python rationale
- [ ] T044 [P] [US4] Create PROJECT_PLAN.md Section 5: Agent State Design with TypeScript interface for ArchitectureState
- [ ] T045 [P] [US4] Create PROJECT_PLAN.md Section 6: Tool Specifications defining generate_cdk_code and generate_mermaid_diagram tools
- [ ] T046 [P] [US4] Create PROJECT_PLAN.md Section 7: Success Metrics with functional and non-functional requirements
- [ ] T047 [P] [US4] Create PROJECT_PLAN.md Section 8: Milestones mapping Week 1-4 tasks
- [ ] T048 [US4] Review PROJECT_PLAN.md and verify all sections complete with zero "TODO" or "[Fill in]" placeholders
- [ ] T049 [US4] Create docs/architecture.png visual diagram using Excalidraw or Draw.io showing agent workflow

**Checkpoint**: All user stories complete - full Week 1 setup validated and documented

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and documentation improvements

- [ ] T050 [P] Update README.md with complete Quick Start section referencing quickstart.md
- [ ] T051 [P] Add troubleshooting section to README.md covering common errors (module not found, AWS access denied, MCP timeout)
- [ ] T052 Run complete validation sequence from quickstart.md: git clone → npm install → build → test → all examples
- [ ] T053 [P] Create .github/agents/copilot-instructions.md documenting TypeScript + Strands + MCP stack for GitHub Copilot
- [ ] T054 Commit all changes to 001-week1-setup branch with detailed commit message
- [ ] T055 Push branch to GitHub and verify CI/CD passes (if configured)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational - Can start once Phase 2 complete
- **User Story 5 (Phase 4)**: Depends on US1 - Needs Node.js environment working
- **User Story 2 (Phase 5)**: Depends on Foundational + US1 - Needs build pipeline working
- **User Story 3 (Phase 6)**: Depends on Foundational + US1 - Needs TypeScript compilation
- **User Story 4 (Phase 7)**: No blocking dependencies - Can proceed in parallel with other stories
- **Polish (Phase 8)**: Depends on all user stories completing

### User Story Dependencies

- **User Story 1 (P1)**: BLOCKS US2, US3, US5 - Must establish working build pipeline first
- **User Story 5 (P1)**: BLOCKS US2, US3 - AWS access required for Strands examples with Bedrock
- **User Story 2 (P2)**: Independent once US1/US5 complete - Strands examples don't depend on MCP
- **User Story 3 (P2)**: Independent once US1/US5 complete - MCP examples don't depend on Strands basics
- **User Story 4 (P3)**: Fully independent - Documentation doesn't depend on code working

### Recommended Execution Order

**Sequential (single developer)**:
1. Phase 1: Setup (T001-T004) → 15 minutes
2. Phase 2: Foundational (T005-T011) → 30 minutes
3. Phase 3: User Story 1 (T012-T017) → 20 minutes
4. Phase 4: User Story 5 (T018-T024) → 30 minutes
5. Phase 5: User Story 2 (T025-T031) → 2 hours
6. Phase 6: User Story 3 (T032-T039) → 1 hour
7. Phase 7: User Story 4 (T040-T049) → 2 hours
8. Phase 8: Polish (T050-T055) → 30 minutes

**Total Time**: ~7 hours

**Parallel (multiple developers)**:
1. Complete Phase 1 + Phase 2 together → 45 minutes
2. Complete Phase 3 + Phase 4 together → 30 minutes (US1 and US5)
3. Split remaining work:
   - **Developer A**: User Story 2 (Strands examples) → 2 hours
   - **Developer B**: User Story 3 (MCP integration) → 1 hour
   - **Developer C**: User Story 4 (Documentation) → 2 hours
4. All developers: Phase 8 (Polish) → 30 minutes

**Total Time (parallel)**: ~3.5 hours

### Within Each User Story

- **US1**: Sequential verification tasks (build → test → structure)
- **US2**: All example scripts [P] parallelizable (T025-T029), then validate (T030-T031)
- **US3**: MCP client + examples [P] parallelizable (T034-T036), then validate (T037-T039)
- **US4**: All documentation sections [P] parallelizable (T040-T047), then review (T048-T049)
- **US5**: Sequential AWS verification tasks (CLI → access → test → document)

### Parallel Opportunities

#### Phase 1 (Setup) - 3 parallel tasks
```bash
T002: Create directory structure
T003: Create README.md
T004: Create .env.example
```

#### Phase 2 (Foundational) - 5 parallel tasks
```bash
T006: Install TypeScript dependencies
T007: Create tsconfig.json
T008: Install Jest
T009: Install Strands SDK
T010: Install AWS SDK
```

#### Phase 5 (User Story 2) - 5 parallel tasks
```bash
T025: Create examples/01-basic-agent.ts
T026: Create examples/02-bedrock-config.ts
T027: Create examples/03-agent-with-tools.ts
T028: Create examples/04-agent-state.ts
T029: Create examples/05-streaming.ts
```

#### Phase 6 (User Story 3) - 3 parallel tasks
```bash
T034: Create src/tools/mcpClient.ts
T035: Create examples/06-mcp-integration.ts
T036: Create examples/07-mcp-scenarios.ts
```

#### Phase 7 (User Story 4) - 8 parallel tasks
```bash
T040: PROJECT_PLAN.md Section 1
T041: PROJECT_PLAN.md Section 2
T042: PROJECT_PLAN.md Section 3
T043: PROJECT_PLAN.md Section 4
T044: PROJECT_PLAN.md Section 5
T045: PROJECT_PLAN.md Section 6
T046: PROJECT_PLAN.md Section 7
T047: PROJECT_PLAN.md Section 8
```

#### Phase 8 (Polish) - 2 parallel tasks
```bash
T050: Update README.md Quick Start
T051: Add troubleshooting to README.md
T053: Create copilot-instructions.md
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 5 Only - Critical Path)

This gets you a working TypeScript project with AWS Bedrock access verified:

1. **Phase 1**: Setup (T001-T004) → Initialize repository
2. **Phase 2**: Foundational (T005-T011) → Install dependencies
3. **Phase 3**: User Story 1 (T012-T017) → Verify build pipeline
4. **Phase 4**: User Story 5 (T018-T024) → Verify AWS access
5. **STOP and VALIDATE**: Can build project and invoke Bedrock

**MVP Deliverable**: Working TypeScript project with AWS Bedrock integration

**Time**: ~2 hours

### Incremental Delivery (Add Learning Resources)

Once MVP is stable, add framework learning resources:

1. Complete MVP (US1 + US5)
2. **Phase 5**: User Story 2 (T025-T031) → Add Strands examples
3. **VALIDATE**: Can run all Strands learning examples
4. **Phase 6**: User Story 3 (T032-T039) → Add MCP integration
5. **VALIDATE**: Can query AWS documentation via MCP

**Deliverable**: MVP + Developer learning resources

**Time**: ~5 hours total

### Full Week 1 Completion

Add documentation and polish:

1. Complete Incremental Delivery (US1 + US5 + US2 + US3)
2. **Phase 7**: User Story 4 (T040-T049) → Complete architecture documentation
3. **Phase 8**: Polish (T050-T055) → Final validation and commit

**Deliverable**: Complete Week 1 setup ready for Week 2 agent development

**Time**: ~7 hours total

### Parallel Team Strategy

With 3 developers (after Foundational phase complete):

1. **All together**: Phase 1 + Phase 2 (45 min)
2. **All together**: Phase 3 + Phase 4 (30 min) - Validate core setup
3. **Split work**:
   - **Developer A**: Phase 5 (US2 - Strands examples) → 2 hours
   - **Developer B**: Phase 6 (US3 - MCP integration) → 1 hour
   - **Developer C**: Phase 7 (US4 - Documentation) → 2 hours
4. **All together**: Phase 8 (Polish) → 30 minutes

**Total Time**: ~3.5 hours (vs 7 hours sequential)

---

## Validation Checkpoints

### After Phase 2 (Foundational)
```bash
# Should all succeed:
npm install
npm run build
npm test  # 0 tests expected
ls -la dist/  # dist/ directory should exist
```

### After Phase 3 (User Story 1)
```bash
# Verify project structure:
ls -la src/agent/ src/tools/ tests/ deployment/ examples/

# Verify build:
npm run build && ls -la dist/index.js

# Verify package.json scripts:
npm run dev  # Should fail (no code yet) but script should exist
```

### After Phase 4 (User Story 5)
```bash
# Verify AWS access:
aws sts get-caller-identity
aws bedrock list-foundation-models --region us-east-1 | grep claude

# Verify Bedrock test:
npx tsx examples/bedrock-test.ts  # Should get Lambda explanation
```

### After Phase 5 (User Story 2)
```bash
# Run all Strands examples:
npx tsx examples/01-basic-agent.ts       # Lambda explanation
npx tsx examples/02-bedrock-config.ts    # Scalable web app architecture
npx tsx examples/03-agent-with-tools.ts  # Calculator: 42 × 137 = 5754
npx tsx examples/04-agent-state.ts       # Counter: 3
npx tsx examples/05-streaming.ts         # Streaming story output
```

### After Phase 6 (User Story 3)
```bash
# Test MCP server:
uvx awslabs.aws-documentation-mcp-server@latest  # Ctrl+C to exit

# Run MCP examples:
npx tsx examples/06-mcp-integration.ts   # High availability + Well-Architected
npx tsx examples/07-mcp-scenarios.ts     # 4 AWS queries with docs
```

### After Phase 7 (User Story 4)
```bash
# Verify documentation:
ls -la PROJECT_PLAN.md docs/architecture.png
grep -c "TODO" PROJECT_PLAN.md  # Should be 0

# Check sections:
grep "## 1. Project Overview" PROJECT_PLAN.md
grep "## 8. Milestones" PROJECT_PLAN.md
```

### Final Validation (After Phase 8)
```bash
# Complete quickstart validation:
git clone https://github.com/rasensio/aws-architecture-copilot.git
cd aws-architecture-copilot
git checkout 001-week1-setup
npm install
npm run build
npm test

# Run all examples:
for file in examples/*.ts; do
  echo "Testing $file..."
  npx tsx "$file"
done
```

---

## Notes

- **[P] tasks** can run in parallel (different files, no dependencies)
- **[US1-US5] labels** map tasks to user stories for traceability
- Each user story can be independently validated at its checkpoint
- **Priority order**: P1 (US1, US5) → P2 (US2, US3) → P3 (US4)
- **Tests**: Not included in Week 1 - focus is on setup and validation via example scripts
- **Commit strategy**: Commit after each phase or user story completion
- **Stop early**: Can stop after MVP (US1 + US5) if time-constrained
- **Week 2 readiness**: All user stories must complete before starting Week 2 agent development

---

## Summary

- **Total Tasks**: 55 (T001-T055)
- **User Stories**: 5 (US1, US2, US3, US4, US5)
- **Critical Path**: P1 stories (US1, US5) → 2 hours
- **Full Completion**: All stories → 7 hours sequential, 3.5 hours parallel
- **MVP Scope**: US1 + US5 (build pipeline + AWS access)
- **Parallel Opportunities**: 21 tasks marked [P] across all phases
- **Independent Testing**: Each user story has clear validation checkpoint
- **Dependencies**: US1 blocks US2/US3, but US4 can proceed in parallel
