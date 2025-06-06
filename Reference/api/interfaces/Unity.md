# Unity Export Interfaces

Type definitions for Unity asset export and conversion to Babylon.js format.

**Namespace**: `TOOLKIT`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

These interfaces define the structure of Unity assets when exported to the Babylon Toolkit format. They provide type safety and structure for converting Unity projects to Babylon.js applications.

## Transform and Object Interfaces

### IUnityTransform
Unity transform component data structure.

```typescript
interface IUnityTransform {
    type: string;
    id: string;
    tag: string;
    name: string;
    layer: number;
}
```

**Properties:**
- **`type`** `string` - Transform type identifier
- **`id`** `string` - Unique transform identifier
- **`tag`** `string` - Unity tag assigned to object
- **`name`** `string` - GameObject name
- **`layer`** `number` - Unity layer number

## Material Interfaces

### IUnityMaterial
Unity material data structure.

```typescript
interface IUnityMaterial {
    type: string;
    id: string;
    name: string;
    shader: string;
    gltf: number;
}
```

**Properties:**
- **`type`** `string` - Material type identifier
- **`id`** `string` - Unique material identifier
- **`name`** `string` - Material name
- **`shader`** `string` - Shader name used by material
- **`gltf`** `number` - glTF material index

## Texture Interfaces

### IUnityTexture
Unity texture data structure.

```typescript
interface IUnityTexture {
    type: string;
    name: string;
    width: number;
    height: number;
    format: string;
    mipmap: boolean;
    linear: boolean;
    wrapmode: string;
    filtermode: string;
    anisolevel: number;
}
```

**Properties:**
- **`type`** `string` - Texture type identifier
- **`name`** `string` - Texture name
- **`width`** `number` - Texture width in pixels
- **`height`** `number` - Texture height in pixels
- **`format`** `string` - Texture format (RGB24, RGBA32, etc.)
- **`mipmap`** `boolean` - Whether texture has mipmaps
- **`linear`** `boolean` - Whether texture is in linear color space
- **`wrapmode`** `string` - Texture wrap mode (Repeat, Clamp, etc.)
- **`filtermode`** `string` - Texture filter mode (Point, Bilinear, Trilinear)
- **`anisolevel`** `number` - Anisotropic filtering level

### IUnityCubemap
Unity cubemap texture data structure.

```typescript
interface IUnityCubemap {
    type: string;
    name: string;
    info: any;
    format: string;
    mipmap: boolean;
    linear: boolean;
    wrapmode: string;
    filtermode: string;
    anisolevel: number;
    mipmapbias: number;
    mipmapcount: number;
}
```

**Properties:**
- **`type`** `string` - Cubemap type identifier
- **`name`** `string` - Cubemap name
- **`info`** `any` - Additional cubemap information
- **`format`** `string` - Cubemap format
- **`mipmap`** `boolean` - Whether cubemap has mipmaps
- **`linear`** `boolean` - Whether cubemap is in linear color space
- **`wrapmode`** `string` - Texture wrap mode
- **`filtermode`** `string` - Texture filter mode
- **`anisolevel`** `number` - Anisotropic filtering level
- **`mipmapbias`** `number` - Mipmap bias value
- **`mipmapcount`** `number` - Number of mipmap levels

## Audio Interfaces

### IUnityAudioClip
Unity audio clip data structure.

```typescript
interface IUnityAudioClip {
    type: string;
    name: string;
    filename: string;
    channels: number;
    frequency: number;
    samples: number;
}
```

**Properties:**
- **`type`** `string` - Audio clip type identifier
- **`name`** `string` - Audio clip name
- **`filename`** `string` - Audio file name
- **`channels`** `number` - Number of audio channels
- **`frequency`** `number` - Sample frequency in Hz
- **`samples`** `number` - Total number of samples

### IUnityVideoClip
Unity video clip data structure.

```typescript
interface IUnityVideoClip {
    type: string;
    name: string;
    filename: string;
    width: number;
    height: number;
    framecount: number;
    audiotracks: number;
}
```

**Properties:**
- **`type`** `string` - Video clip type identifier
- **`name`** `string` - Video clip name
- **`filename`** `string` - Video file name
- **`width`** `number` - Video width in pixels
- **`height`** `number` - Video height in pixels
- **`framecount`** `number` - Total number of frames
- **`audiotracks`** `number` - Number of audio tracks

## Asset Interfaces

### IUnityFontAsset
Unity font asset data structure.

```typescript
interface IUnityFontAsset {
    type: string;
    filename: string;
    format: string;
}
```

**Properties:**
- **`type`** `string` - Font asset type identifier
- **`filename`** `string` - Font file name
- **`format`** `string` - Font format (TTF, OTF, etc.)

### IUnityTextAsset
Unity text asset data structure.

```typescript
interface IUnityTextAsset {
    type: string;
    filename: string;
    base64: string;
    json: boolean;
}
```

**Properties:**
- **`type`** `string` - Text asset type identifier
- **`filename`** `string` - Text file name
- **`base64`** `string` - Base64 encoded text content
- **`json`** `boolean` - Whether content is JSON format

### IUnityDefaultAsset
Unity default asset data structure.

```typescript
interface IUnityDefaultAsset {
    type: string;
    filename: string;
    base64: string;
    json: boolean;
}
```

**Properties:**
- **`type`** `string` - Default asset type identifier
- **`filename`** `string` - Asset file name
- **`base64`** `string` - Base64 encoded asset content
- **`json`** `boolean` - Whether content is JSON format

## Vector and Color Interfaces

### IUnityVector2
Unity Vector2 data structure.

```typescript
interface IUnityVector2 {
    x: number;
    y: number;
}
```

**Properties:**
- **`x`** `number` - X component
- **`y`** `number` - Y component

### IUnityVector3
Unity Vector3 data structure.

```typescript
interface IUnityVector3 {
    x: number;
    y: number;
    z: number;
}
```

**Properties:**
- **`x`** `number` - X component
- **`y`** `number` - Y component
- **`z`** `number` - Z component

### IUnityVector4
Unity Vector4 data structure.

```typescript
interface IUnityVector4 {
    x: number;
    y: number;
    z: number;
    w: number;
}
```

**Properties:**
- **`x`** `number` - X component
- **`y`** `number` - Y component
- **`z`** `number` - Z component
- **`w`** `number` - W component

### IUnityColor
Unity Color data structure.

```typescript
interface IUnityColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
```

**Properties:**
- **`r`** `number` - Red component (0.0 to 1.0)
- **`g`** `number` - Green component (0.0 to 1.0)
- **`b`** `number` - Blue component (0.0 to 1.0)
- **`a`** `number` - Alpha component (0.0 to 1.0)

## Animation Interfaces

### IUnityCurve
Unity animation curve data structure.

```typescript
interface IUnityCurve {
    type: string;
    length: number;
    prewrapmode: string;
    postwrapmode: string;
    animation: any;
}
```

**Properties:**
- **`type`** `string` - Curve type identifier
- **`length`** `number` - Curve length
- **`prewrapmode`** `string` - Pre-wrap mode for curve
- **`postwrapmode`** `string` - Post-wrap mode for curve
- **`animation`** `any` - Animation data

## Usage Examples

### Parsing Unity Assets
```typescript
// Parse Unity transform data
function parseUnityTransform(data: TOOLKIT.IUnityTransform): BABYLON.TransformNode {
    const transform = TOOLKIT.Utilities.ParseTransformByID(data, scene);
    
    // Set layer and tag information
    TOOLKIT.SceneManager.SetTransformLayer(transform, data.layer);
    TOOLKIT.SceneManager.SetTransformTag(transform, data.tag);
    
    return transform;
}

// Parse Unity texture
function parseUnityTexture(data: TOOLKIT.IUnityTexture): BABYLON.Texture {
    const texture = TOOLKIT.Utilities.ParseTexture(
        data, 
        scene, 
        !data.mipmap,  // noMipmap
        false,         // invertY
        data.filtermode === "Point" ? BABYLON.Texture.NEAREST_SAMPLINGMODE : BABYLON.Texture.TRILINEAR_SAMPLINGMODE
    );
    
    // Set wrap mode
    if (data.wrapmode === "Repeat") {
        texture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
        texture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
    } else if (data.wrapmode === "Clamp") {
        texture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
        texture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
    }
    
    return texture;
}
```

### Converting Unity Vectors
```typescript
// Convert Unity Vector3 to Babylon Vector3
function convertVector3(unityVec: TOOLKIT.IUnityVector3): BABYLON.Vector3 {
    return TOOLKIT.Utilities.ParseVector3(unityVec, BABYLON.Vector3.Zero());
}

// Convert Unity Color to Babylon Color3
function convertColor3(unityColor: TOOLKIT.IUnityColor): BABYLON.Color3 {
    return TOOLKIT.Utilities.ParseColor3(unityColor, BABYLON.Color3.White(), true);
}

// Convert Unity Color to Babylon Color4
function convertColor4(unityColor: TOOLKIT.IUnityColor): BABYLON.Color4 {
    return TOOLKIT.Utilities.ParseColor4(unityColor, BABYLON.Color4.FromColor3(BABYLON.Color3.White()), true);
}
```

### Loading Unity Audio
```typescript
// Load Unity audio clip
async function loadUnityAudio(data: TOOLKIT.IUnityAudioClip): Promise<BABYLON.Sound> {
    const sound = await TOOLKIT.Utilities.ParseSound(
        data,
        scene,
        data.name,
        () => console.log(`Audio ${data.name} loaded`),
        {
            loop: false,
            autoplay: false,
            volume: 1.0
        }
    );
    
    return sound;
}
```

### Processing Unity Materials
```typescript
// Process Unity material data
function processUnityMaterial(data: TOOLKIT.IUnityMaterial): BABYLON.Material {
    // Get material by name or create new one
    let material = TOOLKIT.SceneManager.GetMaterialWithName(scene, data.name);
    
    if (!material) {
        // Create material based on shader type
        switch (data.shader) {
            case "Standard":
                material = new BABYLON.PBRMaterial(data.name, scene);
                break;
            case "Unlit":
                material = new BABYLON.StandardMaterial(data.name, scene);
                break;
            default:
                material = new BABYLON.StandardMaterial(data.name, scene);
                break;
        }
    }
    
    return material;
}
```

### Unity Asset Batch Processing
```typescript
class UnityAssetProcessor {
    private scene: BABYLON.Scene;
    
    constructor(scene: BABYLON.Scene) {
        this.scene = scene;
    }
    
    processAssetBatch(assets: {
        transforms: TOOLKIT.IUnityTransform[];
        textures: TOOLKIT.IUnityTexture[];
        materials: TOOLKIT.IUnityMaterial[];
        audioClips: TOOLKIT.IUnityAudioClip[];
    }): void {
        // Process transforms
        assets.transforms.forEach(transform => {
            this.processTransform(transform);
        });
        
        // Process textures
        assets.textures.forEach(texture => {
            this.processTexture(texture);
        });
        
        // Process materials
        assets.materials.forEach(material => {
            this.processMaterial(material);
        });
        
        // Process audio clips
        assets.audioClips.forEach(audio => {
            this.processAudio(audio);
        });
    }
    
    private processTransform(data: TOOLKIT.IUnityTransform): void {
        const transform = TOOLKIT.Utilities.ParseTransformByID(data, this.scene);
        console.log(`Processed transform: ${data.name}`);
    }
    
    private processTexture(data: TOOLKIT.IUnityTexture): void {
        const texture = TOOLKIT.Utilities.ParseTexture(data, this.scene);
        console.log(`Processed texture: ${data.name} (${data.width}x${data.height})`);
    }
    
    private processMaterial(data: TOOLKIT.IUnityMaterial): void {
        console.log(`Processed material: ${data.name} using ${data.shader} shader`);
    }
    
    private async processAudio(data: TOOLKIT.IUnityAudioClip): Promise<void> {
        const sound = await TOOLKIT.Utilities.ParseSound(data, this.scene, data.name);
        console.log(`Processed audio: ${data.name} (${data.channels} channels, ${data.frequency}Hz)`);
    }
}
```

## Related Documentation
- [Utilities](../core/Utilities.md) - Parsing utility functions
- [SceneManager](../core/SceneManager.md) - Scene management
- [Core Interfaces](Core.md) - Core framework interfaces
