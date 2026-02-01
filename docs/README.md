# AWS Architecture Copilot - System Architecture

This directory contains architecture diagrams and visual documentation for the AWS Architecture Copilot project.

## architecture.mmd - System Architecture Diagram

The main system architecture diagram showing the complete data flow from user input to generated outputs.

**How to view**:
1. **VS Code**: Install "Markdown Preview Mermaid Support" extension
2. **GitHub**: Renders automatically in markdown files
3. **Online**: Copy content to https://mermaid.live/

**Components**:
- User Input Layer
- Strands Agent Core
- External Services (MCP, AWS Bedrock)
- Agent Tools (CDK Generator, Diagram Generator)
- Output Layer

## Usage

Include in documentation:
```markdown
![System Architecture](docs/architecture.mmd)
```

Or render inline:
````markdown
```mermaid
[paste architecture.mmd content]
```
````
