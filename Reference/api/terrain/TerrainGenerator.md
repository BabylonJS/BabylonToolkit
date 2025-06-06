# TerrainGenerator

Procedural terrain generation component for creating realistic landscapes and heightmaps.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Extends**: `TOOLKIT.ScriptComponent`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

TerrainGenerator provides comprehensive terrain generation capabilities including heightmap-based terrain, procedural noise generation, texture blending, and LOD (Level of Detail) management for large-scale landscapes.

## Lifecycle Methods

### Component Lifecycle

#### `awake()`
Called when the component is first created and initialized.

#### `start()`
Called before the first frame update after the component is enabled.

#### `ready()`
Called when the component is ready and all dependencies are loaded.

#### `update()`
Called every frame during the main update loop.

#### `late()`
Called every frame during the late update phase.

#### `step()`
Called during the physics step update.

#### `fixed()`
Called during the fixed timestep update.

#### `after()`
Called after all updates are complete.

#### `destroy()`
Called when the component is being destroyed and cleaned up.

## Usage Examples

### Basic Terrain Generation
```typescript
const terrainGenerator = new TOOLKIT.TerrainGenerator(transform, scene);

terrainGenerator.awake();
terrainGenerator.start();
```

### Heightmap-Based Terrain
```typescript
class HeightmapTerrain extends TOOLKIT.TerrainGenerator {
    private terrainMesh: BABYLON.GroundMesh;
    private heightmapTexture: BABYLON.Texture;
    
    protected awake(): void {
        super.awake();
        this.loadHeightmapTerrain();
    }
    
    private async loadHeightmapTerrain(): Promise<void> {
        this.heightmapTexture = new BABYLON.Texture("./textures/heightmap.png", this.scene);
        
        const terrainOptions = {
            width: 100,
            height: 100,
            subdivisions: 100,
            minHeight: 0,
            maxHeight: 10,
            colorFilter: new BABYLON.Color3(0.3, 0.59, 0.11),
            alphaFilter: 0.0,
            updatable: false,
            onReady: (mesh: BABYLON.GroundMesh) => {
                this.terrainMesh = mesh;
                this.setupTerrainMaterial();
                this.generateCollisionMesh();
            }
        };
        
        this.terrainMesh = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
            "terrain",
            "./textures/heightmap.png",
            terrainOptions,
            this.scene
        );
    }
    
    private setupTerrainMaterial(): void {
        const terrainMaterial = new BABYLON.StandardMaterial("terrainMaterial", this.scene);
        
        const grassTexture = new BABYLON.Texture("./textures/grass.jpg", this.scene);
        grassTexture.uOffset = 0;
        grassTexture.vOffset = 0;
        grassTexture.uScale = 10;
        grassTexture.vScale = 10;
        
        terrainMaterial.diffuseTexture = grassTexture;
        terrainMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        
        this.terrainMesh.material = terrainMaterial;
    }
    
    private generateCollisionMesh(): void {
        this.terrainMesh.checkCollisions = true;
        this.terrainMesh.physicsImpostor = new BABYLON.PhysicsImpostor(
            this.terrainMesh,
            BABYLON.PhysicsImpostor.MeshImpostor,
            { mass: 0, restitution: 0.7 },
            this.scene
        );
    }
}
```

### Procedural Noise Terrain
```typescript
class ProceduralTerrain extends TOOLKIT.TerrainGenerator {
    private terrainMesh: BABYLON.Mesh;
    private noiseScale: number = 0.1;
    private amplitude: number = 5.0;
    private octaves: number = 4;
    
    protected awake(): void {
        super.awake();
        this.generateProceduralTerrain();
    }
    
    private generateProceduralTerrain(): void {
        const width = 100;
        const height = 100;
        const subdivisions = 50;
        
        const positions: number[] = [];
        const indices: number[] = [];
        const normals: number[] = [];
        const uvs: number[] = [];
        
        for (let z = 0; z <= subdivisions; z++) {
            for (let x = 0; x <= subdivisions; x++) {
                const xPos = (x / subdivisions) * width - width / 2;
                const zPos = (z / subdivisions) * height - height / 2;
                const yPos = this.generateHeight(xPos, zPos);
                
                positions.push(xPos, yPos, zPos);
                uvs.push(x / subdivisions, z / subdivisions);
            }
        }
        
        for (let z = 0; z < subdivisions; z++) {
            for (let x = 0; x < subdivisions; x++) {
                const a = x + z * (subdivisions + 1);
                const b = x + (z + 1) * (subdivisions + 1);
                const c = (x + 1) + z * (subdivisions + 1);
                const d = (x + 1) + (z + 1) * (subdivisions + 1);
                
                indices.push(a, b, c);
                indices.push(b, d, c);
            }
        }
        
        this.terrainMesh = new BABYLON.Mesh("proceduralTerrain", this.scene);
        
        const vertexData = new BABYLON.VertexData();
        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.uvs = uvs;
        
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        vertexData.normals = normals;
        
        vertexData.applyToMesh(this.terrainMesh);
        
        this.setupProceduralMaterial();
    }
    
    private generateHeight(x: number, z: number): number {
        let height = 0;
        let frequency = this.noiseScale;
        let amplitude = this.amplitude;
        
        for (let i = 0; i < this.octaves; i++) {
            height += this.noise(x * frequency, z * frequency) * amplitude;
            frequency *= 2;
            amplitude *= 0.5;
        }
        
        return height;
    }
    
    private noise(x: number, z: number): number {
        return Math.sin(x * 0.1) * Math.cos(z * 0.1) + 
               Math.sin(x * 0.05) * Math.cos(z * 0.05) * 0.5 +
               Math.random() * 0.1 - 0.05;
    }
    
    private setupProceduralMaterial(): void {
        const material = new BABYLON.StandardMaterial("proceduralMaterial", this.scene);
        
        const grassTexture = new BABYLON.Texture("./textures/grass.jpg", this.scene);
        grassTexture.uScale = 20;
        grassTexture.vScale = 20;
        
        material.diffuseTexture = grassTexture;
        material.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        
        this.terrainMesh.material = material;
    }
}
```

### Multi-Texture Terrain
```typescript
class MultiTextureTerrain extends TOOLKIT.TerrainGenerator {
    private terrainMesh: BABYLON.GroundMesh;
    private terrainMaterial: BABYLON.TerrainMaterial;
    
    protected awake(): void {
        super.awake();
        this.createMultiTextureTerrain();
    }
    
    private createMultiTextureTerrain(): void {
        this.terrainMesh = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
            "multiTextureTerrain",
            "./textures/heightmap.png",
            {
                width: 100,
                height: 100,
                subdivisions: 100,
                minHeight: 0,
                maxHeight: 15
            },
            this.scene
        );
        
        this.setupMultiTextureMaterial();
    }
    
    private setupMultiTextureMaterial(): void {
        this.terrainMaterial = new BABYLON.TerrainMaterial("terrainMaterial", this.scene);
        
        this.terrainMaterial.mixTexture = new BABYLON.Texture("./textures/mixMap.png", this.scene);
        
        this.terrainMaterial.diffuseTexture1 = new BABYLON.Texture("./textures/grass.jpg", this.scene);
        this.terrainMaterial.diffuseTexture1.uOffset = 0;
        this.terrainMaterial.diffuseTexture1.vOffset = 0;
        this.terrainMaterial.diffuseTexture1.uScale = 16;
        this.terrainMaterial.diffuseTexture1.vScale = 16;
        
        this.terrainMaterial.diffuseTexture2 = new BABYLON.Texture("./textures/rock.jpg", this.scene);
        this.terrainMaterial.diffuseTexture2.uOffset = 0;
        this.terrainMaterial.diffuseTexture2.vOffset = 0;
        this.terrainMaterial.diffuseTexture2.uScale = 16;
        this.terrainMaterial.diffuseTexture2.vScale = 16;
        
        this.terrainMaterial.diffuseTexture3 = new BABYLON.Texture("./textures/sand.jpg", this.scene);
        this.terrainMaterial.diffuseTexture3.uOffset = 0;
        this.terrainMaterial.diffuseTexture3.vOffset = 0;
        this.terrainMaterial.diffuseTexture3.uScale = 16;
        this.terrainMaterial.diffuseTexture3.vScale = 16;
        
        this.terrainMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        this.terrainMaterial.specularPower = 64;
        
        this.terrainMesh.material = this.terrainMaterial;
    }
}
```

### LOD Terrain System
```typescript
class LODTerrain extends TOOLKIT.TerrainGenerator {
    private terrainChunks: Map<string, BABYLON.Mesh> = new Map();
    private chunkSize: number = 50;
    private viewDistance: number = 200;
    private playerPosition: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    
    protected awake(): void {
        super.awake();
        this.initializeLODSystem();
    }
    
    protected update(): void {
        super.update();
        this.updateLOD();
    }
    
    private initializeLODSystem(): void {
        this.generateInitialChunks();
    }
    
    private generateInitialChunks(): void {
        const chunksPerSide = Math.ceil(this.viewDistance / this.chunkSize);
        
        for (let x = -chunksPerSide; x <= chunksPerSide; x++) {
            for (let z = -chunksPerSide; z <= chunksPerSide; z++) {
                this.generateChunk(x, z);
            }
        }
    }
    
    private generateChunk(chunkX: number, chunkZ: number): void {
        const chunkKey = `${chunkX}_${chunkZ}`;
        
        if (this.terrainChunks.has(chunkKey)) {
            return;
        }
        
        const worldX = chunkX * this.chunkSize;
        const worldZ = chunkZ * this.chunkSize;
        
        const chunk = BABYLON.MeshBuilder.CreateGround(
            `chunk_${chunkKey}`,
            {
                width: this.chunkSize,
                height: this.chunkSize,
                subdivisions: 32
            },
            this.scene
        );
        
        chunk.position.x = worldX;
        chunk.position.z = worldZ;
        
        this.applyHeightToChunk(chunk, worldX, worldZ);
        this.setupChunkMaterial(chunk);
        
        this.terrainChunks.set(chunkKey, chunk);
    }
    
    private applyHeightToChunk(chunk: BABYLON.Mesh, worldX: number, worldZ: number): void {
        const positions = chunk.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        
        if (positions) {
            for (let i = 1; i < positions.length; i += 3) {
                const x = positions[i - 1] + worldX;
                const z = positions[i + 1] + worldZ;
                positions[i] = this.generateHeight(x, z);
            }
            
            chunk.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
            chunk.createNormals(false);
        }
    }
    
    private generateHeight(x: number, z: number): number {
        return Math.sin(x * 0.01) * Math.cos(z * 0.01) * 5 +
               Math.sin(x * 0.05) * Math.cos(z * 0.05) * 2;
    }
    
    private setupChunkMaterial(chunk: BABYLON.Mesh): void {
        const material = new BABYLON.StandardMaterial(`chunkMaterial_${chunk.name}`, this.scene);
        
        const grassTexture = new BABYLON.Texture("./textures/grass.jpg", this.scene);
        grassTexture.uScale = 10;
        grassTexture.vScale = 10;
        
        material.diffuseTexture = grassTexture;
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        
        chunk.material = material;
    }
    
    private updateLOD(): void {
        const currentChunkX = Math.floor(this.playerPosition.x / this.chunkSize);
        const currentChunkZ = Math.floor(this.playerPosition.z / this.chunkSize);
        
        const chunksPerSide = Math.ceil(this.viewDistance / this.chunkSize);
        
        const chunksToKeep = new Set<string>();
        
        for (let x = currentChunkX - chunksPerSide; x <= currentChunkX + chunksPerSide; x++) {
            for (let z = currentChunkZ - chunksPerSide; z <= currentChunkZ + chunksPerSide; z++) {
                const chunkKey = `${x}_${z}`;
                chunksToKeep.add(chunkKey);
                
                if (!this.terrainChunks.has(chunkKey)) {
                    this.generateChunk(x, z);
                }
            }
        }
        
        this.terrainChunks.forEach((chunk, key) => {
            if (!chunksToKeep.has(key)) {
                chunk.dispose();
                this.terrainChunks.delete(key);
            }
        });
    }
    
    setPlayerPosition(position: BABYLON.Vector3): void {
        this.playerPosition = position.clone();
    }
}
```

## Related Classes
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
- [SceneManager](../core/SceneManager.md) - Scene management utilities
- [ShurikenParticles](../particles/ShurikenParticles.md) - Particle system for terrain effects
