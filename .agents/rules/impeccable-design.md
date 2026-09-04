# Impeccable Design Rules (AI Anti-Slop Guidelines)

Whenever designing, building, or refactoring UI components or web application layouts, adhere to the following **Impeccable.style** design guidelines:

1. **Anti-Slop Color & Gradient Rule**: Avoid default purple-to-blue gradients, flat white cards on light gray backgrounds, or arbitrary accent colors. Use cohesive HSL color tokens with explicit contrast ratios.
2. **Typographic Rhythm**: Establish clear typographic scale (Display, Heading, Body, Label, Micro). Avoid uniform font size distributions.
3. **Card & Border Hierarchy**: Avoid nested boxes ("cards inside cards"). Prefer subtle background color shifts, divider lines, or whitespace separation over redundant 1px borders.
4. **Actionable Copy**: Button copy must be clear and direct (e.g. "Create Project" or "Save Changes" instead of "Submit" or "Continue").
5. **Polished State Management**: Every interactive element must define hover, active, focus-visible, disabled, and loading states with smooth transitions (`transition: all 0.2s ease`).
