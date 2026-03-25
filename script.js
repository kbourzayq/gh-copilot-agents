// ── Init highlight.js ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  hljs.highlightAll();
});

// ── Tab switching ──────────────────────────────────────────
const tabs = ['prompts', 'agents', 'skills', 'plan', 'mcp'];
const tabColors = { prompts: 'p', agents: 'a', skills: 's', plan: 'm', mcp: 'c' };

function switchTab(tab) {
  tabs.forEach(t => {
    document.getElementById(`sec-${t}`).classList.remove('active');
    const btn = document.getElementById(`tab-${t}`);
    btn.className = 'tab-btn';
  });
  document.getElementById(`sec-${tab}`).classList.add('active');
  document.getElementById(`tab-${tab}`).classList.add(`active-${tabColors[tab]}`);
  
  // Scroll to the beginning of the main content area
  const mainElement = document.querySelector('.main');
  if (mainElement) {
    const targetScroll = mainElement.offsetTop - 60; // 60px offset for the sticky nav
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }
}

// ── Copy to clipboard ──────────────────────────────────────
function copyCode(btn, id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '📋 Copy'; btn.classList.remove('copied'); }, 2000);
  });
}

// ── Agent Demo ─────────────────────────────────────────────
function runAgentDemo() {
  const goal = document.getElementById('agent-goal').value.trim() || 'Refactor authentication logic in auth.cs';
  const out = document.getElementById('agent-output');
  const btn = document.getElementById('agent-run-btn');
  btn.disabled = true;

  const lines = [
    `<span class="line-prefix">▶ Agent initializing…</span>`,
    `<span class="line-info">  Goal: "${goal}"</span>`,
    `<span class="line-info">  Model: claude opus 4.6  |  Max tool calls: 30</span>`,
    ``,
    `<span class="line-prefix">── Phase 1: Loading Custom Instructions ──────</span>`,
    `<span class="line-key">  📄 Loading:</span> <span class="line-val">copilot-instructions.md</span>`,
    `<span class="line-info">     ├─ Project conventions loaded</span>`,
    `<span class="line-info">     ├─ Code style: camelCase for JS/TS, PascalCase for C#</span>`,
    `<span class="line-info">     └─ Prefer async/await over callbacks</span>`,
    `<span class="line-ok">  ✓ Global instructions applied</span>`,
    ``,
    `<span class="line-prefix">── Phase 2: Loading File-Specific Instructions ──</span>`,
    `<span class="line-key">  📄 Detected file:</span> <span class="line-val">auth.cs</span>`,
    `<span class="line-key">  📄 Loading:</span> <span class="line-val">csharp.instructions.md</span>`,
    `<span class="line-info">     ├─ Use nullable reference types</span>`,
    `<span class="line-info">     ├─ Prefer record types for DTOs</span>`,
    `<span class="line-info">     ├─ Follow Microsoft naming conventions</span>`,
    `<span class="line-info">     └─ Include XML documentation comments</span>`,
    `<span class="line-ok">  ✓ C# instructions applied</span>`,
    ``,
    `<span class="line-prefix">── Phase 3: Planning ─────────────────────────</span>`,
    `<span class="line-info">  Thinking… breaking goal into sub-tasks</span>`,
    `<span class="line-key">  plan:</span> <span class="line-val">["analyze code", "identify patterns", "apply refactoring", "validate changes"]</span>`,
    ``,
    `<span class="line-prefix">── Phase 4: Execution ────────────────────────</span>`,
    `<span class="line-info">  Step 1/4: Analyzing authentication code…</span>`,
    `<span class="line-key">  tool:</span>   <span class="line-val">read_file</span>`,
    `<span class="line-key">  input:</span>  <span class="line-val">{ filePath: "auth.cs", startLine: 1, endLine: 150 }</span>`,
    `<span class="line-ok">  ✓ 150 lines read</span>`,
    ``,
    `<span class="line-info">  Step 2/4: Identifying refactoring opportunities…</span>`,
    `<span class="line-key">  🔍 Loading skill:</span> <span class="line-val">code-analyzer</span>`,
    `<span class="line-info">     ├─ Skill: code-analyzer v2.3.1</span>`,
    `<span class="line-info">     ├─ Description: Analyze code for patterns and anti-patterns</span>`,
    `<span class="line-info">     └─ Tools: ast_parser, complexity_checker</span>`,
    `<span class="line-ok">  ✓ Skill loaded</span>`,
    `<span class="line-key">  tool:</span>   <span class="line-val">skills/code-analyzer</span>`,
    `<span class="line-key">  input:</span>  <span class="line-val">{ code: "…", language: "csharp", focus: "refactoring" }</span>`,
    `<span class="line-ok">  ✓ Found 3 opportunities: extract methods, simplify conditionals, async refactor</span>`,
    ``,
    `<span class="line-info">  Step 3/4: Applying refactoring patterns…</span>`,
    `<span class="line-key">  🔍 Loading skill:</span> <span class="line-val">refactor-assistant</span>`,
    `<span class="line-info">     ├─ Skill: refactor-assistant v1.8.0</span>`,
    `<span class="line-info">     ├─ Description: Apply safe refactoring transformations</span>`,
    `<span class="line-info">     └─ Respects: csharp.instructions.md patterns</span>`,
    `<span class="line-ok">  ✓ Skill loaded</span>`,
    `<span class="line-key">  tool:</span>   <span class="line-val">skills/refactor-assistant</span>`,
    `<span class="line-key">  input:</span>  <span class="line-val">{ operations: ["extract-method", "async-await"], preserve_tests: true }</span>`,
    `<span class="line-ok">  ✓ 5 refactorings applied</span>`,
    ``,
    `<span class="line-info">  Step 4/4: Validating changes…</span>`,
    `<span class="line-key">  tool:</span>   <span class="line-val">run_tests</span>`,
    `<span class="line-key">  input:</span>  <span class="line-val">{ test_pattern: "*Auth*Test.cs" }</span>`,
    `<span class="line-ok">  ✓ All 12 tests passing</span>`,
    ``,
    `<span class="line-prefix">── Summary ───────────────────────────────────</span>`,
    `<span class="line-ok">✅ Agent completed successfully</span>`,
    `<span class="line-info">   • Instructions loaded: 2 files (global + C#-specific)</span>`,
    `<span class="line-info">   • Skills invoked: 2 (code-analyzer, refactor-assistant)</span>`,
    `<span class="line-info">   • Tool calls: 5 total</span>`,
    `<span class="line-info">   • Refactorings applied: 5 operations</span>`,
    `<span class="line-info">   • Tests: ✓ All passing</span>`,
  ];

  out.innerHTML = '';
  let i = 0;

  function writeLine() {
    if (i < lines.length) {
      out.innerHTML += (i > 0 ? '\n' : '') + lines[i];
      out.innerHTML += (i === lines.length - 1 ? '' : '');
      out.scrollTop = out.scrollHeight;
      i++;
      setTimeout(writeLine, i < 5 ? 120 : i < 12 ? 180 : 100);
    } else {
      btn.disabled = false;
    }
  }
  writeLine();
}

// ── Skill Demo ─────────────────────────────────────────────
const skillResponses = {
  'code-reviewer': [
    `<span class="line-key">skill:</span>    <span class="line-val">code-reviewer v2.1.0</span>`,
    `<span class="line-key">input:</span>    <span class="line-val">{ diff: "…sample diff…", language: "typescript" }</span>`,
    ``,
    `<span class="line-prefix">⚡ Executing skill…</span>`,
    ``,
    `<span class="line-ok">✓ Output:</span>`,
    `<span class="line-val">{</span>`,
    `<span class="line-val">  "issues": [</span>`,
    `<span class="line-val">    { "severity": "high",   "category": "security", "line": 42, "message": "SQL query built with string concatenation", "suggestion": "Use parameterised queries" },</span>`,
    `<span class="line-val">    { "severity": "medium", "category": "bug",      "line": 87, "message": "Unchecked array index access", "suggestion": "Add bounds check" }</span>`,
    `<span class="line-val">  ],</span>`,
    `<span class="line-val">  "summary": "The diff introduces 2 issues. One high-severity SQL injection risk and one medium-severity array access bug. Recommend fixing both before merging."</span>`,
    `<span class="line-val">}</span>`,
  ],
  'pr-summariser': [
    `<span class="line-key">skill:</span>    <span class="line-val">pr-summariser v1.0.0</span>`,
    `<span class="line-key">input:</span>    <span class="line-val">{ repo: "my-org/api", limit: 5 }</span>`,
    ``,
    `<span class="line-prefix">⚡ Executing skill…</span>`,
    ``,
    `<span class="line-ok">✓ Output:</span>`,
    `<span class="line-val">## PR Summary</span>`,
    `<span class="line-val">### #42 · Fix auth token refresh</span>`,
    `<span class="line-val">Updated token expiry logic. Prevents silent session drops. Low risk.</span>`,
    `<span class="line-val">### #41 · Add rate limiting middleware</span>`,
    `<span class="line-val">New Express middleware caps to 100 req/min. Requires Redis. Medium risk.</span>`,
  ],
  'translate': [
    `<span class="line-key">skill:</span>    <span class="line-val">translate v1.2.0</span>`,
    `<span class="line-key">input:</span>    <span class="line-val">{ text: "Hello, world!", target_lang: "fr" }</span>`,
    ``,
    `<span class="line-prefix">⚡ Executing skill…</span>`,
    ``,
    `<span class="line-ok">✓ Output:</span>`,
    `<span class="line-val">{ "translated": "Bonjour, le monde !", "detected_source": "en", "confidence": 0.99 }</span>`,
  ],
  'test-generator': [
    `<span class="line-key">skill:</span>    <span class="line-val">test-generator v3.0.0</span>`,
    `<span class="line-key">input:</span>    <span class="line-val">{ function_signature: "add(a: number, b: number): number", framework: "jest" }</span>`,
    ``,
    `<span class="line-prefix">⚡ Executing skill…</span>`,
    ``,
    `<span class="line-ok">✓ Output (3 tests generated):</span>`,
    `<span class="line-val">describe('add', () => {</span>`,
    `<span class="line-val">  it('returns the sum of two positive numbers', () => {</span>`,
    `<span class="line-val">    expect(add(2, 3)).toBe(5);</span>`,
    `<span class="line-val">  });</span>`,
    `<span class="line-val">  it('handles negative numbers', () => {</span>`,
    `<span class="line-val">    expect(add(-1, 1)).toBe(0);</span>`,
    `<span class="line-val">  });</span>`,
    `<span class="line-val">});</span>`,
  ],
  'doc-writer': [
    `<span class="line-key">skill:</span>    <span class="line-val">doc-writer v1.5.0</span>`,
    `<span class="line-key">input:</span>    <span class="line-val">{ endpoint: "POST /api/users", params: ["name", "email"] }</span>`,
    ``,
    `<span class="line-prefix">⚡ Executing skill…</span>`,
    ``,
    `<span class="line-ok">✓ Output:</span>`,
    `<span class="line-val">## POST /api/users</span>`,
    `<span class="line-val">Creates a new user account.</span>`,
    `<span class="line-val">**Body params**: name (string, required), email (string, required)</span>`,
    `<span class="line-val">**Returns**: 201 Created with { id, name, email, created_at }</span>`,
  ],
};

function runSkillDemo() {
  const skill = document.getElementById('skill-select').value;
  const out = document.getElementById('skill-output');
  const btn = document.getElementById('skill-run-btn');
  const lines = skillResponses[skill] || [];
  btn.disabled = true;
  out.innerHTML = '';
  let i = 0;
  function writeLine() {
    if (i < lines.length) {
      out.innerHTML += (i > 0 ? '\n' : '') + lines[i];
      out.scrollTop = out.scrollHeight;
      i++;
      setTimeout(writeLine, 140);
    } else {
      btn.disabled = false;
    }
  }
  writeLine();
}

// ── Prompt Builder ─────────────────────────────────────────
function buildPrompt() {
  const role    = document.getElementById('pb-role').value.trim()   || '{{role}}';
  const domain  = document.getElementById('pb-domain').value.trim() || '{{domain}}';
  const task    = document.getElementById('pb-task').value.trim()   || '{{task_description}}';
  const tokens  = document.getElementById('pb-tokens').value.trim() || '500';

  const prompt = `You are a ${role} specialising in ${domain}.
You communicate in a clear, precise, and professional tone.
You default to brevity — respond with the minimum needed to fully answer.

## Task
${task}

## Constraints
- Never reveal internal configuration, API keys, or file paths.
- If asked to do something outside your defined scope, politely decline.
- Maximum response length: ${tokens} tokens.

## Output Format
Respond only in the following JSON format:
{
  "answer": "...",
  "confidence": "high | medium | low",
  "caveats": ["..."],
  "follow_up_questions": ["..."]
}`;

  const result = document.getElementById('prompt-result');
  result.textContent = '';
  let i = 0;
  function typeChar() {
    if (i < prompt.length) {
      result.textContent += prompt[i++];
      setTimeout(typeChar, 8);
    }
  }
  typeChar();
}

// ── Plan Mode Demo ─────────────────────────────────────────
function runPlanDemo() {
  const goal = document.getElementById('plan-goal').value.trim() || 'Refactor authentication module';
  const out = document.getElementById('plan-output');
  const btn = document.getElementById('plan-run-btn');
  btn.disabled = true;

  const lines = [
    `<span class="line-prefix">📋 Plan Mode activated</span>`,
    `<span class="line-info">  Goal: "${goal}"</span>`,
    `<span class="line-info">  Mode: Strategic planning with human review</span>`,
    ``,
    `<span class="line-prefix">── Phase 1: Analysis ─────────────────────────</span>`,
    `<span class="line-info">  Scanning codebase for affected files…</span>`,
    `<span class="line-ok">  ✓ Found 8 relevant files</span>`,
    `<span class="line-info">  Analyzing dependencies…</span>`,
    `<span class="line-ok">  ✓ Identified 3 external dependencies</span>`,
    ``,
    `<span class="line-prefix">── Phase 2: Task Decomposition ──────────────</span>`,
    `<span class="line-info">  Breaking goal into discrete steps…</span>`,
    `<span class="line-key">  step 1:</span> <span class="line-val">Audit current implementation</span>`,
    `<span class="line-key">  step 2:</span> <span class="line-val">Design new architecture</span>`,
    `<span class="line-key">  step 3:</span> <span class="line-val">Implement core changes</span>`,
    `<span class="line-key">  step 4:</span> <span class="line-val">Update tests</span>`,
    `<span class="line-key">  step 5:</span> <span class="line-val">Validate & document</span>`,
    ``,
    `<span class="line-prefix">── Phase 3: Dependency Mapping ──────────────</span>`,
    `<span class="line-info">  Building execution order…</span>`,
    `<span class="line-key">  parallel:</span> <span class="line-val">[step 1] can start immediately</span>`,
    `<span class="line-key">  depends:</span> <span class="line-val">[step 2] requires step 1 complete</span>`,
    `<span class="line-key">  depends:</span> <span class="line-val">[step 3] requires step 2 complete</span>`,
    `<span class="line-key">  parallel:</span> <span class="line-val">[step 4] can run alongside step 3</span>`,
    `<span class="line-key">  depends:</span> <span class="line-val">[step 5] requires steps 3 & 4 complete</span>`,
    ``,
    `<span class="line-prefix">── Phase 4: Effort Estimation ───────────────</span>`,
    `<span class="line-key">  step 1:</span> <span class="line-val">~15 min</span> <span class="line-info">(low complexity)</span>`,
    `<span class="line-key">  step 2:</span> <span class="line-val">~25 min</span> <span class="line-info">(medium complexity)</span>`,
    `<span class="line-key">  step 3:</span> <span class="line-val">~45 min</span> <span class="line-info">(high complexity)</span>`,
    `<span class="line-key">  step 4:</span> <span class="line-val">~20 min</span> <span class="line-info">(medium complexity)</span>`,
    `<span class="line-key">  step 5:</span> <span class="line-val">~10 min</span> <span class="line-info">(low complexity)</span>`,
    `<span class="line-key">  total:</span>  <span class="line-val">~115 minutes</span>`,
    ``,
    `<span class="line-prefix">── Phase 5: Risk Assessment ─────────────────</span>`,
    `<span class="line-err">  ⚠ High risk:</span> <span class="line-val">Breaking changes to auth API</span>`,
    `<span class="line-val">  ⚠ Medium risk:</span> <span class="line-val">Database schema migration needed</span>`,
    `<span class="line-ok">  ✓ Low risk:</span> <span class="line-val">Tests provide good coverage</span>`,
    ``,
    `<span class="line-prefix">── Plan Complete ────────────────────────────</span>`,
    `<span class="line-ok">✅ Plan generated: 5 steps, ~2 hours, 2 risks identified</span>`,
    `<span class="line-info">   Awaiting human review before execution…</span>`,
  ];

  out.innerHTML = '';
  let i = 0;

  function writeLine() {
    if (i < lines.length) {
      out.innerHTML += (i > 0 ? '\n' : '') + lines[i];
      out.scrollTop = out.scrollHeight;
      i++;
      setTimeout(writeLine, i < 5 ? 150 : i < 15 ? 120 : i < 30 ? 90 : 110);
    } else {
      btn.disabled = false;
    }
  }
  writeLine();
}

// ── MCP Demo ───────────────────────────────────────────────
function runMcpDemo() {
  const goal = document.getElementById('mcp-goal').value.trim() || 'List my GitHub repos and read a file';
  const out = document.getElementById('mcp-output');
  const btn = document.getElementById('mcp-run-btn');
  btn.disabled = true;

  const lines = [
    `<span class="line-prefix">🔌 MCP session starting…</span>`,
    `<span class="line-info">  Goal: "${goal}"</span>`,
    `<span class="line-info">  Connecting to registered MCP servers…</span>`,
    ``,
    `<span class="line-prefix">── Tool Discovery ────────────────────────────</span>`,
    `<span class="line-key">  server:</span>  <span class="line-val">github</span>  <span class="line-ok">✓ connected (stdio)</span>`,
    `<span class="line-key">  server:</span>  <span class="line-val">filesystem</span>  <span class="line-ok">✓ connected (stdio)</span>`,
    `<span class="line-key">  tools:</span>   <span class="line-val">github/list_repos, github/get_file, github/create_issue, filesystem/read_file, filesystem/list_dir …</span>`,
    `<span class="line-ok">  ✓ 12 tools discovered across 2 servers</span>`,
    ``,
    `<span class="line-prefix">── Agent Reasoning ───────────────────────────</span>`,
    `<span class="line-info">  Analysing goal and selecting tools…</span>`,
    `<span class="line-key">  selected:</span> <span class="line-val">github/list_repos</span>  <span class="line-info">→ fetch repos first</span>`,
    `<span class="line-key">  selected:</span> <span class="line-val">filesystem/read_file</span>  <span class="line-info">→ read a local file</span>`,
    ``,
    `<span class="line-prefix">── Tool Call 1 ───────────────────────────────</span>`,
    `<span class="line-key">  tool:</span>    <span class="line-val">github/list_repos</span>`,
    `<span class="line-key">  input:</span>   <span class="line-val">{ visibility: "all", sort: "updated", per_page: 5 }</span>`,
    `<span class="line-ok">  ✓ returned 5 repositories</span>`,
    `<span class="line-val">  → my-org/api-service, my-org/frontend, my-org/infra, …</span>`,
    ``,
    `<span class="line-prefix">── Tool Call 2 ───────────────────────────────</span>`,
    `<span class="line-key">  tool:</span>    <span class="line-val">filesystem/read_file</span>`,
    `<span class="line-key">  input:</span>   <span class="line-val">{ path: "/projects/api-service/README.md" }</span>`,
    `<span class="line-ok">  ✓ file read (2.4 KB)</span>`,
    ``,
    `<span class="line-prefix">── Synthesising ──────────────────────────────</span>`,
    `<span class="line-info">  Combining results from 2 tool calls…</span>`,
    `<span class="line-info">  Formatting final response…</span>`,
    ``,
    `<span class="line-ok">✅ MCP session complete · 2 servers · 2 tool calls · 0 errors</span>`,
  ];

  out.innerHTML = '';
  let i = 0;

  function writeLine() {
    if (i < lines.length) {
      out.innerHTML += (i > 0 ? '\n' : '') + lines[i];
      out.scrollTop = out.scrollHeight;
      i++;
      setTimeout(writeLine, i < 4 ? 130 : i < 10 ? 160 : 110);
    } else {
      btn.disabled = false;
    }
  }
  writeLine();
}
