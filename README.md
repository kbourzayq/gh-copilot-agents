# Agents · Skills · Prompts · Plan Mode · MCP

An interactive, zero-build HTML demo exploring **Agents**, **Skills**, **Prompts**, **Plan Mode**, and the **Model Context Protocol (MCP)** — core concepts for building AI-powered workflows.

🌐 **No build step, no dependencies, no package manager.** Just open `index.html` in a browser.

---

## Overview

This project is a **single-file, self-contained interactive demo** that teaches:

| Concept | What It Is | When to Use |
|---------|-----------|-----------|
| **Agents** 🤖 | Autonomous AI systems that reason, plan, and act to complete complex goals | Complex, multi-step tasks requiring tool use and iteration |
| **Skills** ⚡ | Packaged, reusable capabilities that agents and users can invoke on demand | Encapsulating complex logic into discoverable, composable units |
| **Prompts** ✍️ | Natural-language instructions that shape how AI models think and respond | Every interaction with AI — from system-level guidance to per-turn requests |
| **Plan Mode** 📋 | Strategic task decomposition where agents create a plan before taking action | Large refactors, multi-phase workflows, high-risk operations |
| **MCP** 🔌 | Open standard protocol connecting AI to any external tool, database, or API | Universal AI integrations without vendor lock-in or custom glue code |

---

## Quick Start

### Option 1: Open Directly
```bash
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

Or drag `index.html` into your browser window.

### Option 2: Use a Local Server (Optional)
If you prefer serving via HTTP:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using Ruby
ruby -run -ehttpd . -p8000
```

Then visit `http://localhost:8000/index.html`

---

## Architecture

Everything lives in a single `index.html` file with three main sections:

### 1. **`<head>`** — Dependencies
- **Google Fonts**: Inter (body) + JetBrains Mono (code)
- **highlight.js 11.9.0**: Code syntax highlighting with atom-one-dark theme
  - Language support: YAML, Markdown, JSON

### 2. **`<style>`** — Design System (~550 lines)
Organized with section banners (e.g., `/* ─── Hero ─── */`)

**CSS Custom Properties** define all colors, spacing, and typography:

| Variable | Purpose | Example |
|----------|---------|---------|
| `--bg` | Page background | `#0d0f17` |
| `--bg-card` | Card background | `#141824` |
| `--text` | Body text | `#e2e8f0` |
| `--accent-a` | Agents (blue) | `#4f8ef7` |
| `--accent-s` | Skills (green) | `#3ecf8e` |
| `--accent-p` | Prompts (purple) | `#a78bfa` |
| `--accent-m` | Plan Mode (orange) | `#f97316` |
| `--accent-c` | MCP (cyan) | `#06b6d4` |

**Section Color Convention**: Every element scoped to a section uses a single-letter suffix:
- `.a` → Agents
- `.s` → Skills
- `.p` → Prompts
- `.m` → Plan Mode
- `.c` → MCP

Example: `.tab-btn.active-a`, `.feat-card.s`, `.tag.p`

### 3. **HTML Structure** — Five Main Sections

```
<header class="hero">           ← Animated gradient hero
<nav class="tab-nav-wrap">      ← Sticky tab bar (5 tabs)
<main class="main">
  <section id="sec-agents">     ← Agents deep-dive
  <section id="sec-skills">     ← Skills deep-dive
  <section id="sec-prompts">    ← Prompts deep-dive (default active)
  <section id="sec-plan">       ← Plan Mode deep-dive
  <section id="sec-mcp">        ← MCP deep-dive
<footer>
```

Each section follows an identical pattern:

```
sec-header              (icon + h2 + subtitle)
  ↓
card                    (What is it?)
  ↓
feat-grid               (6 × feature cards)
  ↓
sec-divider ("How to use")
  ↓
card                    (numbered steps)
  ↓
sec-divider ("Sample Spec")
  ↓
code-wrap               (syntax-highlighted block + copy button)
  ↓
sec-divider ("Interactive Demo")
  ↓
demo-box                (input + button + live output)
  ↓
sec-divider ("Rendered Markdown Preview")
  ↓
md-preview              (styled markdown rendering)
```

### 4. **`<script>`** — JavaScript (~300 lines)

**Key Functions:**

| Function | Purpose |
|----------|---------|
| `switchTab(tab)` | Switch between sections; update tab color |
| `copyCode(btn, id)` | Copy code block to clipboard, show "✅ Copied!" |
| `runAgentDemo()` | Simulate an agent execution trace with step-by-step output |
| `runSkillDemo()` | Invoke a skill with simulated response |
| `buildPrompt()` | Type out a generated system prompt character-by-character |
| `runPlanDemo()` | Simulate plan generation and breakdown |
| `runMcpDemo()` | Simulate MCP tool discovery and tool calls |

**Animation Pattern**: All interactive demos build output line-by-line with `setTimeout` recursion and colour-coded spans:

```javascript
const lines = [
  `<span class="line-prefix">▶ Agent started</span>`,
  `<span class="line-key">tool:</span> <span class="line-val">github/list_repos</span>`,
  `<span class="line-ok">✓ Success</span>`,
];

let i = 0;
function writeLine() {
  if (i < lines.length) {
    output.innerHTML += lines[i];
    i++;
    setTimeout(writeLine, delay);
  }
}
```

---

## Design Tokens

### Colours

| Use | Dark Mode | CSS Variable |
|-----|-----------|--------------|
| Background | `#0d0f17` | `--bg` |
| Cards | `#141824` | `--bg-card` |
| Nested cards | `#1a1f30` | `--bg-card2` |
| Borders | `#252a3d` | `--border` |
| Text | `#e2e8f0` | `--text` |
| Muted text | `#7c8aad` | `--muted` |
| Agents accent | `#4f8ef7` (blue) | `--accent-a` |
| Skills accent | `#3ecf8e` (green) | `--accent-s` |
| Prompts accent | `#a78bfa` (purple) | `--accent-p` |
| Plan Mode accent | `#f97316` (orange) | `--accent-m` |
| MCP accent | `#06b6d4` (cyan) | `--accent-c` |

**Tinted backgrounds** use `rgba` with `.12` opacity:
- `--accent-a-dim: rgba(79,142,247,.12)`
- `--accent-s-dim: rgba(62,207,142,.12)`
- etc.

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Body | Inter | 1rem | 400 |
| Headings (h1–h3) | Inter | 1.15–1.9rem | 700–800 |
| Code / Mono | JetBrains Mono | 0.83rem | 400 |

### Spacing

| Token | Value |
|-------|-------|
| Border radius | `14px` (default) |
| Gap (grid) | `16px–24px` |
| Padding (cards) | `28px 32px` |

---

## Code Highlighting

Three code blocks use **highlight.js 11.9.0** with the **atom-one-dark** theme:

1. **Agent Spec** (Markdown) — `#agent-md`
2. **Skill Spec** (YAML) — `#skill-yaml`
3. **System Prompt** (Markdown) — `#prompt-md`
4. **Plan Output** (Markdown) — `#plan-md`
5. **MCP Config** (JSON) — `#mcp-json`

Language packs loaded:
- `highlight.js/languages/yaml.min.js`
- `highlight.js/languages/markdown.min.js`
- `highlight.js/languages/json.min.js`

Initialized on `DOMContentLoaded`:
```javascript
hljs.highlightAll();
```

---

## Interactive Features

### Tab Navigation
- **5 tabs**: Prompts, Agents, Skills, Plan Mode, MCP
- **Hero pills**: Jump to any section directly
- **Sticky nav bar**: Always visible with smooth scroll to tab
- **Active state**: Tab buttons highlight with section accent colour

### Copy Code Blocks
- **Button**: `copy-btn` on each code block
- **Behaviour**: Copies `innerText` from associated `<code>` element to clipboard
- **Feedback**: Button shows "✅ Copied!" for 2 seconds, then resets

### Animated Demos
Each section includes an interactive demo with:

| Section | Demo | Input | Output |
|---------|------|-------|--------|
| Agents | Agent reasoning trace | Goal text | Line-by-line execution log |
| Skills | Skill invocation | Dropdown (skill select) | Simulated skill response |
| Prompts | Prompt generator | 4 textareas (role, domain, task, tokens) | Character-by-character typed prompt |
| Plan Mode | Plan generation | Goal text | Structured plan with phases & risks |
| MCP | Tool discovery & calls | Goal text | Tool discovery + simulated calls |

**Output Styling** — colour-coded spans in `.demo-output`:

| Class | Colour | Use |
|-------|--------|-----|
| `.line-prefix` | Green | Section headers |
| `.line-key` | Blue | JSON/YAML keys |
| `.line-val` | Amber | Values |
| `.line-info` | Muted | Info lines |
| `.line-ok` | Green | Success ✓ |
| `.line-err` | Red | Errors ✗ |

### Markdown Preview
Each section includes a rendered Markdown preview showing:
- Styled headings, lists, blockquotes
- Inline code with monospace font & tinted background
- Custom badge styling for version/status labels

---

## Customization

### Changing Colours
Update CSS variables in the `:root` selector (lines 19–39):

```css
:root {
  --accent-a: #4f8ef7;  /* Change Agents colour */
  --accent-s: #3ecf8e;  /* Change Skills colour */
  --accent-p: #a78bfa;  /* Change Prompts colour */
  /* ... etc */
}
```

### Adding a New Section
1. **Create a new `<section>` block** in `<main>` with `id="sec-yourconcept"`
2. **Add a tab button** in `<nav class="tab-nav-wrap">`
3. **Add the tab name** to the `tabs[]` array in JavaScript
4. **Update `tabColors`** to map your concept to a letter (e.g., `yourconcept: 'x'`)
5. **Add CSS variables** for your accent colour (e.g., `--accent-x`)
6. **Update section-scoped elements** (`.sec-icon.x`, `.feat-card.x`, `.tag.x`, etc.)

### Editing Code Blocks
Code blocks are wrapped in `.code-wrap` with a header and copy button:

```html
<div class="code-wrap">
  <div class="code-header">
    <div style="display:flex;align-items:center;gap:14px">
      <div class="code-dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
      <span class="code-lang">📄 your-file.ext</span>
    </div>
    <button class="copy-btn" onclick="copyCode(this, 'your-code-id')">📋 Copy</button>
  </div>
  <pre><code class="language-yaml" id="your-code-id">
    ... your code ...
  </code></pre>
</div>
```

The `language-` class triggers highlight.js. Use: `yaml`, `markdown`, `json`, `javascript`, etc.

### Modifying Interactive Demos
Each demo function (`runAgentDemo()`, `runSkillDemo()`, etc.) defines an array of `lines` that are written character-by-character. Modify the array to change the output:

```javascript
function runYourDemo() {
  const goal = document.getElementById('your-input').value.trim();
  const out = document.getElementById('your-output');
  const btn = document.getElementById('your-btn');
  
  const lines = [
    `<span class="line-prefix">▶ Starting…</span>`,
    `<span class="line-key">param:</span> <span class="line-val">${goal}</span>`,
  ];
  
  // ... write lines with setTimeout recursion ...
}
```

---

## Browser Support

- **Modern browsers** (2020+): Chrome, Firefox, Safari, Edge
- **IE11**: Not supported (uses ES6, CSS Grid, CSS Variables)
- **Mobile**: Responsive design, works on tablets and phones

---

## Performance Notes

- **No external API calls**: Everything is static or simulated
- **No JavaScript frameworks**: Vanilla JS only (~300 lines)
- **Syntax highlighting**: highlight.js (11.9.0) is ~500 KB minified
- **Total page size**: ~200 KB uncompressed (mostly HTML + CSS)

---

## CDN Versions (Pinned)

Do not upgrade these without testing all code blocks:

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" />

<!-- highlight.js 11.9.0 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/yaml.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/markdown.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/json.min.js"></script>
```

---

## Files

```
.
├── index.html              ← Single-file demo (everything is here)
├── README.md               ← This file
├── .github/
│   └── ...                 ← GitHub configuration
└── .git/                   ← Version control
```

---

## Related Resources

- **Model Context Protocol (MCP)**: https://modelcontextprotocol.io
- **Claude API**: https://www.anthropic.com/claude
- **Prompt Engineering Guide**: https://www.anthropic.com/research/constitution-ai-harmlessness-from-ai-feedback
- **highlight.js**: https://highlightjs.org

---

## License

This demo is provided as-is for educational purposes. Adapt freely for your own projects.

---

## Contributing

Found a typo or issue? Feel free to open a pull request or issue.

---

**Happy learning! 🚀**

Open `index.html` and explore Agents, Skills, Prompts, Plan Mode, and MCP with live, interactive demos.
