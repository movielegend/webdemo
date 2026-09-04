---
name: impeccable
description: Design vocabulary, UI anti-pattern detector, and aesthetic polishing skill based on impeccable.style. Elevates AI-generated code from generic "AI slop" to editorial, production-grade visual design.
---

# Impeccable Design System & UI Skill

This skill incorporates the **Impeccable Design Vocabulary** (from [impeccable.style](https://impeccable.style)) into your AI workflow to eliminate generic "AI slop" and produce high-impact, editorial-grade user interfaces.

## 🚨 Anti-Pattern Rules (AI Slop Checklist to Eliminate)
When designing or reviewing code, NEVER produce or accept the following AI clichés:

1. **Generic Color Palettes & Overused Gradients:**
   - ❌ Avoid default purple-to-blue or pink gradients (`bg-gradient-to-r from-purple-500 to-indigo-600`).
   - ❌ Avoid random amber badges/icons or burnt orange blocks with low contrast text.
   - ❌ Avoid overuse of dark-mode glassmorphism and background blurs without purposeful hierarchy.
   - ✅ Use curated, deliberate HSL palettes with high contrast ratio and intentional background tinting.

2. **Typography & Hierarchy Mistakes:**
   - ❌ Avoid using "Inter" or system defaults for every single element without weight variation.
   - ❌ Avoid weak hierarchy where headings (`h1`, `h2`, `h3`) are too similar in scale and contrast.
   - ❌ Avoid italic serif titles paired awkwardly with harsh modern sans-serifs.
   - ✅ Use distinct display vs body typography (e.g. Albert Sans, Outfit, Space Grotesk) with tight vertical rhythm and bold contrast.

3. **Layout & Box Clutter:**
   - ❌ Avoid "cards inside cards inside cards" (over-nesting bordered containers).
   - ❌ Avoid "everything is equal" dashboards (give primary metric 3x visual weight over secondary metrics).
   - ❌ Avoid cramped padding (`p-2`, `p-3`) on major sections. Give elements room to breathe with systematic spacing (8px grid: `p-6`, `p-8`, `gap-6`).

4. **UX Copy & Micro-Interactions:**
   - ❌ Avoid vague CTA buttons like "Submit", "Continue", or "Unlock your potential today".
   - ❌ Avoid status-chip soup (placing 5 colored pills next to each other).
   - ❌ Avoid missing hover, focus-visible, and active states.
   - ✅ Use explicit, action-oriented button text ("Ship Launch Plan →", "Export Report").

---

## 🛠 Impeccable Command Suite

When requested by the user (or via `/impeccable <command>`), execute these workflows:

### 1. Project Initialization & Context
- **/impeccable init** / **document**: Scans project typography, colors, components, and Tailwind config. Generates or updates `PRODUCT.md` (value prop, key flows) and `DESIGN.md` (tokens, typography scale, spacing rules, color palette).

### 2. Planning & Discovery
- **/impeccable shape**: Before writing code, produces a concise Design Brief: primary user goal, spatial layout structure, visual tone, and hierarchy level.

### 3. Evaluation & Quality Control
- **/impeccable audit**: Technical check across 5 dimensions (Accessibility/contrast, Responsive behavior, Performance, Edge cases, Interaction states). Categorizes findings from P0 (blockers) to P3 (polish).
- **/impeccable critique**: Evaluates UI aesthetics, hierarchy, copy clarity, and anti-pattern score (0-100). Gives actionable recommendations.

### 4. Visual Refinement & Polishing
- **/impeccable polish**: Meticulous final pass. Fixes alignment, contrast, subtle borders, padding, hover transitions, and removes AI slop tells.
- **/impeccable layout**: Fixes grid alignment, vertical rhythm, container constraints, and spacing scale.
- **/impeccable typeset**: Refines font stacks, line heights, font weights, and typographic contrast.
- **/impeccable colorize**: Replaces bland monochrome or template colors with a curated, semantic palette.
- **/impeccable animate**: Adds purposeful micro-animations (CSS transitions, spring physics, state changes).
- **/impeccable bolder**: Increases visual punch—bolder headlines, stronger contrast, punchier focal points.
- **/impeccable quieter**: Reduces visual noise, softens secondary elements, increases whitespace.

### 5. Simplification & Hardening
- **/impeccable distill**: Subtractive design. Removes unnecessary borders, backgrounds, and extra cards to focus on the essential core.
- **/impeccable clarify**: Rewrites vague copy and ambiguous form labels into crisp, self-explaining text.
- **/impeccable harden**: Production readiness—error states, empty states, loading skeletons, responsive breakpoints, and overflow protection.

---

## 🎨 Implementation Standard
Every web app or frontend component generated must follow these rules:
- **Design Tokens First**: Use custom CSS variables (`--color-bg`, `--color-primary`, `--radius-lg`, `--space-4`) or defined Tailwind tokens.
- **Micro-Animations**: Include smooth CSS `transition: all 0.2s ease` on interactive elements.
- **Accessibility**: Ensure WCAG AA contrast (minimum 4.5:1 for normal text), proper ARIA labels, and focus rings.
