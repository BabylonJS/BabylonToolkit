# CustomShaderMaterial

Custom shader material system for advanced rendering effects and material customization.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

CustomShaderMaterial provides a comprehensive system for creating and managing custom shader materials with advanced rendering capabilities, uniform management, and shader compilation.

## Instance Properties

### Shader Configuration
- **`shaderName`** `string` - Name identifier for the shader
- **`vertexShader`** `string` - Vertex shader source code
- **`fragmentShader`** `string` - Fragment shader source code
- **`defines`** `string[]` - Shader preprocessor defines
- **`uniforms`** `any` - Shader uniform values
- **`samplers`** `string[]` - Texture sampler names
- **`attributes`** `string[]` - Vertex attribute names

### Material Properties
- **`material`** `BABYLON.ShaderMaterial` - The underlying Babylon.js shader material
- **`textures`** `Map<string, BABYLON.Texture>` - Texture bindings
- **`isReady`** `boolean` - Whether the material is compiled and ready

## Shader Management Methods

### Material Creation

#### `createMaterial(name, scene)`
Creates a new custom shader material.

**Parameters:**
- `name` `string` - Material name
- `scene` `BABYLON.Scene` - Scene reference

**Returns:** `BABYLON.ShaderMaterial`

#### `setVertexShader(source)`
Sets the vertex shader source code.

**Parameters:**
- `source` `string` - Vertex shader source

#### `setFragmentShader(source)`
Sets the fragment shader source code.

**Parameters:**
- `source` `string` - Fragment shader source

#### `addDefine(define)`
Adds a preprocessor define to the shader.

**Parameters:**
- `define` `string` - Preprocessor define

#### `removeDefine(define)`
Removes a preprocessor define from the shader.

**Parameters:**
- `define` `string` - Preprocessor define to remove

### Uniform Management

#### `setUniform(name, value)`
Sets a uniform value.

**Parameters:**
- `name` `string` - Uniform name
- `value` `any` - Uniform value

#### `getUniform(name)`
Gets a uniform value.

**Parameters:**
- `name` `string` - Uniform name

**Returns:** `any`

#### `setFloat(name, value)`
Sets a float uniform.

**Parameters:**
- `name` `string` - Uniform name
- `value` `number` - Float value

#### `setVector2(name, value)`
Sets a Vector2 uniform.

**Parameters:**
- `name` `string` - Uniform name
- `value` `BABYLON.Vector2` - Vector2 value

#### `setVector3(name, value)`
Sets a Vector3 uniform.

**Parameters:**
- `name` `string` - Uniform name
- `value` `BABYLON.Vector3` - Vector3 value

#### `setVector4(name, value)`
Sets a Vector4 uniform.

**Parameters:**
- `name` `string` - Uniform name
- `value` `BABYLON.Vector4` - Vector4 value

#### `setColor3(name, value)`
Sets a Color3 uniform.

**Parameters:**
- `name` `string` - Uniform name
- `value` `BABYLON.Color3` - Color3 value

#### `setColor4(name, value)`
Sets a Color4 uniform.

**Parameters:**
- `name` `string` - Uniform name
- `value` `BABYLON.Color4` - Color4 value

#### `setMatrix(name, value)`
Sets a Matrix uniform.

**Parameters:**
- `name` `string` - Uniform name
- `value` `BABYLON.Matrix` - Matrix value

### Texture Management

#### `setTexture(name, texture)`
Binds a texture to a sampler.

**Parameters:**
- `name` `string` - Sampler name
- `texture` `BABYLON.Texture` - Texture to bind

#### `getTexture(name)`
Gets a bound texture.

**Parameters:**
- `name` `string` - Sampler name

**Returns:** `BABYLON.Texture`

#### `removeTexture(name)`
Removes a texture binding.

**Parameters:**
- `name` `string` - Sampler name

### Compilation and Validation

#### `compile()`
Compiles the shader material.

**Returns:** `boolean` - Compilation success

#### `isCompiled()`
Checks if the material is compiled.

**Returns:** `boolean`

#### `getCompilationErrors()`
Gets shader compilation errors.

**Returns:** `string[]`

#### `validate()`
Validates the shader configuration.

**Returns:** `boolean`

## Usage Examples

### Basic Custom Material
```typescript
const customMaterial = new TOOLKIT.CustomShaderMaterial();

customMaterial.shaderName = "myCustomShader";

customMaterial.setVertexShader(`
    precision highp float;
    
    attribute vec3 position;
    attribute vec2 uv;
    
    uniform mat4 worldViewProjection;
    uniform float time;
    
    varying vec2 vUV;
    varying float vTime;
    
    void main(void) {
        vec3 pos = position;
        pos.y += sin(time + position.x * 5.0) * 0.1;
        
        gl_Position = worldViewProjection * vec4(pos, 1.0);
        vUV = uv;
        vTime = time;
    }
`);

customMaterial.setFragmentShader(`
    precision highp float;
    
    varying vec2 vUV;
    varying float vTime;
    
    uniform sampler2D mainTexture;
    uniform vec3 color;
    
    void main(void) {
        vec4 texColor = texture2D(mainTexture, vUV);
        vec3 finalColor = texColor.rgb * color;
        finalColor *= (sin(vTime) * 0.5 + 0.5);
        
        gl_FragColor = vec4(finalColor, texColor.a);
    }
`);

const material = customMaterial.createMaterial("waveMaterial", scene);

customMaterial.setFloat("time", 0.0);
customMaterial.setColor3("color", new BABYLON.Color3(1, 0.5, 0));

const texture = new BABYLON.Texture("./textures/diffuse.jpg", scene);
customMaterial.setTexture("mainTexture", texture);

mesh.material = material;
```

### Animated Water Shader
```typescript
class WaterShaderMaterial extends TOOLKIT.CustomShaderMaterial {
    private time: number = 0;
    
    constructor() {
        super();
        this.setupWaterShader();
    }
    
    private setupWaterShader(): void {
        this.shaderName = "waterShader";
        
        this.setVertexShader(`
            precision highp float;
            
            attribute vec3 position;
            attribute vec3 normal;
            attribute vec2 uv;
            
            uniform mat4 world;
            uniform mat4 worldViewProjection;
            uniform float time;
            uniform float waveHeight;
            uniform float waveFrequency;
            
            varying vec2 vUV;
            varying vec3 vWorldPosition;
            varying vec3 vNormal;
            
            void main(void) {
                vec3 pos = position;
                
                float wave1 = sin(pos.x * waveFrequency + time) * waveHeight;
                float wave2 = cos(pos.z * waveFrequency * 0.7 + time * 1.3) * waveHeight * 0.5;
                pos.y += wave1 + wave2;
                
                vec4 worldPos = world * vec4(pos, 1.0);
                vWorldPosition = worldPos.xyz;
                vNormal = normalize((world * vec4(normal, 0.0)).xyz);
                vUV = uv;
                
                gl_Position = worldViewProjection * vec4(pos, 1.0);
            }
        `);
        
        this.setFragmentShader(`
            precision highp float;
            
            varying vec2 vUV;
            varying vec3 vWorldPosition;
            varying vec3 vNormal;
            
            uniform sampler2D normalMap;
            uniform sampler2D foamTexture;
            uniform vec3 waterColor;
            uniform vec3 cameraPosition;
            uniform float time;
            uniform float transparency;
            
            void main(void) {
                vec2 animatedUV = vUV + vec2(time * 0.1, time * 0.05);
                vec2 animatedUV2 = vUV + vec2(-time * 0.05, time * 0.08);
                
                vec3 normal1 = texture2D(normalMap, animatedUV).rgb * 2.0 - 1.0;
                vec3 normal2 = texture2D(normalMap, animatedUV2).rgb * 2.0 - 1.0;
                vec3 finalNormal = normalize(normal1 + normal2);
                
                vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
                float fresnel = pow(1.0 - dot(viewDirection, finalNormal), 2.0);
                
                vec3 foam = texture2D(foamTexture, animatedUV * 4.0).rgb;
                
                vec3 finalColor = mix(waterColor, waterColor * 1.5, fresnel);
                finalColor += foam * 0.3;
                
                gl_FragColor = vec4(finalColor, transparency);
            }
        `);
    }
    
    update(deltaTime: number): void {
        this.time += deltaTime;
        this.setFloat("time", this.time);
    }
    
    setupWaterMaterial(scene: BABYLON.Scene): BABYLON.ShaderMaterial {
        const material = this.createMaterial("waterMaterial", scene);
        
        this.setFloat("time", 0.0);
        this.setFloat("waveHeight", 0.2);
        this.setFloat("waveFrequency", 2.0);
        this.setFloat("transparency", 0.8);
        this.setColor3("waterColor", new BABYLON.Color3(0.1, 0.3, 0.8));
        
        const normalMap = new BABYLON.Texture("./textures/water_normal.jpg", scene);
        const foamTexture = new BABYLON.Texture("./textures/foam.jpg", scene);
        
        this.setTexture("normalMap", normalMap);
        this.setTexture("foamTexture", foamTexture);
        
        return material;
    }
}
```

### Post-Process Effect Material
```typescript
class BloomEffectMaterial extends TOOLKIT.CustomShaderMaterial {
    constructor() {
        super();
        this.setupBloomShader();
    }
    
    private setupBloomShader(): void {
        this.shaderName = "bloomEffect";
        
        this.setVertexShader(`
            precision highp float;
            
            attribute vec2 position;
            
            varying vec2 vUV;
            
            void main(void) {
                vUV = (position + 1.0) / 2.0;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `);
        
        this.setFragmentShader(`
            precision highp float;
            
            varying vec2 vUV;
            
            uniform sampler2D textureSampler;
            uniform float bloomThreshold;
            uniform float bloomIntensity;
            uniform vec2 screenSize;
            
            void main(void) {
                vec4 color = texture2D(textureSampler, vUV);
                
                float brightness = dot(color.rgb, vec3(0.299, 0.587, 0.114));
                
                if (brightness > bloomThreshold) {
                    vec3 bloom = color.rgb * bloomIntensity;
                    
                    vec2 texelSize = 1.0 / screenSize;
                    vec3 blurredBloom = vec3(0.0);
                    
                    for (int x = -2; x <= 2; x++) {
                        for (int y = -2; y <= 2; y++) {
                            vec2 offset = vec2(float(x), float(y)) * texelSize;
                            blurredBloom += texture2D(textureSampler, vUV + offset).rgb;
                        }
                    }
                    
                    blurredBloom /= 25.0;
                    color.rgb += blurredBloom * bloomIntensity;
                }
                
                gl_FragColor = color;
            }
        `);
    }
    
    setupBloomEffect(scene: BABYLON.Scene): BABYLON.ShaderMaterial {
        const material = this.createMaterial("bloomEffect", scene);
        
        this.setFloat("bloomThreshold", 0.8);
        this.setFloat("bloomIntensity", 1.5);
        this.setVector2("screenSize", new BABYLON.Vector2(
            scene.getEngine().getRenderWidth(),
            scene.getEngine().getRenderHeight()
        ));
        
        return material;
    }
}
```

## Related Classes
- [CustomShaderMaterialPlugin](CustomShaderMaterialPlugin.md) - Shader material plugin system
- [SceneManager](../core/SceneManager.md) - Scene management utilities
- [Utilities](../core/Utilities.md) - General utility functions
