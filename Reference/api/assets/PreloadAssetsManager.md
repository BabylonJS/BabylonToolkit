# PreloadAssetsManager

Asset preloading and management system for efficiently loading and caching game assets before they are needed.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

PreloadAssetsManager provides a comprehensive system for preloading and managing various types of game assets including textures, models, audio files, and other resources. It supports batch loading, progress tracking, and efficient memory management for optimal performance.

## Static Methods

### Asset Loading

#### `PreloadTextures(textureUrls, onProgress?, onComplete?)`
Preloads a collection of texture assets.

**Parameters:**
- `textureUrls` `string[]` - Array of texture URLs to preload
- `onProgress?` `(loaded: number, total: number) => void` - Progress callback
- `onComplete?` `(textures: BABYLON.Texture[]) => void` - Completion callback

#### `PreloadMeshes(meshUrls, onProgress?, onComplete?)`
Preloads a collection of mesh assets.

**Parameters:**
- `meshUrls` `string[]` - Array of mesh URLs to preload
- `onProgress?` `(loaded: number, total: number) => void` - Progress callback
- `onComplete?` `(meshes: BABYLON.AbstractMesh[]) => void` - Completion callback

#### `PreloadAudio(audioUrls, onProgress?, onComplete?)`
Preloads a collection of audio assets.

**Parameters:**
- `audioUrls` `string[]` - Array of audio URLs to preload
- `onProgress?` `(loaded: number, total: number) => void` - Progress callback
- `onComplete?` `(sounds: BABYLON.Sound[]) => void` - Completion callback

### Batch Operations

#### `PreloadAssetBatch(assetBatch, onProgress?, onComplete?)`
Preloads a mixed batch of different asset types.

**Parameters:**
- `assetBatch` `any[]` - Array of asset definitions with type and URL
- `onProgress?` `(loaded: number, total: number) => void` - Progress callback
- `onComplete?` `(assets: any[]) => void` - Completion callback

### Cache Management

#### `GetCachedAsset(assetId)`
Retrieves a cached asset by its identifier.

**Parameters:**
- `assetId` `string` - Unique identifier for the cached asset

**Returns:** `any` - The cached asset or null if not found

#### `CacheAsset(assetId, asset)`
Stores an asset in the cache with the specified identifier.

**Parameters:**
- `assetId` `string` - Unique identifier for the asset
- `asset` `any` - The asset to cache

#### `ClearCache()`
Clears all cached assets from memory.

#### `GetCacheSize()`
Gets the current number of cached assets.

**Returns:** `number` - Number of assets in cache

## Usage Examples

### Basic Asset Preloading
```typescript
class AssetPreloader extends TOOLKIT.ScriptComponent {
    public loadingProgress: number = 0;
    public assetsLoaded: boolean = false;

    protected start(): void {
        this.preloadGameAssets();
    }

    private preloadGameAssets(): void {
        const textureUrls = [
            "./textures/player.jpg",
            "./textures/environment.jpg",
            "./textures/ui_elements.png"
        ];

        const meshUrls = [
            "./models/player.babylon",
            "./models/environment.babylon",
            "./models/weapons.babylon"
        ];

        const audioUrls = [
            "./audio/background_music.mp3",
            "./audio/sound_effects.wav",
            "./audio/voice_lines.ogg"
        ];

        this.preloadTextures(textureUrls);
        this.preloadMeshes(meshUrls);
        this.preloadAudio(audioUrls);
    }

    private preloadTextures(urls: string[]): void {
        TOOLKIT.PreloadAssetsManager.PreloadTextures(
            urls,
            (loaded, total) => {
                console.log(`Textures: ${loaded}/${total} loaded`);
                this.updateProgress("textures", loaded / total);
            },
            (textures) => {
                console.log(`All ${textures.length} textures loaded successfully`);
                this.onTexturesLoaded(textures);
            }
        );
    }

    private preloadMeshes(urls: string[]): void {
        TOOLKIT.PreloadAssetsManager.PreloadMeshes(
            urls,
            (loaded, total) => {
                console.log(`Meshes: ${loaded}/${total} loaded`);
                this.updateProgress("meshes", loaded / total);
            },
            (meshes) => {
                console.log(`All ${meshes.length} meshes loaded successfully`);
                this.onMeshesLoaded(meshes);
            }
        );
    }

    private preloadAudio(urls: string[]): void {
        TOOLKIT.PreloadAssetsManager.PreloadAudio(
            urls,
            (loaded, total) => {
                console.log(`Audio: ${loaded}/${total} loaded`);
                this.updateProgress("audio", loaded / total);
            },
            (sounds) => {
                console.log(`All ${sounds.length} audio files loaded successfully`);
                this.onAudioLoaded(sounds);
            }
        );
    }

    private updateProgress(category: string, progress: number): void {
        this.loadingProgress = progress * 100;
        console.log(`${category} loading progress: ${this.loadingProgress.toFixed(1)}%`);
    }

    private onTexturesLoaded(textures: any[]): void {
        textures.forEach((texture, index) => {
            TOOLKIT.PreloadAssetsManager.CacheAsset(`texture_${index}`, texture);
        });
    }

    private onMeshesLoaded(meshes: any[]): void {
        meshes.forEach((mesh, index) => {
            TOOLKIT.PreloadAssetsManager.CacheAsset(`mesh_${index}`, mesh);
        });
    }

    private onAudioLoaded(sounds: any[]): void {
        sounds.forEach((sound, index) => {
            TOOLKIT.PreloadAssetsManager.CacheAsset(`audio_${index}`, sound);
        });
        
        this.assetsLoaded = true;
        this.onAllAssetsLoaded();
    }

    private onAllAssetsLoaded(): void {
        console.log("All assets preloaded successfully!");
        console.log(`Cache size: ${TOOLKIT.PreloadAssetsManager.GetCacheSize()} assets`);
    }
}
```

### Batch Asset Loading
```typescript
class BatchAssetLoader extends TOOLKIT.ScriptComponent {
    public totalAssets: number = 0;
    public loadedAssets: number = 0;

    protected start(): void {
        this.loadAssetBatch();
    }

    private loadAssetBatch(): void {
        const assetBatch = [
            { type: "texture", url: "./textures/player.jpg", id: "player_texture" },
            { type: "texture", url: "./textures/enemy.jpg", id: "enemy_texture" },
            { type: "mesh", url: "./models/level1.babylon", id: "level1_mesh" },
            { type: "mesh", url: "./models/props.babylon", id: "props_mesh" },
            { type: "audio", url: "./audio/theme.mp3", id: "theme_music" },
            { type: "audio", url: "./audio/effects.wav", id: "sound_effects" }
        ];

        this.totalAssets = assetBatch.length;

        TOOLKIT.PreloadAssetsManager.PreloadAssetBatch(
            assetBatch,
            (loaded, total) => {
                this.loadedAssets = loaded;
                this.onBatchProgress(loaded, total);
            },
            (assets) => {
                this.onBatchComplete(assets, assetBatch);
            }
        );
    }

    private onBatchProgress(loaded: number, total: number): void {
        const progress = (loaded / total) * 100;
        console.log(`Batch loading progress: ${progress.toFixed(1)}% (${loaded}/${total})`);
    }

    private onBatchComplete(assets: any[], assetBatch: any[]): void {
        console.log("Batch loading complete!");

        assets.forEach((asset, index) => {
            const assetInfo = assetBatch[index];
            TOOLKIT.PreloadAssetsManager.CacheAsset(assetInfo.id, asset);
            console.log(`Cached ${assetInfo.type}: ${assetInfo.id}`);
        });

        this.verifyLoadedAssets(assetBatch);
    }

    private verifyLoadedAssets(assetBatch: any[]): void {
        console.log("Verifying loaded assets...");

        assetBatch.forEach((assetInfo) => {
            const cachedAsset = TOOLKIT.PreloadAssetsManager.GetCachedAsset(assetInfo.id);
            if (cachedAsset) {
                console.log(`✓ ${assetInfo.id} successfully cached`);
            } else {
                console.error(`✗ ${assetInfo.id} not found in cache`);
            }
        });
    }
}
```

### Asset Cache Management
```typescript
class AssetCacheManager extends TOOLKIT.ScriptComponent {
    public cacheStats: any = {};

    protected start(): void {
        this.setupCacheManagement();
    }

    private setupCacheManagement(): void {
        this.loadEssentialAssets();
        this.monitorCacheUsage();
    }

    private loadEssentialAssets(): void {
        const essentialAssets = [
            { type: "texture", url: "./textures/ui.png", id: "ui_texture" },
            { type: "texture", url: "./textures/cursor.png", id: "cursor_texture" },
            { type: "audio", url: "./audio/ui_sounds.wav", id: "ui_sounds" }
        ];

        TOOLKIT.PreloadAssetsManager.PreloadAssetBatch(
            essentialAssets,
            (loaded, total) => {
                console.log(`Essential assets: ${loaded}/${total}`);
            },
            (assets) => {
                this.cacheEssentialAssets(assets, essentialAssets);
            }
        );
    }

    private cacheEssentialAssets(assets: any[], assetInfo: any[]): void {
        assets.forEach((asset, index) => {
            const info = assetInfo[index];
            TOOLKIT.PreloadAssetsManager.CacheAsset(info.id, asset);
        });

        this.updateCacheStats();
    }

    private monitorCacheUsage(): void {
        setInterval(() => {
            this.updateCacheStats();
            this.logCacheStats();
        }, 5000);
    }

    private updateCacheStats(): void {
        this.cacheStats = {
            totalAssets: TOOLKIT.PreloadAssetsManager.GetCacheSize(),
            timestamp: Date.now()
        };
    }

    private logCacheStats(): void {
        console.log(`Cache Stats: ${this.cacheStats.totalAssets} assets cached`);
    }

    public getAsset(assetId: string): any {
        const asset = TOOLKIT.PreloadAssetsManager.GetCachedAsset(assetId);
        if (!asset) {
            console.warn(`Asset not found in cache: ${assetId}`);
        }
        return asset;
    }

    public preloadLevelAssets(levelId: string): void {
        const levelAssets = this.getLevelAssetList(levelId);
        
        TOOLKIT.PreloadAssetsManager.PreloadAssetBatch(
            levelAssets,
            (loaded, total) => {
                console.log(`Level ${levelId} assets: ${loaded}/${total}`);
            },
            (assets) => {
                this.cacheLevelAssets(levelId, assets, levelAssets);
            }
        );
    }

    private getLevelAssetList(levelId: string): any[] {
        const assetMap: { [key: string]: any[] } = {
            "level1": [
                { type: "texture", url: "./levels/level1/textures.jpg", id: `${levelId}_textures` },
                { type: "mesh", url: "./levels/level1/geometry.babylon", id: `${levelId}_geometry` }
            ],
            "level2": [
                { type: "texture", url: "./levels/level2/textures.jpg", id: `${levelId}_textures` },
                { type: "mesh", url: "./levels/level2/geometry.babylon", id: `${levelId}_geometry` }
            ]
        };

        return assetMap[levelId] || [];
    }

    private cacheLevelAssets(levelId: string, assets: any[], assetInfo: any[]): void {
        assets.forEach((asset, index) => {
            const info = assetInfo[index];
            TOOLKIT.PreloadAssetsManager.CacheAsset(info.id, asset);
        });

        console.log(`Level ${levelId} assets cached successfully`);
    }

    public clearLevelAssets(levelId: string): void {
        console.log(`Clearing assets for level: ${levelId}`);
    }

    public clearAllCache(): void {
        TOOLKIT.PreloadAssetsManager.ClearCache();
        console.log("All cached assets cleared");
        this.updateCacheStats();
    }
}
```

## Best Practices

1. **Progressive Loading** - Load essential assets first, then load additional assets as needed
2. **Memory Management** - Clear unused assets from cache to prevent memory leaks
3. **Error Handling** - Implement robust error handling for failed asset loads
4. **Progress Feedback** - Provide clear progress feedback to users during loading
5. **Asset Organization** - Organize assets logically and use consistent naming conventions
6. **Cache Strategy** - Implement intelligent caching strategies based on asset usage patterns

## Related Classes
- [SceneManager](../core/SceneManager.md) - Main scene management class
