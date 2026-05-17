# Agent Persona Prompt

```
# Babylon Toolkit Agent Persona

You are an expert web game developer using BabylonJS and the Babylon Toolkit. Always, always, always use the following `Babylon Toolkit Agent Reference` at https://github.com/BabylonJS/BabylonToolkit/tree/master/Agent/reference.md for instructions, documentation and training examples.

---
```

# Agent Configuration Files

Simply insert the `Agent Persona Prompt` at the top of your platform configuration file:

| Platform / Tool | Instruction File(s) | Status | How to use with this persona |
|---|---|---|---|
| GitHub Copilot (VS Code, JetBrains, etc.) | `.github/copilot-instructions.md` | Official | Keep your full canonical persona here (already done). |
| Claude Code (Anthropic) | `CLAUDE.md` | Common/expected | Add the same persona text; optionally add repo-specific coding constraints. |
| OpenAI Codex CLI / compatible coding agents | `AGENTS.md` | Common | Place the same persona text plus local workflow rules. |
| Cursor | `.cursor/rules/*.mdc` (modern), `.cursorrules` (legacy) | Official + legacy | Create a rule file that contains the same core persona and references Babylon Toolkit docs. |
| Windsurf (Codeium) | `AGENTS.md` and/or tool-specific rules files (team-dependent) | Common | Keep a mirrored persona in `AGENTS.md`; add tool-specific overrides only if needed. |
| Cline (VS Code extension) | Project memory/rules files (team setup), often `AGENTS.md` fallback | Common | Store canonical persona in `AGENTS.md` and point Cline project rules to it. |
| Roo Code | Project-level instructions/rules (team setup), often `AGENTS.md` fallback | Common | Mirror persona in `AGENTS.md`; keep Roo-specific files minimal. |
| Continue.dev | `.continue/prompts/`, `.continue/config.*` | Official | Add a reusable system prompt block with the same persona text. |
| Aider | `.aider.conf.yml` and repo docs (for conventions) | Official config + common docs | Put instruction references in config and keep canonical prose in `AGENTS.md`. |
| Sourcegraph Cody | Repository instruction/context features (org/repo settings) | Official (UI/config driven) | Paste this persona into repo-level Cody instructions/context. |
| JetBrains AI Assistant | IDE AI rules/settings + project docs | Official (UI/settings driven) | Use IDE instruction settings; keep project copy in `AGENTS.md`. |
| Replit Agent | Replit project instructions/config + repo docs | Official (platform-config driven) | Add persona in Replit project instructions; mirror in `AGENTS.md`. |
| Amazon Q Developer | Workspace context/rules + project docs | Official (UI/settings driven) | Keep explicit project guidance in `AGENTS.md` and import where possible. |
| Azure AI Foundry / custom agent runtimes | System prompt files in app code/config | Official (app-defined) | Reuse same persona string in code/config and link Babylon Toolkit references. |
| Generic MCP or custom coding agents | `AGENTS.md`, `SYSTEM.md`, or app-defined prompt files | Community/common | Keep one canonical prompt and map it into each runtime's system prompt field. |

## Visual Studio Code Extension

https://marketplace.visualstudio.com/items?itemName=MackeyKinard.codewrx-babylon-agent
