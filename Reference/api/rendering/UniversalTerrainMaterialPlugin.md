# UniversalTerrainMaterialPlugin

Terrain material plugin system that extends the Universal Terrain Material with additional rendering features and shader customization.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

UniversalTerrainMaterialPlugin provides an extensible plugin system for the Universal Terrain Material, allowing developers to add custom shader features, rendering passes, and material behaviors without modifying the core terrain material system.

## Properties

### Plugin Configuration
- **`pluginName`** `string` - Unique name identifier for the plugin
- **`priority`** `number` - Execution priority for plugin processing
- **`enabled`** `boolean` - Whether the plugin is currently active

### Shader Extensions
- **`vertexShaderCode`** `string` - Custom vertex shader code to inject
- **`fragmentShaderCode`** `string` - Custom fragment shader code to inject
- **`uniformDeclarations`** `string` - Custom uniform declarations

### Material Properties
- **`customUniforms`** `any` - Custom uniform values for the plugin
- **`customTextures`** `BABYLON.Texture[]` - Additional textures used by the plugin

## Methods

### Plugin Lifecycle

#### `initialize(material)`
Initializes the plugin with the specified terrain material.

**Parameters:**
- `material` `TOOLKIT.UniversalTerrainMaterial` - The terrain material to extend

#### `dispose()`
Disposes of the plugin and cleans up resources.

### Shader Modification

#### `getVertexShaderCode()`
Returns the custom vertex shader code for injection.

**Returns:** `string` - Vertex shader code

#### `getFragmentShaderCode()`
Returns the custom fragment shader code for injection.

**Returns:** `string` - Fragment shader code

#### `updateUniforms(effect)`
Updates custom uniforms for the shader effect.

**Parameters:**
- `effect` `BABYLON.Effect` - The shader effect to update

## Usage Examples

### Basic Plugin Implementation
```typescript
class WeatherTerrainPlugin extends TOOLKIT.UniversalTerrainMaterialPlugin {
    public rainIntensity: number = 0.0;
    public snowCoverage: number = 0.0;
    public wetness: number = 0.0;

    constructor() {
        super();
        this.pluginName = "WeatherTerrain";
        this.priority = 100;
        this.enabled = true;
        
        this.setupShaderCode();
        this.setupUniforms();
    }

    private setupShaderCode(): void {
        this.vertexShaderCode = `
            varying vec3 vWorldPosition;
            varying vec3 vWorldNormal;
        `;

        this.fragmentShaderCode = `
            uniform float rainIntensity;
            uniform float snowCoverage;
            uniform float wetness;
            
            vec3 applyWeatherEffects(vec3 baseColor, vec3 worldPos, vec3 worldNormal) {
                vec3 finalColor = baseColor;
                
                float heightFactor = clamp(worldPos.y / 50.0, 0.0, 1.0);
                float slopeFactor = dot(worldNormal, vec3(0.0, 1.0, 0.0));
                
                vec3 snowColor = vec3(0.9, 0.95, 1.0);
                finalColor = mix(finalColor, snowColor, snowCoverage * heightFactor * slopeFactor);
                
                finalColor = mix(finalColor, finalColor * 0.7, wetness * rainIntensity);
                
                return finalColor;
            }
        `;
    }

    private setupUniforms(): void {
        this.customUniforms = {
            rainIntensity: this.rainIntensity,
            snowCoverage: this.snowCoverage,
            wetness: this.wetness
        };
    }

    public updateUniforms(effect: BABYLON.Effect): void {
        effect.setFloat("rainIntensity", this.rainIntensity);
        effect.setFloat("snowCoverage", this.snowCoverage);
        effect.setFloat("wetness", this.wetness);
    }

    public setWeatherConditions(rain: number, snow: number, wet: number): void {
        this.rainIntensity = Math.max(0, Math.min(1, rain));
        this.snowCoverage = Math.max(0, Math.min(1, snow));
        this.wetness = Math.max(0, Math.min(1, wet));
        
        this.customUniforms.rainIntensity = this.rainIntensity;
        this.customUniforms.snowCoverage = this.snowCoverage;
        this.customUniforms.wetness = this.wetness;
    }
}

class TerrainWithWeatherSystem extends TOOLKIT.ScriptComponent {
    public terrainMaterial: TOOLKIT.UniversalTerrainMaterial;
    public weatherPlugin: WeatherTerrainPlugin;

    protected start(): void {
        this.setupTerrainWithWeather();
    }

    private setupTerrainWithWeather(): void {
        this.terrainMaterial = new TOOLKIT.UniversalTerrainMaterial("weatherTerrain", this.scene);
        this.weatherPlugin = new WeatherTerrainPlugin();
        
        this.weatherPlugin.initialize(this.terrainMaterial);
        
        this.simulateWeatherChanges();
    }

    private simulateWeatherChanges(): void {
        setInterval(() => {
            const rain = Math.random() * 0.8;
            const snow = Math.random() * 0.6;
            const wet = rain * 0.7;
            
            this.weatherPlugin.setWeatherConditions(rain, snow, wet);
        }, 5000);
    }
}
```

## Best Practices

1. **Plugin Naming** - Use unique, descriptive names for plugins to avoid conflicts
2. **Priority Management** - Set appropriate priorities for plugin execution order
3. **Shader Optimization** - Keep custom shader code efficient to maintain performance
4. **Resource Cleanup** - Always dispose of plugin resources when no longer needed
5. **Uniform Updates** - Update uniforms efficiently to avoid performance overhead
6. **Compatibility** - Ensure plugins are compatible with the base terrain material system

## Related Classes
- [UniversalTerrainMaterial](UniversalTerrainMaterial.md) - Universal terrain material system
- [CustomShaderMaterialPlugin](../materials/CustomShaderMaterialPlugin.md) - Shader material plugin system
- [SceneManager](../core/SceneManager.md) - Main scene management class
