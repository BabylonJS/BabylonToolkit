# Agent Training Reference (1.0.0)

This page is the front-end directory for the training examples in this repository.
Use it as the first context block when an AI agent is asked to generate or update Babylon Toolkit code.

---

## Purpose

- Route the agent quickly to the right example content.
- Keep generated code aligned with repository conventions.
- Reduce hallucination by anchoring responses to known sample patterns.

## Source Directory

- https://github.com/BabylonJS/BabylonToolkit/tree/master/Agent/references/training-references/README.md: Root index for all examples.
- https://github.com/BabylonJS/BabylonToolkit/tree/master/Agent/training/training-references/playgrounds/README.md: Playground focused examples.
- https://github.com/BabylonJS/BabylonToolkit/tree/master/Agent/training/training-references/playgrounds/01-DemoRotator.md: Minimal ScriptComponent rotation pattern.
- https://github.com/BabylonJS/BabylonToolkit/tree/master/Agent/training/training-references/playgrounds/02-DemoBobber.md: Parameterized ScriptComponent motion pattern.
- https://github.com/BabylonJS/BabylonToolkit/tree/master/Agent/training/training-references/playgrounds/03-DemoUserInput.md: Input driven movement and optional mouse look pattern.
- https://github.com/BabylonJS/BabylonToolkit/tree/master/Agent/training/training-references/playgrounds/04-DemoSampleScene.md: Async scene load + physics + player controller pattern.
- https://github.com/BabylonJS/BabylonToolkit/tree/master/Agent/training/training-references/declarations/README.md: Declaration focused index for toolkit and DLC class surface.
- https://github.com/BabylonJS/BabylonToolkit/tree/master/Agent/training/training-references/declarations/babylon.toolkit.d.ts: Babylon Toolkit type and API declarations.
- https://github.com/BabylonJS/BabylonToolkit/tree/master/Agent/training/training-references/declarations/default.playground.d.ts: Default playground and DLC runtime declarations.
- https://github.com/BabylonJS/BabylonToolkit/tree/master/Agent/training/training-references/projects/README.md: Project level examples.

## Quick Routing Guide

Use this lookup before generating code:

- Need a simple component lifecycle demo (`start`, `update`): use `01-DemoRotator.md`.
- Need tunable public fields and time-based animation: use `02-DemoBobber.md`.
- Need input-driven movement, configurable speed, or optional mouse look: use `03-DemoUserInput.md`.
- Need async loading, runtime initialization, physics, or character control: use `04-DemoSampleScene.md`.
- Need to discover available classes, properties, and methods before writing code: use `declarations/babylon.toolkit.d.ts` and `declarations/default.playground.d.ts`.
- Need broad sample discovery context: start with `babylon-toolkit/training-references/README.md` and `babylon-toolkit/training-references/playgrounds/README.md`.

## Declaration File Discovery

- Start with declaration files when implementing new behavior against toolkit/runtime APIs.
- Glean class availability, constructor signatures, property names, and method contracts directly from `.d.ts` definitions.
- Prioritize declared camera systems, player controllers, input systems, and scene helper classes before inventing new abstractions.
- Use declarations to validate compatibility between generated code and existing Babylon Toolkit runtime surface.

---

**Use these training examples as references when generating code**