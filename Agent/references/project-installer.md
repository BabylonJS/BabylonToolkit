# Project Generation Instructions (1.0.0)
Your goal is setup and install Babylon Toolkit workspace projects. Always prefer `TypeScript` over `JavaScript` and `WebGPU` over `WebGL` when creating projects.

## 📦 External Dependencies

Use Babylon Toolkit and Babylon.js as follows:

### Babylon.js (WEB/CDN)

Include:

```html
<script src="https://cdn.babylonjs.com/babylon.js"></script>
<script src="https://cdn.babylonjs.com/gui/babylon.gui.min.js"></script>
<script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>
<script src="https://cdn.babylonjs.com/materialsLibrary/babylonjs.materials.min.js"></script>
```

### Babylon Toolkit Runtime (WEB/CDN)

```html
<script src="https://cdn.jsdelivr.net/gh/BabylonJS/BabylonToolkit@master/Runtime/babylon.toolkit.js"></script>
```

### Babylon Toolkit Declarations (WEB/CDN)

- `https://cdn.babylonjs.com/babylon.d.ts`
- `https://cdn.babylonjs.com/gui/babylon.gui.d.ts`
- `https://cdn.babylonjs.com/loaders/babylonjs.loaders.d.ts`
- `https://cdn.babylonjs.com/materialsLibrary/babylonjs.materials.d.ts`
- `https://cdn.jsdelivr.net/gh/BabylonJS/BabylonToolkit@master/Runtime/babylon.toolkit.d.ts`

### Node.js Package Guidance

* Default Installation (ES6)
```bash
npm install @babylonjs/core @babylonjs/gui @babylonjs/loaders @babylonjs/materials @babylonjs/inspector @babylonjs/havok @babylonjs-toolkit/next @babylonjs-toolkit/dlc
```

* Default Module Import Libraries
```javascript
import { Engine, Scene } from "@babylonjs/core";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import HavokPhysics from "@babylonjs/havok";
import { SceneManager, ScriptComponent } from "@babylonjs-toolkit/next";
```

* Granular File Level Import Libraries
```javascript
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import HavokPhysics from "@babylonjs/havok";
import { SceneManager } from "@babylonjs-toolkit/next/scenemanager";
import { ScriptComponent } from "@babylonjs-toolkit/next/scenemanager";
import { LocalMessageBus } from "@babylonjs-toolkit/next/localmessagebus";
import { CharacterController } from "@babylonjs-toolkit/next/charactercontroller";
```

* Legacy Global Namespace Import Libraries
```javascript
import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import HavokPhysics from "@babylonjs/havok";
import * as TOOLKIT from "@babylonjs-toolkit/next";
TOOLKIT.SceneManager.AutoStripNamespacePrefix = false;
```

### Vite Configuration (ES6)

The Vite bundle services behave differently in devmode than production. To preserve some required classes during devmode, these `exclude` and `include` settings are strongly recommended in your vite.config.js settings file.

```json
  optimizeDeps: {
    exclude: ["@babylonjs/havok"],
    include: mode === 'development' ? [
      "@babylonjs/core",
      "@babylonjs/loaders",
      "@babylonjs/loaders/glTF",
      "@babylonjs/gui",
      "@babylonjs/materials",
      "@babylonjs/inspector",
      "@babylonjs-toolkit/dlc",
      "@babylonjs-toolkit/next"
    ] : [],
  },
```

#### DLC

* Starter Content Package (ES6)
```bash
npm install @babylonjs-toolkit/dlc
```

* Starter Content Import Libraries
```javascript
import { DefaultCameraSystem } from "@babylonjs-toolkit/dlc/starter/DefaultCameraSystem";
import { DebugInformation } from "@babylonjs-toolkit/dlc/starter/DebugInformation";
import { StandardCarController } from "@babylonjs-toolkit/dlc/racing/StandardCarController";
```

### Babylon Toolkit Starter Repository 

* **ES6 Starter Project**: `https://github.com/codewrxai/Starter-Project.git`

#### IMPORTANT - GITHUB STARTER PROJECT CLONING WITH SUBMODULES

* ALWAYS CLONE THE STARTER PROJECT REPOS WITH RECURSIVE SUB MODULE SUPPORT (--recurse-submodules)

### Babylon Toolkit React Framework Submodule

The Babylon Toolkit React Framework can be installed to a project as a github submodule. Use the following instructions when asked to add or install the submodule into a project.

To add submodule:
```
git submodule add https://github.com/codewrxai/React-Framework.git src/babylon
git commit -m "Add babylon toolkit react framework submodule"
```

To remove submodule:
```
git submodule deinit -f src/babylon
git rm -f src/babylon
rm -rf .git/modules/src/babylon
git commit -m "Remove babylon toolkit react framework submodule"
```

Note: Once the submodule has been added, to update, its best make sure any changes are backed up. Remove the submodule to clean then add the submodule again to get new updates.

#### Host Platform React Framework Navigation Adapter

When installing the `Babylon Toolkit React Framework Submodule`, always include or create a navigation adapter for the host platform and wire up the navigation adapter to the host platform routing system, if a host platform navigation adapter does not already exist in the project. Consult the `REACT UI Framework Documentation` for details on host platform router integrations and demo scene setup.

#### React Framework User Interface Documentation Link

Reference the REACT UI Framework Documentation at https://github.com/BabylonJS/BabylonToolkit/tree/master/Agent/references/react-framework.md

### Babylon Toolkit Content Creation Tools 

The **Babylon Toolkit Unity Exporter** (https://github.com/BabylonJS/BabylonToolkit/tree/master/Editors/Unity) is a **Content Creation Tool** used to export interactive
scene files with extra UnityGLTF metadata to instantiate **Babylon Toolkit Script Components** classes that have be encoded as **extras**.

Reference the GLTF Interactive Scene Content at https://github.com/BabylonJS/BabylonToolkit/tree/master/Agent/references/scene-components.md

### Babylon Toolkit Project Installation

* Always include the `babylon toolkit` dependency for Babylon.js projects
* Always install the @latest version of Babylon.js and Babylon Toolkit for **new** node.js projects.
* Use **ES6** module format for node.js projects unless specified otherwise
* Do **not** write WEB/CDN html script tags for node.js projects
* Never **overwrite** the `.github/copilot-instructions.md` or `CLAUDE.md` or `AGENTS.md`

---

**Follow these generating projects and installing packages**