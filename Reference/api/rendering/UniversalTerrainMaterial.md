# UniversalTerrainMaterial

Universal terrain material system providing advanced terrain rendering capabilities with multi-texture blending and detail mapping.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

UniversalTerrainMaterial provides a comprehensive terrain material system that supports multiple texture layers, blend maps, normal mapping, and advanced terrain rendering features. It is designed to work with large-scale terrain systems and provides efficient rendering for complex terrain surfaces.

## Properties

### Texture Layers
- **`diffuseTexture1`** `BABYLON.Texture` - First diffuse texture layer
- **`diffuseTexture2`** `BABYLON.Texture` - Second diffuse texture layer  
- **`diffuseTexture3`** `BABYLON.Texture` - Third diffuse texture layer
- **`diffuseTexture4`** `BABYLON.Texture` - Fourth diffuse texture layer

### Normal Maps
- **`normalTexture1`** `BABYLON.Texture` - Normal map for first texture layer
- **`normalTexture2`** `BABYLON.Texture` - Normal map for second texture layer
- **`normalTexture3`** `BABYLON.Texture` - Normal map for third texture layer
- **`normalTexture4`** `BABYLON.Texture` - Normal map for fourth texture layer

### Blending
- **`blendMap`** `BABYLON.Texture` - Texture controlling layer blending
- **`blendStrength`** `number` - Overall blending strength

### Scaling and Tiling
- **`textureScale1`** `number` - Tiling scale for first texture layer
- **`textureScale2`** `number` - Tiling scale for second texture layer
- **`textureScale3`** `number` - Tiling scale for third texture layer
- **`textureScale4`** `number` - Tiling scale for fourth texture layer

## Usage Examples

### Basic Terrain Material Setup
```typescript
class TerrainMaterialManager extends TOOLKIT.ScriptComponent {
    public terrainMaterial: TOOLKIT.UniversalTerrainMaterial;
    public terrainMesh: BABYLON.Mesh;

    protected start(): void {
        this.createTerrainMaterial();
        this.setupTerrainMesh();
    }

    private createTerrainMaterial(): void {
        this.terrainMaterial = new TOOLKIT.UniversalTerrainMaterial("terrainMat", this.scene);
        
        this.loadTerrainTextures();
        this.configureTerrainBlending();
    }

    private loadTerrainTextures(): void {
        const grassTexture = new BABYLON.Texture("./textures/grass.jpg", this.scene);
        const rockTexture = new BABYLON.Texture("./textures/rock.jpg", this.scene);
        const sandTexture = new BABYLON.Texture("./textures/sand.jpg", this.scene);
        const snowTexture = new BABYLON.Texture("./textures/snow.jpg", this.scene);

        this.terrainMaterial.diffuseTexture1 = grassTexture;
        this.terrainMaterial.diffuseTexture2 = rockTexture;
        this.terrainMaterial.diffuseTexture3 = sandTexture;
        this.terrainMaterial.diffuseTexture4 = snowTexture;

        this.loadNormalMaps();
    }

    private loadNormalMaps(): void {
        const grassNormal = new BABYLON.Texture("./textures/grass_normal.jpg", this.scene);
        const rockNormal = new BABYLON.Texture("./textures/rock_normal.jpg", this.scene);
        const sandNormal = new BABYLON.Texture("./textures/sand_normal.jpg", this.scene);
        const snowNormal = new BABYLON.Texture("./textures/snow_normal.jpg", this.scene);

        this.terrainMaterial.normalTexture1 = grassNormal;
        this.terrainMaterial.normalTexture2 = rockNormal;
        this.terrainMaterial.normalTexture3 = sandNormal;
        this.terrainMaterial.normalTexture4 = snowNormal;
    }

    private configureTerrainBlending(): void {
        const blendMap = new BABYLON.Texture("./textures/terrain_blend.png", this.scene);
        this.terrainMaterial.blendMap = blendMap;
        this.terrainMaterial.blendStrength = 1.0;

        this.terrainMaterial.textureScale1 = 16;
        this.terrainMaterial.textureScale2 = 8;
        this.terrainMaterial.textureScale3 = 12;
        this.terrainMaterial.textureScale4 = 4;
    }

    private setupTerrainMesh(): void {
        this.terrainMesh = BABYLON.MeshBuilder.CreateGround("terrain", {
            width: 100,
            height: 100,
            subdivisions: 64
        }, this.scene);

        this.terrainMesh.material = this.terrainMaterial;
    }
}
```

## Best Practices

1. **Texture Resolution** - Use consistent texture resolutions for all layers to avoid quality mismatches
2. **Blend Map Design** - Create blend maps with clear channel separation for predictable blending
3. **Texture Scaling** - Adjust texture scales to achieve realistic surface detail without repetition
4. **Memory Management** - Dispose of unused textures to prevent memory leaks
5. **Performance** - Use appropriate texture compression and mipmapping for optimal performance
6. **Normal Maps** - Ensure normal maps are properly authored for consistent lighting

## Related Classes
- [UniversalTerrainMaterialPlugin](UniversalTerrainMaterialPlugin.md) - Terrain material plugin
- [TerrainGenerator](../terrain/TerrainGenerator.md) - Procedural terrain generation
- [SceneManager](../core/SceneManager.md) - Main scene management class
