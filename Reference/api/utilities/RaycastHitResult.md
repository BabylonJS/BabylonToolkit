# RaycastHitResult

Raycast result container that holds information about ray intersection tests including hit points, normals, and distance data.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

RaycastHitResult provides a comprehensive data structure for storing raycast intersection results. It contains detailed information about ray hits including collision points, surface normals, distances, and the objects that were hit.

## Properties

### Hit Information
- **`hit`** `boolean` - Whether the ray hit an object
- **`distance`** `number` - Distance from ray origin to hit point
- **`point`** `BABYLON.Vector3` - World position of the hit point
- **`normal`** `BABYLON.Vector3` - Surface normal at the hit point

### Object Information
- **`pickedMesh`** `BABYLON.AbstractMesh` - The mesh that was hit by the ray
- **`pickedPoint`** `BABYLON.Vector3` - Local coordinates of the hit point
- **`faceId`** `number` - Index of the face that was hit
- **`subMeshId`** `number` - Index of the submesh that was hit

### Ray Information
- **`ray`** `BABYLON.Ray` - The ray that was cast
- **`originMesh`** `BABYLON.AbstractMesh` - The mesh from which the ray originated

## Usage Examples

### Basic Raycast Hit Detection
```typescript
class RaycastHitDetection extends TOOLKIT.ScriptComponent {
    protected update(): void {
        this.performRaycast();
    }

    private performRaycast(): void {
        const origin = this.transform.position;
        const direction = this.transform.forward;
        const ray = new BABYLON.Ray(origin, direction);

        const hitResult = this.castRay(ray);
        if (hitResult.hit) {
            this.processHit(hitResult);
        }
    }

    private castRay(ray: BABYLON.Ray): TOOLKIT.RaycastHitResult {
        const hitResult = new TOOLKIT.RaycastHitResult();
        const pickInfo = this.scene.pickWithRay(ray);

        if (pickInfo && pickInfo.hit) {
            hitResult.hit = true;
            hitResult.distance = pickInfo.distance;
            hitResult.point = pickInfo.pickedPoint;
            hitResult.normal = pickInfo.getNormal();
            hitResult.pickedMesh = pickInfo.pickedMesh;
            hitResult.faceId = pickInfo.faceId;
            hitResult.ray = ray;
        } else {
            hitResult.hit = false;
        }

        return hitResult;
    }

    private processHit(hitResult: TOOLKIT.RaycastHitResult): void {
        console.log(`Hit detected at distance: ${hitResult.distance}`);
        console.log(`Hit point: ${hitResult.point}`);
        console.log(`Hit mesh: ${hitResult.pickedMesh.name}`);
    }
}
```

### Advanced Raycast Analysis
```typescript
class AdvancedRaycastAnalysis extends TOOLKIT.ScriptComponent {
    public maxRayDistance: number = 100;
    public raycastLayers: string[] = ["ground", "walls", "objects"];

    protected start(): void {
        this.setupRaycastSystem();
    }

    private setupRaycastSystem(): void {
        console.log("Raycast analysis system initialized");
    }

    public performMultipleRaycasts(origin: BABYLON.Vector3, directions: BABYLON.Vector3[]): TOOLKIT.RaycastHitResult[] {
        const results: TOOLKIT.RaycastHitResult[] = [];

        directions.forEach((direction, index) => {
            const ray = new BABYLON.Ray(origin, direction, this.maxRayDistance);
            const hitResult = this.performDetailedRaycast(ray);
            results.push(hitResult);
        });

        return results;
    }

    private performDetailedRaycast(ray: BABYLON.Ray): TOOLKIT.RaycastHitResult {
        const hitResult = new TOOLKIT.RaycastHitResult();
        const pickInfo = this.scene.pickWithRay(ray);

        hitResult.ray = ray;

        if (pickInfo && pickInfo.hit) {
            hitResult.hit = true;
            hitResult.distance = pickInfo.distance;
            hitResult.point = pickInfo.pickedPoint;
            hitResult.normal = pickInfo.getNormal();
            hitResult.pickedMesh = pickInfo.pickedMesh;
            hitResult.pickedPoint = pickInfo.pickedPoint;
            hitResult.faceId = pickInfo.faceId;
            hitResult.subMeshId = pickInfo.subMeshId;

            this.analyzeHitSurface(hitResult);
        } else {
            hitResult.hit = false;
            hitResult.distance = this.maxRayDistance;
        }

        return hitResult;
    }

    private analyzeHitSurface(hitResult: TOOLKIT.RaycastHitResult): void {
        if (hitResult.normal) {
            const surfaceAngle = BABYLON.Vector3.Dot(hitResult.normal, BABYLON.Vector3.Up());
            const isFloor = surfaceAngle > 0.7;
            const isWall = Math.abs(surfaceAngle) < 0.3;
            const isCeiling = surfaceAngle < -0.7;

            console.log(`Surface analysis - Floor: ${isFloor}, Wall: ${isWall}, Ceiling: ${isCeiling}`);
        }
    }

    public getClosestHit(hitResults: TOOLKIT.RaycastHitResult[]): TOOLKIT.RaycastHitResult | null {
        const validHits = hitResults.filter(result => result.hit);
        
        if (validHits.length === 0) {
            return null;
        }

        return validHits.reduce((closest, current) => {
            return current.distance < closest.distance ? current : closest;
        });
    }

    public filterHitsByDistance(hitResults: TOOLKIT.RaycastHitResult[], maxDistance: number): TOOLKIT.RaycastHitResult[] {
        return hitResults.filter(result => result.hit && result.distance <= maxDistance);
    }

    public getHitsByMeshName(hitResults: TOOLKIT.RaycastHitResult[], meshName: string): TOOLKIT.RaycastHitResult[] {
        return hitResults.filter(result => 
            result.hit && result.pickedMesh && result.pickedMesh.name === meshName
        );
    }
}
```

## Best Practices

1. **Result Validation** - Always check the hit property before using other result data
2. **Distance Limits** - Set appropriate maximum ray distances to avoid unnecessary calculations
3. **Normal Usage** - Use surface normals for realistic physics and visual effects
4. **Performance** - Cache raycast results when possible to avoid redundant calculations
5. **Layer Filtering** - Use mesh filtering to raycast against specific object types
6. **Memory Management** - Reuse RaycastHitResult instances when performing frequent raycasts

## Related Classes
- [TriggerVolume](TriggerVolume.md) - Trigger volume detection
- [RigidbodyPhysics](../physics/RigidbodyPhysics.md) - Physics system
- [SceneManager](../core/SceneManager.md) - Main scene management class
