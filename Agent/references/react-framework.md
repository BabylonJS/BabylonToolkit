# Babylon Toolkit React Framework (1.0.0)

This `agentic react framework submodule` allows easy intergration of the interactive scene content. The framework supports using the <BabylonSceneViewer> html tag directly or unified router navigation. The scene view is driven by the game mode. Every scene has a game mode, if you dont specify a game mode, the `DefaultGameMode` will be used.

### Node Package Installation Requirements

These packages are `REQUIRED` by the react framework submodule. If they are NOT installed in project `package.json`, please install them.

```bash
npm install @babylonjs/core @babylonjs/gui @babylonjs/loaders @babylonjs/materials @babylonjs/inspector @babylonjs/havok @babylonjs-toolkit/next @babylonjs-toolkit/dlc
```
Note: esbuild 0.28.0 or greater is required.

### Recommended Configuration Snippets 

* Recommended tsconfig.json settings
```
{
  "compilerOptions": {
    "skipLibCheck": true,
    "noImplicitAny": false,
    "esModuleInterop": true,
    "strictNullChecks": false,
    "allowSyntheticDefaultImports": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": false,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
}
```

* Recommended eslint.config settings
```
  {
    rules: {
      "no-var": "off",
      "no-empty": "off",
      "no-unused-vars": "off",
      "no-useless-assignment": "off",
      "prefer-const": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-useless-assignment": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
```

* Recommended vite.config settings
```
import type { Connect } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/", // Ensures assets are correctly referenced
  build: {
    emptyOutDir: true,
    copyPublicDir: true,
    minify: "esbuild",
    target: "esnext",
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
        inlineDynamicImports: false,
        manualChunks(id) {
          // IMPORTANT: Keep all Babylon code in one chunk to ensure the library files are correctly referenced 
          if (id.includes("@babylonjs") || id.includes("@babylonjs-toolkit")) {
            return "babylon";
          }
        },
      }
    }
  },
  esbuild: {
    supported: {
        "top-level-await": true // Browsers can handle top-level-await features
    },
    treeShaking: mode === 'production',
    minifySyntax: mode === 'production', 
    minifyIdentifiers: mode === 'production',
    minifyWhitespace: mode === 'production',
  },
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
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    fs: {
      allow: [".."]
    },
    middlewareMode: false,
    open: true, // Automatically open the browser
    port: 8080, // Default port for the development server
  },
  plugins: [
    react(),
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          next();
        });
      },
      configurePreviewServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          next();
        });
      }
    },
    {
      name: "wasm-content-type-plugin",
      configureServer(server) {
        server.middlewares.use((req: Connect.IncomingMessage, res, next) => {
          if (req.originalUrl && req.originalUrl.endsWith(".wasm")) {
            res.setHeader("Content-Type", "application/wasm");
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req: Connect.IncomingMessage, res, next) => {
          if (req.originalUrl && req.originalUrl.endsWith(".wasm")) {
            res.setHeader("Content-Type", "application/wasm");
          }
          next();
        });
      }
    },
    {
      name: "gzip-response-headers",
      configureServer(server) {
        server.middlewares.use((req: Connect.IncomingMessage, res, next) => {
          if (req.originalUrl && req.originalUrl.includes(".gz.")) {
            res.setHeader("Content-Encoding", "gzip");
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req: Connect.IncomingMessage, res, next) => {
          if (req.originalUrl && req.originalUrl.includes(".gz.")) {
            res.setHeader("Content-Encoding", "gzip");
          }
          next();
        });
      }
    },
    {
      name: "gltf-content-type-plugin",
      configureServer(server) {
        server.middlewares.use((req: Connect.IncomingMessage, res, next) => {
          if (req.originalUrl) {
            if (req.originalUrl.endsWith(".gltf") || req.originalUrl.endsWith(".gz.gltf")) {
              res.setHeader("Content-Type", "model/gltf+json");
              res.setHeader("Access-Control-Allow-Origin", "*");
              res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
              res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
            } else if (req.originalUrl.endsWith(".glb") || req.originalUrl.endsWith(".gz.glb")) {
              res.setHeader("Content-Type", "model/gltf-binary");
              res.setHeader("Access-Control-Allow-Origin", "*");
              res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
              res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
            } else if (req.originalUrl.endsWith(".bin") || req.originalUrl.endsWith(".gz.bin")) {
              res.setHeader("Content-Type", "application/octet-stream");
              res.setHeader("Access-Control-Allow-Origin", "*");
            }
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req: Connect.IncomingMessage, res, next) => {
          if (req.originalUrl) {
            if (req.originalUrl.endsWith(".gltf") || req.originalUrl.endsWith(".gz.gltf")) {
              res.setHeader("Content-Type", "model/gltf+json");
              res.setHeader("Access-Control-Allow-Origin", "*");
              res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
              res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
            } else if (req.originalUrl.endsWith(".glb") || req.originalUrl.endsWith(".gz.glb")) {
              res.setHeader("Content-Type", "model/gltf-binary");
              res.setHeader("Access-Control-Allow-Origin", "*");
              res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
              res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
            } else if (req.originalUrl.endsWith(".bin") || req.originalUrl.endsWith(".gz.bin")) {
              res.setHeader("Content-Type", "application/octet-stream");
              res.setHeader("Access-Control-Allow-Origin", "*");
            }
          }
          next();
        });
      }
    }
  ]
}))
```

### Babylon Toolkit React Framework Submodule

To add submodule:
```
git submodule add https://github.com/babylontoolkit/ReactFramework.git src/babylon
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

## React Framework Submodule Project Installation Config

* Always copy the `src/babylon/assets/babylon.png` and `src/babylon/assets/spinner.png` images to the project `public` folder. They must exist in the application root folder.

* Apply recommended vite.config and eslint.config suggestions

## React Framework Platform Router Navigation Performance

To help on unwanted page delays DO NOT using `GameManager` in react ui components to prevent the DOM from having to load babylon runtime libraries that get loaded as side effects from importing the `GameManger`. The `GameManager.NavigateTo` is safe to use from game code like game mode controllers and other script components. Use the native useNavigate from react ui framework code.

Example `Play Demo` button handler:
```
const handlePlayDemo = () => {
  navigate('/play', {
    state: {
      fromApp: true,
      gameMode: 'PlayerControllerDemo',
      sceneUrl: 'https://repo.babylontoolkit.com/playground/samplescene.gltf',
    },
  });
};
```

* Important: Remember to always use the native useNavigate from react ui framework and `GameManager.NavigateTo` is to be used from the game code script component classes.

## Project React Framework Update Script

Please create this script and command to package.json scripts:
```
"update-babylon": "node tools/update-babylon.cjs"
```

tools/update-babylon.cjs
```
#!/usr/bin/env node

const { spawnSync } = require("child_process");
const readline = require("readline");
const fs = require("fs");
const path = require("path");

const SUBMODULE_URL = "https://github.com/babylontoolkit/ReactFramework.git";
const SUBMODULE_PATH = "src/babylon";

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

function run(command, args, allowFailure = false) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0 && !allowFailure) {
    process.exit(result.status || 1);
  }

  return result.status === 0;
}

function runText(command, args) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    return null;
  }

  return result.stdout.trim();
}

function getGitCommonDir() {
  return runText("git", ["rev-parse", "--git-common-dir"]) || ".git";
}

async function main() {
  const answer = await ask(
    "Overwrite Babylon Toolkit submodule at src/babylon? [y/N] "
  );

  if (answer !== "y" && answer !== "yes") {
    console.log("Cancelled.");
    return;
  }

  const gitCommonDir = getGitCommonDir();
  const gitModulePath = path.join(gitCommonDir, "modules", "src", "babylon");

  console.log("\nRemoving existing Babylon Toolkit submodule...\n");

  // These cleanup steps intentionally continue even if any individual command fails.
  run("git", ["submodule", "deinit", "-f", SUBMODULE_PATH], true);
  run("git", ["rm", "-f", SUBMODULE_PATH], true);

  fs.rmSync(gitModulePath, { recursive: true, force: true });
  fs.rmSync(SUBMODULE_PATH, { recursive: true, force: true });

  console.log("\nInstalling clean Babylon Toolkit submodule...\n");

  run("git", ["submodule", "add", SUBMODULE_URL, SUBMODULE_PATH]);
  run("git", ["add", ".gitmodules", SUBMODULE_PATH]);
  run("git", ["commit", "-m", "Update Babylon Toolkit submodule"]);

  console.log("\nBabylon Toolkit submodule updated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

NEXT.JS - Please create this script and command to package.json scripts:
```
"update-babylon": "node tools/update-babylon.cjs"
```


tools/open-browser.cjs
```
#!/usr/bin/env node
// Dev launcher: starts Next.js on port 8080 and auto-opens the browser,
// equivalent to Vite's server.open + server.port options.

const { spawn } = require("child_process");
const http = require("http");

const PORT = 8080;
const URL = `http://localhost:${PORT}`;

// Start Next.js dev server
const proc = spawn(
  process.platform === "win32" ? "npm.cmd" : "npm",
  ["run", "dev"],
  { stdio: "inherit", shell: false }
);

proc.on("error", (err) => {
  console.error("Failed to start dev server:", err);
  process.exit(1);
});

// Poll until the server responds, then open the browser once
function waitAndOpen(retries = 40) {
  http
    .get(URL, () => {
      const cmd =
        process.platform === "darwin"
          ? "open"
          : process.platform === "win32"
          ? "start"
          : "xdg-open";
      spawn(cmd, [URL], { shell: process.platform === "win32", detached: true, stdio: "ignore" }).unref();
      console.log(`\nOpened browser at ${URL}\n`);
    })
    .on("error", () => {
      if (retries > 0) {
        setTimeout(() => waitAndOpen(retries - 1), 500);
      }
    });
}

// Give the server a moment to start before polling
setTimeout(() => waitAndOpen(), 1500);
```

## Vite + React + Typescript Template

Template was created using standard npm command. Then updated for `Babylon Toolkit React Framework` support
```
npm create vite@latest my-app -- --template react-ts
```

src/app.tsx
```
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { DefaultBabylonPreloader, babylonLogo } from './babylon/custom/loading';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './app.css'

// Note: All babylon imports stay inside the PlayRoute lazy load chunk
const PlayRoute = lazy(() => import('./routing/router'));

function Home() {
  const navigate = useNavigate();
  const handlePlayerDemo = () => {
    /* Use Native Navigation API to prevent ANY BABYLON CODE from being included in the main bundle.
     * This ensures that Babylon and all related dependencies are only loaded when the user clicks "Player Demo", optimizing initial load performance.
     * Game code should use game manager, for example:
     * GameManager.NavigateTo("/play", {
     *     gameMode: "PlayerControllerDemo",
     *     sceneUrl: GameManager.PlaygroundRepo + "samplescene.gltf",
     * });
     */
    navigate('/play', {
      state: {
        fromApp: true,
        gameMode: 'PlayerControllerDemo',
        sceneUrl: 'https://dlyp4oy8lme1v.cloudfront.net/playground/samplescene.gltf'
      },
    });
  };
  const handleVehicleDemo = () => {
    /* Use Native Navigation API to prevent ANY BABYLON CODE from being included in the main bundle.
     * This ensures that Babylon and all related dependencies are only loaded when the user clicks "Vehicle Demo", optimizing initial load performance.
     * Game code should use game manager, for example:
     * GameManager.NavigateTo("/play", {
     *     gameMode: "VehicleControllerDemo",
     *     sceneUrl: GameManager.PlaygroundRepo + "openterrain.gltf",
     * });
     */
    navigate('/play', {
      state: {
        fromApp: true,
        gameMode: 'VehicleControllerDemo',
        sceneUrl: 'https://dlyp4oy8lme1v.cloudfront.net/playground/openterrain.gltf'
      },
    });
  };

  return (
    <div id="vite">
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
          <div>
            <a href="https://babylonjs.com" target="_blank">
              <img src={babylonLogo} className="logo babylon" alt="Babylon logo" />
            </a>
          </div>
        </div>
        <div>
          <h1>React + Vite + BabylonJS</h1>
        </div>
          <button type="button" className="counter" onClick={handlePlayerDemo}>Player Demo</button>&nbsp;&nbsp;<button type="button" className="counter" onClick={handleVehicleDemo}>Vehicle Demo</button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://raw.githubusercontent.com/BabylonJS/BabylonToolkit/master/Agent/references/react-framework.md" target="_blank">
                <img className="logo" src={babylonLogo} alt="" />
                Babylon Toolkit
              </a>
            </li>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn More
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
      <div>
        <small><a href="https://www.babylontoolkit.com" target="_blank">Babylon Toolkit Game Development</a></small>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={
          <Suspense fallback={<DefaultBabylonPreloader />}>
            <PlayRoute />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

## React Router Navigation Adapter

src/rounting/router.tsx
```
'use client';

import BabylonSceneViewer from '../babylon/system/babylon';
import ApplicationRoute from '../babylon/system/routing';
import { ReactRouterNavAdapter } from "./adpter";

export default function PlayRoute() {
  return (
    <ReactRouterNavAdapter>
      <ApplicationRoute allowDevMode={true}>
        <BabylonSceneViewer
          fullPage={true}
          allowQueryParams={true}
          enableCustomOverlay={false}
        />
      </ApplicationRoute>
    </ReactRouterNavAdapter>
  );
}
```

src/rounting/adapter.tsx
```
'use client';

/*
 * =================================================================
 * Host Navigation Adapter - React Router DOM
 * =================================================================
 * Bridges react-router-dom hooks into the babylon toolkit's
 * UnifiedNavigation context. Replace this file (or pick a different
 * adapter) when porting to TanStack Router, Next.js, etc.
 * =================================================================
 */

import { createElement, ReactNode, useCallback, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavigationProvider, UnifiedNavigateFunction, LocationState, NavigationState } from "../babylon/system/platform";
import GameManager from "../babylon/globals";

export function ReactRouterNavAdapter({ children }: { children: ReactNode }) {
  const rrNavigate = useNavigate();
  const rrLocation = useLocation();

  const navigate: UnifiedNavigateFunction = useCallback(
    (path, options) => {
      rrNavigate(path, { state: options?.state, replace: options?.replace });
    },
    [rrNavigate]
  );

  // Note: Register the navigation hook globally so GameManager.NavigateTo works on
  // every page, even before the Babylon runtime has initialized. ReactRouterNavAdapter
  // wraps the whole app (inside BrowserRouter) and already owns the navigate function.
  useEffect(() => {
    GameManager.SetReactNavigationHook(navigate);
    return () => GameManager.DeleteReactNavigationHook();
  }, [navigate]);

  const location: LocationState = useMemo(
    () => ({
      pathname: rrLocation.pathname,
      search: rrLocation.search,
      state: rrLocation.state as NavigationState | undefined,
    }),
    [rrLocation]
  );

  const value = useMemo(() => ({ navigate, location }), [navigate, location]);

  return createElement(NavigationProvider, { value }, children);
}
```

# Full Stack Server React Framework (NEXT.JS)

Template was created using standard npx command. Then updated for `Babylon Toolkit React Framework` support. Always prefer NEXT.JS Version 16 or greater.
```
npx create-next-app@latest my-next-app --typescript
```

## Application Layout

app/layout.tsx
```
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { NextNavAdapter } from "./adapter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <NextNavAdapter>{children}</NextNavAdapter>
        </Suspense>
      </body>
    </html>
  );
}

```

## React Router Navigation Adapter

app/adapter.tsx
```
'use client';

/*
 * =================================================================
 * Host Navigation Adapter - Next.js (App Router)
 * =================================================================
 * Bridges next/navigation hooks into the babylon toolkit's
 * UnifiedNavigation context.
 *
 * Note: Next.js App Router does not support history state natively
 * the way react-router-dom does. To preserve the { fromApp, ... }
 * NavigationState shape, this adapter stashes state in
 * sessionStorage keyed by pathname and rehydrates it on read.
 * =================================================================
 */

import { createElement, ReactNode, useCallback, useEffect, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { NavigationProvider, UnifiedNavigateFunction, LocationState, NavigationState } from "../src/babylon/system/platform";
import GameManager from "../src/babylon/globals";

const STATE_KEY_PREFIX = "babylon-nav-state:";

function writeState(path: string, state: NavigationState | undefined) {
  if (typeof window === "undefined") return;
  try {
    const key = STATE_KEY_PREFIX + path.split("?")[0];
    if (state) {
      window.sessionStorage.setItem(key, JSON.stringify(state));
    } else {
      window.sessionStorage.removeItem(key);
    }
  } catch {
    /* ignore */
  }
}

function readState(path: string): NavigationState | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.sessionStorage.getItem(STATE_KEY_PREFIX + path);
    return raw ? (JSON.parse(raw) as NavigationState) : undefined;
  } catch {
    return undefined;
  }
}

export function NextNavAdapter({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();

  const navigate: UnifiedNavigateFunction = useCallback(
    (path, options) => {
      writeState(path, options?.state);
      if (options?.replace) {
        router.replace(path);
      } else {
        router.push(path);
      }
    },
    [router]
  );

  // Note: Register the navigation hook globally so GameManager.NavigateTo works on
  // every page, even before the Babylon runtime has initialized. NextNavAdapter
  // wraps the whole app (in app/layout) and already owns the navigate function.
  useEffect(() => {
    GameManager.SetReactNavigationHook(navigate);
    return () => GameManager.DeleteReactNavigationHook();
  }, [navigate]);

  const search = useMemo(() => {
    const s = searchParams?.toString() ?? "";
    return s ? `?${s}` : "";
  }, [searchParams]);

  const location: LocationState = useMemo(
    () => ({
      pathname,
      search,
      state: readState(pathname),
    }),
    [pathname, search]
  );

  const value = useMemo(() => ({ navigate, location }), [navigate, location]);

  return createElement(NavigationProvider, { value }, children);
}
```

## Application Play Route

app/play/page.tsx
```
import { Suspense } from "react";
import { DefaultBabylonPreloader } from "@/src/babylon/custom/loading";
import ApplicationRoute from "@/src/babylon/system/routing";
import BabylonSceneViewer from "@/src/babylon/system/babylon";

export default function Play() {
  return (
    <Suspense fallback={<DefaultBabylonPreloader />}>
      <ApplicationRoute allowDevMode={true}>
          <BabylonSceneViewer fullPage={true} allowQueryParams={true} enableCustomOverlay={false} />
      </ApplicationRoute>
    </Suspense>
  );
}
```

## Next Configuration File

* Always prefer NEXT.JS 16 or greater which uses webpack by default. You MUST always force the use of webpack instead of turbopack for the react framework submodule to work properly.

package.json example
```
"scripts": {
  "dev": "next dev --webpack",
  "build": "next build --webpack"
}
```

next-config.js
```
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  /* config options here */
  // reactStrictMode: true, // Enable Strict Mode
  // output: "export",      // Enable Static Export

  // The src/babylon git submodule imports PNGs with plain <img src={logo}>, expecting
  // a string URL. Next.js's next-image-loader would return a StaticImageData object
  // instead, causing <img src="[object Object]">. The fix: intercept those two imports
  // before any loader runs and replace them with inline data-URI modules that export
  // the public path strings. webpack: true is set in server-classic.ts so this runs.
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /assets[/\\]babylon\.png$/,
        (res: { request: string }) => {
          res.request = "data:text/javascript,export default '/babylon.png'";
        }
      ),
      new webpack.NormalModuleReplacementPlugin(
        /assets[/\\]spinner\.png$/,
        (res: { request: string }) => {
          res.request = "data:text/javascript,export default '/spinner.png'";
        }
      )
    );
    return config;
  },
};

export default nextConfig;
```

## NEXT.JS Configuration Patches

* Recommended next.config settings
```
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  /* config options here */
  // reactStrictMode: true, // Enable Strict Mode
  // output: "export",      // Enable Static Export

  // Required for BabylonJS Havok physics (SharedArrayBuffer support)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },

  // The src/babylon git submodule imports PNGs with plain <img src={logo}>, expecting
  // a string URL. Next.js's next-image-loader would return a StaticImageData object
  // instead, causing <img src="[object Object]">. The fix: intercept those two imports
  // before any loader runs and replace them with inline data-URI modules that export
  // the public path strings. webpack: true is set in server-classic.ts so this runs.
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /assets[/\\]babylon\.png$/,
        (res: { request: string }) => {
          res.request = "data:text/javascript,export default '/babylon.png'";
        }
      ),
      new webpack.NormalModuleReplacementPlugin(
        /assets[/\\]spinner\.png$/,
        (res: { request: string }) => {
          res.request = "data:text/javascript,export default '/spinner.png'";
        }
      )
    );
    return config;
  },
};

export default nextConfig;
```

* Configure project webpack not turbopack

```
// Force webpack bundler (not Turbopack) so next.config webpack() runs and
// NormalModuleReplacementPlugin can redirect PNG imports in the babylon submodule
// to plain URL string modules. Turbopack doesn't support image file loaders.
const nextApp = next({ dev, webpack: true });
```

* Apply turbopack configuration patch to next.config (`turbopack: {}`)

```
TIP: Many applications work fine under Turbopack with no configuration,
if that is the case for you, you can silence this error by passing the
`--turbopack` or `--webpack` flag explicitly or simply setting an 
empty turbopack config in your Next config file (e.g. `turbopack: {}`).
```

* Configure project to auto open browser when starting server

# Lovable TanStack Adapter

Lovable rounter configuration example

src/routes/__root.tsx
```
import { TanStackNavAdapter } from "../router";
// ...
component: () => (
  <TanStackNavAdapter>
    <Outlet />
  </TanStackNavAdapter>
),
```

src/router.tsx
```
'use client';

/*
 * =================================================================
 * Host Navigation Adapter - TanStack Router (Lovable default)
 * =================================================================
 * Bridges @tanstack/react-router hooks into the babylon toolkit's
 * UnifiedNavigation context.
 * =================================================================
 */

import { createElement, ReactNode, useCallback, useMemo } from "react";
import { useNavigate, useLocation, useRouter } from "@tanstack/react-router";
import {
  NavigationProvider,
  UnifiedNavigateFunction,
  LocationState,
  NavigationState,
} from "../babylon/system/platform";

export function TanStackNavAdapter({ children }: { children: ReactNode }) {
  const tsNavigate = useNavigate();
  const tsLocation = useLocation();
  const router = useRouter();

  const navigate: UnifiedNavigateFunction = useCallback(
    (path, options) => {
      // TanStack Router has no first-class history `state`; stash it on
      // window.history.state via the router's history API after navigation.
      const doNav = options?.replace
        ? tsNavigate({ to: path, replace: true })
        : tsNavigate({ to: path });

      Promise.resolve(doNav).then(() => {
        if (options?.state && typeof window !== "undefined") {
          const current = window.history.state ?? {};
          window.history.replaceState(
            { ...current, usr: options.state },
            "",
            window.location.href
          );
        }
      });
    },
    [tsNavigate]
  );

  const location: LocationState = useMemo(() => {
    const histState =
      typeof window !== "undefined"
        ? (window.history.state?.usr as NavigationState | undefined)
        : undefined;
    return {
      pathname: tsLocation.pathname,
      search: tsLocation.searchStr ?? "",
      state: histState,
    };
  }, [tsLocation]);

  const value = useMemo(() => ({ navigate, location }), [navigate, location]);

  return createElement(NavigationProvider, { value }, children);
}
```

---

**Follow these rules exactly for react framework integration**