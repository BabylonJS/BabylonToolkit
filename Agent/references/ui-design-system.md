# User Interface Instructions (1.0.0)

## Anthropics Design Skill

When asked to `Use Anthropics Design Skill` make sure to intall, enable and use the full design skill set at https://github.com/anthropics/skills.git

## Design System

If this project contains `./DESIGN.md`, treat it as the canonical design system.

Before creating, editing, or reviewing UI code:

1. Read `./DESIGN.md` if it exists.
2. Follow its rules for:
   - colors
   - typography
   - spacing
   - border radius
   - shadows/elevation
   - buttons
   - forms
   - cards
   - layout patterns
   - dark mode, if specified
3. Do not introduce new visual tokens unless explicitly asked.
4. If the implementation conflicts with `./DESIGN.md`, update the implementation, not the design system.
5. When unsure, explain the missing design decision and choose the closest option already defined in `./DESIGN.md`.

## UI Implementation

When building UI, prefer existing project components and styles.

If using Tailwind, translate the `./DESIGN.md` tokens into Tailwind classes, theme values, or CSS variables.

Use the front-end design skill or equivalent tool for:

- visual hierarchy
- layout quality
- responsiveness
- interaction polish
- production-grade UI details

If the `Anthropics Design Skill` suggests a style that conflicts with `./DESIGN.md`, `./DESIGN.md` wins.

---

**Follow these rules exactly when generating user interfaces**