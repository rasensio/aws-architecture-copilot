<!--
SYNC IMPACT REPORT

Version: 1.0.0 (Initial Constitution)
Date: 2026-01-31

PRINCIPLES ESTABLISHED:
- TypeScript-First Development
- Simplicity Over Complexity (KISS)
- AWS-Native Solutions
- Security & Cost-Optimization First
- YAGNI (You Aren't Gonna Need It)

TEMPLATES STATUS:
✅ .specify/templates/plan-template.md - No updates needed (new constitution)
✅ .specify/templates/spec-template.md - No updates needed (new constitution)
✅ .specify/templates/tasks-template.md - No updates needed (new constitution)
✅ .specify/templates/commands/*.md - No updates needed (new constitution)

FOLLOW-UP:
- None (initial version)

NOTES:
- Constitution kept minimal following KISS principle
- Five core principles aligned with master-plan.md technical decisions
- No deferred placeholders
-->

# AWS Architecture Copilot Constitution

## Core Principles

### I. TypeScript-First Development

**Rule:** All code MUST be written in TypeScript with strict type checking enabled.

**Rationale:**
- Type safety catches errors at compile time, not runtime
- Better IDE support and developer experience
- Industry standard for AWS CDK
- Self-documenting code through type annotations

**Requirements:**
- `strict: true` in tsconfig.json (NON-NEGOTIABLE)
- No `any` types without explicit justification
- Zod schemas for runtime validation (tool inputs, API boundaries)
- Generated CDK code MUST be TypeScript

### II. Simplicity Over Complexity (KISS)

**Rule:** Choose the simpler solution unless complexity is explicitly justified.

**Rationale:**
- Maintainable code is more valuable than clever code
- Strands chosen over LangGraph for simplicity
- MCP chosen over custom RAG for less code
- Faster to build, easier to debug, simpler to extend

**Requirements:**
- YAGNI: Build only what's needed now, not what might be needed later
- No premature optimization
- Code reviews MUST challenge unnecessary complexity
- Document why the simple approach won't work before adding complexity

### III. AWS-Native Solutions

**Rule:** Prefer AWS-managed services and native integrations over third-party alternatives.

**Rationale:**
- AWS Bedrock eliminates external API key management
- Reduced operational overhead (no self-hosted infrastructure)
- Better integration and security model
- Lower total cost of ownership

**Requirements:**
- Use AWS Bedrock for LLM (not external APIs)
- Use AWS managed services (RDS, ElastiCache, ECS) in generated architectures
- Prefer AWS SDK v3 for all AWS interactions
- AWS CLI configured and working before development

### IV. Security & Cost-Optimization First

**Rule:** Every architectural decision MUST consider security and cost impact.

**Rationale:**
- Security breaches are expensive and reputation-damaging
- Cost overruns kill projects and trust
- AWS Well-Architected Framework prioritizes both

**Requirements:**
- Generated architectures MUST include security services (WAF, encryption at rest/transit)
- Default to managed services (lower cost, better security)
- Multi-AZ for production databases (high availability)
- Document cost implications in generated CDK code comments
- Never expose credentials in code or logs

### V. Production-Ready From Day One

**Rule:** All code and generated artifacts MUST be production-quality from the first commit.

**Rationale:**
- No "prototype" mindset that creates technical debt
- Builds trust with users and stakeholders
- Easier to maintain and extend
- Demonstrates professional competence

**Requirements:**
- Comprehensive error handling (no silent failures)
- Logging throughout (agent steps, tool invocations, errors)
- Input validation before processing
- Generated CDK code MUST compile without errors
- Generated Mermaid diagrams MUST render correctly

## Technology Constraints

**Mandatory Stack:**
- Language: TypeScript (100%)
- Runtime: Node.js 20+
- Agent Framework: Strands Agents SDK
- LLM: AWS Bedrock (Claude Sonnet 4)
- Documentation/RAG: AWS Documentation MCP Server
- IaC: AWS CDK (TypeScript output only)
- Testing: Jest with TypeScript

**Forbidden:**
- Python for agent code (acceptable for MCP server utilities)
- LangGraph or similar complex frameworks
- Custom RAG/vector stores (use MCP)
- JavaScript without TypeScript
- Any framework requiring external API keys for core functionality

## Governance

**Amendment Process:**
1. Propose change with justification in GitHub issue
2. Document impact on existing code/templates
3. Team/stakeholder approval required
4. Update constitution version (semantic versioning)
5. Propagate changes to all templates and docs

**Compliance:**
- Code reviews MUST verify adherence to principles
- Failed principle compliance = rejected PR
- Exceptions require explicit justification and approval
- Constitution supersedes convenience

**Versioning:**
- MAJOR: Principle removed or fundamentally changed
- MINOR: New principle added or significant expansion
- PATCH: Clarifications, typos, non-semantic changes

---

**Version**: 1.0.0 | **Ratified**: 2026-01-31 | **Last Amended**: 2026-01-31
