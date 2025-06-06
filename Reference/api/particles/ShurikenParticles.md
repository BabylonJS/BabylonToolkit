# ShurikenParticles

Unity-style Shuriken particle system component for advanced particle effects and simulations.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Extends**: `TOOLKIT.ScriptComponent`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

ShurikenParticles provides a comprehensive particle system similar to Unity's Shuriken particle system. It supports complex particle behaviors, emission patterns, and visual effects for creating realistic particle simulations.

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

### Basic Particle System Setup
```typescript
const particleSystem = new TOOLKIT.ShurikenParticles(transform, scene);

particleSystem.awake();
particleSystem.start();
```

### Fire Effect Particle System
```typescript
class FireParticleSystem extends TOOLKIT.ShurikenParticles {
    private fireTexture: BABYLON.Texture;
    private particleSystem: BABYLON.ParticleSystem;
    
    protected awake(): void {
        super.awake();
        this.setupFireEffect();
    }
    
    private setupFireEffect(): void {
        this.particleSystem = new BABYLON.ParticleSystem("fire", 2000, this.scene);
        
        this.fireTexture = new BABYLON.Texture("./textures/fire.png", this.scene);
        this.particleSystem.particleTexture = this.fireTexture;
        
        this.particleSystem.emitter = this.transform;
        this.particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, 0, -0.5);
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0.5);
        
        this.particleSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
        this.particleSystem.color2 = new BABYLON.Color4(1, 0, 0, 1.0);
        this.particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
        
        this.particleSystem.minSize = 0.1;
        this.particleSystem.maxSize = 0.5;
        
        this.particleSystem.minLifeTime = 0.3;
        this.particleSystem.maxLifeTime = 1.5;
        
        this.particleSystem.emitRate = 1500;
        
        this.particleSystem.direction1 = new BABYLON.Vector3(-0.5, 1, -0.5);
        this.particleSystem.direction2 = new BABYLON.Vector3(0.5, 1, 0.5);
        
        this.particleSystem.minEmitPower = 1;
        this.particleSystem.maxEmitPower = 3;
        this.particleSystem.updateSpeed = 0.005;
        
        this.particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
        
        this.particleSystem.start();
    }
    
    protected update(): void {
        super.update();
    }
    
    protected destroy(): void {
        if (this.particleSystem) {
            this.particleSystem.dispose();
        }
        if (this.fireTexture) {
            this.fireTexture.dispose();
        }
        super.destroy();
    }
}
```

### Smoke Effect Particle System
```typescript
class SmokeParticleSystem extends TOOLKIT.ShurikenParticles {
    private smokeTexture: BABYLON.Texture;
    private particleSystem: BABYLON.ParticleSystem;
    
    protected awake(): void {
        super.awake();
        this.setupSmokeEffect();
    }
    
    private setupSmokeEffect(): void {
        this.particleSystem = new BABYLON.ParticleSystem("smoke", 1000, this.scene);
        
        this.smokeTexture = new BABYLON.Texture("./textures/smoke.png", this.scene);
        this.particleSystem.particleTexture = this.smokeTexture;
        
        this.particleSystem.emitter = this.transform;
        this.particleSystem.minEmitBox = new BABYLON.Vector3(-0.2, 0, -0.2);
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(0.2, 0, 0.2);
        
        this.particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 1.0);
        this.particleSystem.color2 = new BABYLON.Color4(0.5, 0.5, 0.5, 1.0);
        this.particleSystem.colorDead = new BABYLON.Color4(0.2, 0.2, 0.2, 0.0);
        
        this.particleSystem.minSize = 0.3;
        this.particleSystem.maxSize = 1.5;
        
        this.particleSystem.minLifeTime = 2.0;
        this.particleSystem.maxLifeTime = 4.0;
        
        this.particleSystem.emitRate = 300;
        
        this.particleSystem.direction1 = new BABYLON.Vector3(-0.2, 1, -0.2);
        this.particleSystem.direction2 = new BABYLON.Vector3(0.2, 1, 0.2);
        
        this.particleSystem.minEmitPower = 0.5;
        this.particleSystem.maxEmitPower = 1.5;
        this.particleSystem.updateSpeed = 0.01;
        
        this.particleSystem.gravity = new BABYLON.Vector3(0, -1, 0);
        
        this.particleSystem.start();
    }
}
```

### Explosion Effect Particle System
```typescript
class ExplosionParticleSystem extends TOOLKIT.ShurikenParticles {
    private explosionTexture: BABYLON.Texture;
    private particleSystem: BABYLON.ParticleSystem;
    private isExploding: boolean = false;
    
    protected awake(): void {
        super.awake();
        this.setupExplosionEffect();
    }
    
    private setupExplosionEffect(): void {
        this.particleSystem = new BABYLON.ParticleSystem("explosion", 5000, this.scene);
        
        this.explosionTexture = new BABYLON.Texture("./textures/explosion.png", this.scene);
        this.particleSystem.particleTexture = this.explosionTexture;
        
        this.particleSystem.emitter = this.transform;
        this.particleSystem.minEmitBox = new BABYLON.Vector3(-0.1, -0.1, -0.1);
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(0.1, 0.1, 0.1);
        
        this.particleSystem.color1 = new BABYLON.Color4(1, 1, 0, 1.0);
        this.particleSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
        this.particleSystem.colorDead = new BABYLON.Color4(0.5, 0, 0, 0.0);
        
        this.particleSystem.minSize = 0.1;
        this.particleSystem.maxSize = 0.8;
        
        this.particleSystem.minLifeTime = 0.5;
        this.particleSystem.maxLifeTime = 2.0;
        
        this.particleSystem.emitRate = 10000;
        
        this.particleSystem.createSphereEmitter(1.0);
        
        this.particleSystem.minEmitPower = 5;
        this.particleSystem.maxEmitPower = 15;
        this.particleSystem.updateSpeed = 0.01;
        
        this.particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
    }
    
    explode(): void {
        if (!this.isExploding) {
            this.isExploding = true;
            this.particleSystem.start();
            
            setTimeout(() => {
                this.particleSystem.stop();
                this.isExploding = false;
            }, 1000);
        }
    }
}
```

## Related Classes
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
- [SceneManager](../core/SceneManager.md) - Scene management utilities
- [TerrainGenerator](../terrain/TerrainGenerator.md) - Terrain generation system
