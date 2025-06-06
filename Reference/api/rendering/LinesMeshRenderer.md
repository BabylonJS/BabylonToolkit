# LinesMeshRenderer

Line mesh rendering utilities for creating and managing line-based visualizations and debug graphics.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

LinesMeshRenderer provides utilities for creating and rendering line-based meshes, including debug visualizations, wireframes, path displays, and geometric line graphics. It supports various line rendering modes and styling options.

## Static Methods

### Line Creation

#### `CreateLines(points, scene, options?)`
Creates a lines mesh from an array of points.

**Parameters:**
- `points` `BABYLON.Vector3[]` - Array of points defining the line path
- `scene` `BABYLON.Scene` - The scene to create the lines in
- `options?` `any` - Optional configuration for line appearance

**Returns:** `BABYLON.LinesMesh` - The created lines mesh

#### `CreateDashedLines(points, scene, dashSize?, gapSize?)`
Creates a dashed lines mesh with customizable dash and gap sizes.

**Parameters:**
- `points` `BABYLON.Vector3[]` - Array of points defining the line path
- `scene` `BABYLON.Scene` - The scene to create the lines in
- `dashSize?` `number` - Length of each dash (optional)
- `gapSize?` `number` - Length of each gap (optional)

**Returns:** `BABYLON.LinesMesh` - The created dashed lines mesh

### Debug Visualization

#### `CreateBoundingBoxLines(mesh, scene, color?)`
Creates line visualization for a mesh's bounding box.

**Parameters:**
- `mesh` `BABYLON.AbstractMesh` - The mesh to visualize
- `scene` `BABYLON.Scene` - The scene to create the lines in
- `color?` `BABYLON.Color3` - Optional color for the lines

**Returns:** `BABYLON.LinesMesh` - The bounding box lines mesh

#### `CreateWireframe(mesh, scene, color?)`
Creates a wireframe representation of a mesh.

**Parameters:**
- `mesh` `BABYLON.AbstractMesh` - The mesh to create wireframe for
- `scene` `BABYLON.Scene` - The scene to create the wireframe in
- `color?` `BABYLON.Color3` - Optional color for the wireframe

**Returns:** `BABYLON.LinesMesh` - The wireframe lines mesh

### Path Visualization

#### `CreatePath(waypoints, scene, smooth?)`
Creates a path visualization from waypoints.

**Parameters:**
- `waypoints` `BABYLON.Vector3[]` - Array of waypoint positions
- `scene` `BABYLON.Scene` - The scene to create the path in
- `smooth?` `boolean` - Whether to smooth the path (optional)

**Returns:** `BABYLON.LinesMesh` - The path lines mesh

#### `CreateGrid(size, divisions, scene, color?)`
Creates a grid of lines for reference or debugging.

**Parameters:**
- `size` `number` - Size of the grid
- `divisions` `number` - Number of divisions in the grid
- `scene` `BABYLON.Scene` - The scene to create the grid in
- `color?` `BABYLON.Color3` - Optional color for the grid lines

**Returns:** `BABYLON.LinesMesh` - The grid lines mesh

## Usage Examples

### Basic Line Rendering
```typescript
class LineRenderingExample extends TOOLKIT.ScriptComponent {
    public lineMeshes: BABYLON.LinesMesh[] = [];

    protected start(): void {
        this.createBasicLines();
        this.createDashedLines();
        this.createDebugVisualization();
    }

    private createBasicLines(): void {
        const points = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(5, 2, 0),
            new BABYLON.Vector3(10, 0, 5),
            new BABYLON.Vector3(15, 3, 10)
        ];

        const linesMesh = TOOLKIT.LinesMeshRenderer.CreateLines(points, this.scene, {
            color: new BABYLON.Color3(1, 0, 0)
        });

        this.lineMeshes.push(linesMesh);
        console.log("Basic lines created");
    }

    private createDashedLines(): void {
        const points = [
            new BABYLON.Vector3(-5, 0, 0),
            new BABYLON.Vector3(-5, 5, 0),
            new BABYLON.Vector3(0, 5, 0),
            new BABYLON.Vector3(0, 10, 0)
        ];

        const dashedLines = TOOLKIT.LinesMeshRenderer.CreateDashedLines(
            points, 
            this.scene, 
            0.5, 
            0.3
        );

        this.lineMeshes.push(dashedLines);
        console.log("Dashed lines created");
    }

    private createDebugVisualization(): void {
        const box = BABYLON.MeshBuilder.CreateBox("debugBox", { size: 2 }, this.scene);
        box.position.x = 5;

        const boundingBoxLines = TOOLKIT.LinesMeshRenderer.CreateBoundingBoxLines(
            box, 
            this.scene, 
            new BABYLON.Color3(0, 1, 0)
        );

        const wireframe = TOOLKIT.LinesMeshRenderer.CreateWireframe(
            box, 
            this.scene, 
            new BABYLON.Color3(0, 0, 1)
        );

        this.lineMeshes.push(boundingBoxLines, wireframe);
        console.log("Debug visualization created");
    }
}
```

### Path and Grid Visualization
```typescript
class PathGridVisualization extends TOOLKIT.ScriptComponent {
    public pathLines: BABYLON.LinesMesh;
    public gridLines: BABYLON.LinesMesh;
    public waypoints: BABYLON.Vector3[] = [];

    protected start(): void {
        this.createNavigationGrid();
        this.createWaypointPath();
    }

    private createNavigationGrid(): void {
        this.gridLines = TOOLKIT.LinesMeshRenderer.CreateGrid(
            50, 
            10, 
            this.scene, 
            new BABYLON.Color3(0.3, 0.3, 0.3)
        );

        console.log("Navigation grid created");
    }

    private createWaypointPath(): void {
        this.waypoints = [
            new BABYLON.Vector3(-20, 0, -20),
            new BABYLON.Vector3(-10, 0, -15),
            new BABYLON.Vector3(0, 0, -10),
            new BABYLON.Vector3(10, 0, -5),
            new BABYLON.Vector3(20, 0, 0),
            new BABYLON.Vector3(15, 0, 10),
            new BABYLON.Vector3(5, 0, 15),
            new BABYLON.Vector3(-5, 0, 20)
        ];

        this.pathLines = TOOLKIT.LinesMeshRenderer.CreatePath(
            this.waypoints, 
            this.scene, 
            true
        );

        this.pathLines.color = new BABYLON.Color3(1, 1, 0);
        console.log("Waypoint path created");
    }

    protected update(): void {
        this.animatePath();
    }

    private animatePath(): void {
        const time = Date.now() * 0.001;
        const offset = Math.sin(time) * 2;
        
        const animatedWaypoints = this.waypoints.map((point, index) => {
            return new BABYLON.Vector3(
                point.x,
                point.y + Math.sin(time + index * 0.5) * offset,
                point.z
            );
        });

        this.pathLines.dispose();
        this.pathLines = TOOLKIT.LinesMeshRenderer.CreatePath(
            animatedWaypoints, 
            this.scene, 
            true
        );
        this.pathLines.color = new BABYLON.Color3(1, 1, 0);
    }
}
```

### Advanced Line Rendering System
```typescript
class AdvancedLineRenderingSystem extends TOOLKIT.ScriptComponent {
    public lineSystem: Map<string, BABYLON.LinesMesh> = new Map();
    public debugMode: boolean = true;

    protected start(): void {
        this.setupAdvancedLineSystem();
    }

    private setupAdvancedLineSystem(): void {
        this.createCoordinateAxes();
        this.createMeasurementLines();
        this.createConnectionLines();
    }

    private createCoordinateAxes(): void {
        const axisLength = 10;
        
        const xAxisPoints = [
            BABYLON.Vector3.Zero(),
            new BABYLON.Vector3(axisLength, 0, 0)
        ];
        const xAxis = TOOLKIT.LinesMeshRenderer.CreateLines(xAxisPoints, this.scene);
        xAxis.color = new BABYLON.Color3(1, 0, 0);
        this.lineSystem.set("xAxis", xAxis);

        const yAxisPoints = [
            BABYLON.Vector3.Zero(),
            new BABYLON.Vector3(0, axisLength, 0)
        ];
        const yAxis = TOOLKIT.LinesMeshRenderer.CreateLines(yAxisPoints, this.scene);
        yAxis.color = new BABYLON.Color3(0, 1, 0);
        this.lineSystem.set("yAxis", yAxis);

        const zAxisPoints = [
            BABYLON.Vector3.Zero(),
            new BABYLON.Vector3(0, 0, axisLength)
        ];
        const zAxis = TOOLKIT.LinesMeshRenderer.CreateLines(zAxisPoints, this.scene);
        zAxis.color = new BABYLON.Color3(0, 0, 1);
        this.lineSystem.set("zAxis", zAxis);

        console.log("Coordinate axes created");
    }

    private createMeasurementLines(): void {
        const measurementPoints = [
            new BABYLON.Vector3(5, 0, 5),
            new BABYLON.Vector3(5, 5, 5),
            new BABYLON.Vector3(10, 5, 5),
            new BABYLON.Vector3(10, 0, 5)
        ];

        const measurementLines = TOOLKIT.LinesMeshRenderer.CreateDashedLines(
            measurementPoints, 
            this.scene, 
            0.2, 
            0.1
        );
        measurementLines.color = new BABYLON.Color3(1, 0.5, 0);
        this.lineSystem.set("measurements", measurementLines);

        console.log("Measurement lines created");
    }

    private createConnectionLines(): void {
        const objects = [
            new BABYLON.Vector3(-5, 2, -5),
            new BABYLON.Vector3(5, 3, -5),
            new BABYLON.Vector3(5, 1, 5),
            new BABYLON.Vector3(-5, 4, 5)
        ];

        for (let i = 0; i < objects.length; i++) {
            for (let j = i + 1; j < objects.length; j++) {
                const connectionPoints = [objects[i], objects[j]];
                const connectionLine = TOOLKIT.LinesMeshRenderer.CreateLines(
                    connectionPoints, 
                    this.scene
                );
                connectionLine.color = new BABYLON.Color3(0.5, 0.5, 1);
                this.lineSystem.set(`connection_${i}_${j}`, connectionLine);
            }
        }

        console.log("Connection lines created");
    }

    public toggleDebugMode(): void {
        this.debugMode = !this.debugMode;
        
        this.lineSystem.forEach((lineMesh) => {
            lineMesh.setEnabled(this.debugMode);
        });

        console.log(`Debug mode: ${this.debugMode ? "enabled" : "disabled"}`);
    }

    public addCustomLine(name: string, points: BABYLON.Vector3[], color?: BABYLON.Color3): void {
        if (this.lineSystem.has(name)) {
            this.lineSystem.get(name)!.dispose();
        }

        const lineMesh = TOOLKIT.LinesMeshRenderer.CreateLines(points, this.scene);
        if (color) {
            lineMesh.color = color;
        }

        this.lineSystem.set(name, lineMesh);
        console.log(`Custom line '${name}' added`);
    }

    public removeCustomLine(name: string): void {
        const lineMesh = this.lineSystem.get(name);
        if (lineMesh) {
            lineMesh.dispose();
            this.lineSystem.delete(name);
            console.log(`Custom line '${name}' removed`);
        }
    }

    public clearAllLines(): void {
        this.lineSystem.forEach((lineMesh) => {
            lineMesh.dispose();
        });
        this.lineSystem.clear();
        console.log("All lines cleared");
    }

    protected destroy(): void {
        this.clearAllLines();
    }
}
```

## Best Practices

1. **Performance** - Use lines sparingly in performance-critical applications
2. **Color Coding** - Use consistent color schemes for different types of lines
3. **Line Width** - Consider line visibility at different camera distances
4. **Memory Management** - Dispose of unused line meshes to prevent memory leaks
5. **Debug Toggle** - Provide easy ways to toggle debug line visibility
6. **Smooth Paths** - Use path smoothing for better visual quality when appropriate

## Related Classes
- [UniversalTerrainMaterial](UniversalTerrainMaterial.md) - Terrain material system
- [NavigationAgent](../navigation/NavigationAgent.md) - Navigation system
- [SceneManager](../core/SceneManager.md) - Main scene management class
