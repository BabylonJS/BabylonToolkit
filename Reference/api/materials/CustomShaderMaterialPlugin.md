# CustomShaderMaterialPlugin

Plugin system for extending custom shader material functionality with additional features and capabilities.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

CustomShaderMaterialPlugin provides a plugin architecture for extending the CustomShaderMaterial system with additional rendering features, post-processing effects, and material behaviors.

## Instance Properties

### Plugin Configuration
- **`pluginName`** `string` - Name identifier for the plugin
- **`isEnabled`** `boolean` - Whether the plugin is currently enabled
- **`priority`** `number` - Plugin execution priority
- **`dependencies`** `string[]` - Required plugin dependencies

### Plugin Hooks
- **`onBeforeCompile`** `(material: TOOLKIT.CustomShaderMaterial) => void` - Called before shader compilation
- **`onAfterCompile`** `(material: TOOLKIT.CustomShaderMaterial) => void` - Called after shader compilation
- **`onBeforeRender`** `(material: TOOLKIT.CustomShaderMaterial) => void` - Called before rendering
- **`onAfterRender`** `(material: TOOLKIT.CustomShaderMaterial) => void` - Called after rendering

## Plugin Management Methods

### Plugin Lifecycle

#### `initialize(material)`
Initializes the plugin with a material instance.

**Parameters:**
- `material` `TOOLKIT.CustomShaderMaterial` - Target material

#### `enable()`
Enables the plugin functionality.

#### `disable()`
Disables the plugin functionality.

#### `dispose()`
Disposes the plugin and releases resources.

### Shader Modification

#### `modifyVertexShader(source)`
Modifies the vertex shader source code.

**Parameters:**
- `source` `string` - Original vertex shader source

**Returns:** `string` - Modified vertex shader source

#### `modifyFragmentShader(source)`
Modifies the fragment shader source code.

**Parameters:**
- `source` `string` - Original fragment shader source

**Returns:** `string` - Modified fragment shader source

#### `addUniforms(uniforms)`
Adds additional uniforms to the material.

**Parameters:**
- `uniforms` `any` - Uniform definitions

#### `addDefines(defines)`
Adds preprocessor defines to the shader.

**Parameters:**
- `defines` `string[]` - Preprocessor defines

## Usage Examples

### Basic Plugin Implementation
```typescript
class ShadowMappingPlugin extends TOOLKIT.CustomShaderMaterialPlugin {
    constructor() {
        super();
        this.pluginName = "shadowMapping";
        this.priority = 100;
    }
    
    initialize(material: TOOLKIT.CustomShaderMaterial): void {
        super.initialize(material);
        this.setupShadowUniforms();
    }
    
    private setupShadowUniforms(): void {
        this.addUniforms({
            shadowMap: null,
            lightViewProjection: null,
            shadowBias: 0.001
        });
        
        this.addDefines(["SHADOW_MAPPING"]);
    }
    
    modifyVertexShader(source: string): string {
        const shadowCode = `
            #ifdef SHADOW_MAPPING
            uniform mat4 lightViewProjection;
            varying vec4 vShadowCoord;
            #endif
        `;
        
        const mainModification = `
            #ifdef SHADOW_MAPPING
            vShadowCoord = lightViewProjection * worldPos;
            #endif
        `;
        
        return source.replace(
            'varying vec2 vUV;',
            'varying vec2 vUV;\n' + shadowCode
        ).replace(
            'gl_Position = worldViewProjection * vec4(pos, 1.0);',
            'gl_Position = worldViewProjection * vec4(pos, 1.0);\n' + mainModification
        );
    }
    
    modifyFragmentShader(source: string): string {
        const shadowCode = `
            #ifdef SHADOW_MAPPING
            uniform sampler2D shadowMap;
            uniform float shadowBias;
            varying vec4 vShadowCoord;
            
            float calculateShadow() {
                vec3 projCoords = vShadowCoord.xyz / vShadowCoord.w;
                projCoords = projCoords * 0.5 + 0.5;
                
                float closestDepth = texture2D(shadowMap, projCoords.xy).r;
                float currentDepth = projCoords.z;
                
                return currentDepth - shadowBias > closestDepth ? 0.5 : 1.0;
            }
            #endif
        `;
        
        const mainModification = `
            #ifdef SHADOW_MAPPING
            float shadow = calculateShadow();
            finalColor *= shadow;
            #endif
        `;
        
        return source.replace(
            'varying vec2 vUV;',
            'varying vec2 vUV;\n' + shadowCode
        ).replace(
            'gl_FragColor = vec4(finalColor, texColor.a);',
            mainModification + '\ngl_FragColor = vec4(finalColor, texColor.a);'
        );
    }
}
```

### Animation Plugin
```typescript
class VertexAnimationPlugin extends TOOLKIT.CustomShaderMaterialPlugin {
    private animationTime: number = 0;
    
    constructor() {
        super();
        this.pluginName = "vertexAnimation";
        this.priority = 50;
    }
    
    initialize(material: TOOLKIT.CustomShaderMaterial): void {
        super.initialize(material);
        this.setupAnimationUniforms();
    }
    
    private setupAnimationUniforms(): void {
        this.addUniforms({
            animationTime: 0.0,
            waveAmplitude: 1.0,
            waveFrequency: 1.0,
            windDirection: new BABYLON.Vector2(1, 0)
        });
        
        this.addDefines(["VERTEX_ANIMATION"]);
    }
    
    modifyVertexShader(source: string): string {
        const animationCode = `
            #ifdef VERTEX_ANIMATION
            uniform float animationTime;
            uniform float waveAmplitude;
            uniform float waveFrequency;
            uniform vec2 windDirection;
            
            vec3 applyVertexAnimation(vec3 position) {
                float wave = sin(position.x * waveFrequency + animationTime) * 
                           cos(position.z * waveFrequency + animationTime);
                position.y += wave * waveAmplitude;
                
                vec2 wind = windDirection * sin(animationTime + position.x * 0.1) * 0.1;
                position.xz += wind;
                
                return position;
            }
            #endif
        `;
        
        const positionModification = `
            #ifdef VERTEX_ANIMATION
            pos = applyVertexAnimation(pos);
            #endif
        `;
        
        return source.replace(
            'attribute vec3 position;',
            'attribute vec3 position;\n' + animationCode
        ).replace(
            'vec3 pos = position;',
            'vec3 pos = position;\n' + positionModification
        );
    }
    
    update(deltaTime: number): void {
        this.animationTime += deltaTime;
        if (this.material) {
            this.material.setFloat("animationTime", this.animationTime);
        }
    }
}
```

### Post-Processing Plugin
```typescript
class ColorGradingPlugin extends TOOLKIT.CustomShaderMaterialPlugin {
    constructor() {
        super();
        this.pluginName = "colorGrading";
        this.priority = 200;
    }
    
    initialize(material: TOOLKIT.CustomShaderMaterial): void {
        super.initialize(material);
        this.setupColorGradingUniforms();
    }
    
    private setupColorGradingUniforms(): void {
        this.addUniforms({
            contrast: 1.0,
            brightness: 0.0,
            saturation: 1.0,
            gamma: 1.0,
            colorFilter: new BABYLON.Color3(1, 1, 1)
        });
        
        this.addDefines(["COLOR_GRADING"]);
    }
    
    modifyFragmentShader(source: string): string {
        const colorGradingCode = `
            #ifdef COLOR_GRADING
            uniform float contrast;
            uniform float brightness;
            uniform float saturation;
            uniform float gamma;
            uniform vec3 colorFilter;
            
            vec3 applyColorGrading(vec3 color) {
                color = pow(color, vec3(1.0 / gamma));
                
                color = (color - 0.5) * contrast + 0.5;
                color += brightness;
                
                float luminance = dot(color, vec3(0.299, 0.587, 0.114));
                color = mix(vec3(luminance), color, saturation);
                
                color *= colorFilter;
                
                return clamp(color, 0.0, 1.0);
            }
            #endif
        `;
        
        const colorModification = `
            #ifdef COLOR_GRADING
            finalColor = applyColorGrading(finalColor);
            #endif
        `;
        
        return source.replace(
            'varying vec2 vUV;',
            'varying vec2 vUV;\n' + colorGradingCode
        ).replace(
            'gl_FragColor = vec4(finalColor, texColor.a);',
            colorModification + '\ngl_FragColor = vec4(finalColor, texColor.a);'
        );
    }
}
```

### Plugin Manager
```typescript
class ShaderPluginManager {
    private plugins: Map<string, TOOLKIT.CustomShaderMaterialPlugin> = new Map();
    private material: TOOLKIT.CustomShaderMaterial;
    
    constructor(material: TOOLKIT.CustomShaderMaterial) {
        this.material = material;
    }
    
    addPlugin(plugin: TOOLKIT.CustomShaderMaterialPlugin): void {
        plugin.initialize(this.material);
        this.plugins.set(plugin.pluginName, plugin);
        this.recompileMaterial();
    }
    
    removePlugin(pluginName: string): void {
        const plugin = this.plugins.get(pluginName);
        if (plugin) {
            plugin.dispose();
            this.plugins.delete(pluginName);
            this.recompileMaterial();
        }
    }
    
    enablePlugin(pluginName: string): void {
        const plugin = this.plugins.get(pluginName);
        if (plugin) {
            plugin.enable();
            this.recompileMaterial();
        }
    }
    
    disablePlugin(pluginName: string): void {
        const plugin = this.plugins.get(pluginName);
        if (plugin) {
            plugin.disable();
            this.recompileMaterial();
        }
    }
    
    private recompileMaterial(): void {
        let vertexShader = this.material.vertexShader;
        let fragmentShader = this.material.fragmentShader;
        
        const sortedPlugins = Array.from(this.plugins.values())
            .filter(plugin => plugin.isEnabled)
            .sort((a, b) => a.priority - b.priority);
        
        for (const plugin of sortedPlugins) {
            vertexShader = plugin.modifyVertexShader(vertexShader);
            fragmentShader = plugin.modifyFragmentShader(fragmentShader);
        }
        
        this.material.setVertexShader(vertexShader);
        this.material.setFragmentShader(fragmentShader);
        this.material.compile();
    }
    
    updatePlugins(deltaTime: number): void {
        this.plugins.forEach(plugin => {
            if (plugin.isEnabled && plugin.update) {
                plugin.update(deltaTime);
            }
        });
    }
}
```

## Related Classes
- [CustomShaderMaterial](CustomShaderMaterial.md) - Custom shader material system
- [SceneManager](../core/SceneManager.md) - Scene management utilities
- [Utilities](../core/Utilities.md) - General utility functions
