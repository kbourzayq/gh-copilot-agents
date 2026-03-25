# Copilot Instructions

## Project Overview

An interactive HTML demo page explaining **Agents**, **Skills**, **Prompts**, **Plan Mode**, and **MCP**. The project uses a clean separation of concerns with external CSS and JavaScript files — no package manager, no bundler, no build step. Open `index.html` directly in a browser.

The companion `Github-copilot-agent-mode.pptx` is source material/reference only; do not modify it.

## Architecture

The project consists of three main files:

1. **`index.html`** (~1,170 lines) — HTML structure with CDN links for fonts and highlight.js, plus links to external styles and scripts
2. **`styles.css`** (~635 lines) — All CSS with design tokens and responsive styles
3. **`script.js`** (~347 lines) — All JavaScript for tab switching, demos, and interactivity

### index.html Structure

1. **`<head>`** — CDN links: Google Fonts (Inter, JetBrains Mono), highlight.js 11.9.0 (atom-one-dark theme + yaml/markdown language packs), link to `styles.css`
2. **`<body>`** — Pure HTML content organized as:
   - `<header class="hero">` — Animated gradient hero with jump-to pills
   - `<nav class="tab-nav-wrap">` — Sticky tab bar (Agents / Skills / Prompts / Plan / MCP)
   - `<main class="main">` — Five `<section class="section">` blocks, one per tab
   - `<footer>`
   - `<script src="script.js"></script>` — External JavaScript reference

## CSS Design System

All design tokens are CSS custom properties on `:root`. **Never hardcode colours** — always use a variable.

| Variable | Value | Use |
|---|---|---|
| `--bg` | `#0d0f17` | Page background |
| `--bg-card` | `#141824` | Card background |
| `--bg-card2` | `#1a1f30` | Nested/inset surfaces |
| `--border` | `#252a3d` | All borders |
| `--text` | `#e2e8f0` | Body text |
| `--muted` | `#7c8aad` | Secondary text |
| `--accent-a` | `#4f8ef7` | Agents — blue |
| `--accent-s` | `#3ecf8e` | Skills — green |
| `--accent-p` | `#a78bfa` | Prompts — purple |
| `--accent-*-dim` | `rgba(…, .12)` | Tinted backgrounds for the accent |
| `--radius` | `14px` | Default border-radius |
| `--font` | Inter | Body font |
| `--mono` | JetBrains Mono | Code font |

## Section Colour Convention

Every element scoped to a section uses a single-letter suffix to pick the right accent:

- `.a` → Agents (blue, `--accent-a`)
- `.s` → Skills (green, `--accent-s`)
- `.p` → Prompts (purple, `--accent-p`)

This suffix appears on `.sec-icon`, `.tag`, `.tab-btn.active-*`, `.step-num`, `.feat-card`, `.demo-btn`, etc. **Always apply the correct suffix** when adding new section-scoped elements.

## Repeating Section Structure

Each of the three sections follows this identical pattern — maintain it when editing or adding sections:

```
sec-header  (icon + h2 + subtitle)
card        (What is it?)
feat-grid   (6 × feat-card)
sec-divider ("How to use")
card        (numbered .steps stepper)
sec-divider ("Sample Spec")
code-wrap   (syntax-highlighted block + copy button)
sec-divider ("Interactive Demo")
demo-box    (input + demo-btn + demo-output)
sec-divider ("Rendered Markdown Preview")
md-preview  (styled markdown rendering)
```

## JavaScript Patterns

**Tab switching** — `switchTab(tabName)` removes `.active` from all sections, adds it to the target, and updates `tab-btn` class to `active-{a|s|p}`. Called from both the hero pills and the tab buttons.

**Animated output** — All three demo widgets use the same pattern: build an array of HTML `lines[]`, then write them one-by-one with `setTimeout` recursion (`writeLine()`). Disable the trigger button during playback; re-enable when done. Use `<span class="line-*">` for colour coding:

| Class | Colour |
|---|---|
| `.line-prefix` | green — section headers in trace |
| `.line-key` | blue — JSON/YAML keys |
| `.line-val` | amber — values |
| `.line-info` | muted — informational lines |
| `.line-ok` | green — success lines |
| `.line-err` | red — error lines |

**Copy button** — `copyCode(btn, elementId)` reads `innerText` from the `<code>` element with the given id, writes to clipboard, then briefly shows "✅ Copied!" before resetting.

**Prompt builder** — `buildPrompt()` reads four `<textarea>` inputs, interpolates them into a template string, then renders the result character-by-character via `typeChar()`.

## CDN Versions (pinned)

| Library | Version | URL pattern |
|---|---|---|
| highlight.js | 11.9.0 | `cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/…` |
| Google Fonts | Inter + JetBrains Mono | `fonts.googleapis.com` |

Do not upgrade highlight.js without testing all three code blocks (YAML, Markdown). The atom-one-dark stylesheet must match the JS version.
