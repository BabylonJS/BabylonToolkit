# WebVideoPlayer

Web-based video player component with comprehensive video playback control and asset preloading capabilities.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Extends**: `TOOLKIT.ScriptComponent`  
**Implements**: `TOOLKIT.IAssetPreloader`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

WebVideoPlayer provides a complete video playback system for web-based applications with support for multiple video formats, playback controls, and integration with the Babylon Toolkit asset preloading system.

## Instance Properties

### Video Configuration
- **`videoName`** `string` - Name identifier for the video
- **`videoUrl`** `string` - URL path to the video file
- **`videoLoop`** `boolean` - Whether the video should loop playback
- **`videoMute`** `boolean` - Whether the video should be muted
- **`videoAutoPlay`** `boolean` - Whether the video should auto-play when ready
- **`videoPreload`** `string` - Video preload setting ("none", "metadata", "auto")
- **`videoPoster`** `string` - URL to poster image displayed before video loads
- **`videoPlaybackRate`** `number` - Video playback speed multiplier
- **`videoVolume`** `number` - Video volume level (0.0 to 1.0)
- **`videoCurrentTime`** `number` - Current playback time in seconds

### Video Element Properties
- **`videoElement`** `HTMLVideoElement` - The HTML video element
- **`videoTexture`** `BABYLON.VideoTexture` - Babylon.js video texture for 3D rendering
- **`videoMaterial`** `BABYLON.StandardMaterial` - Material using the video texture

### Playback State
- **`isVideoReady`** `boolean` - Whether the video is ready for playback
- **`isVideoPlaying`** `boolean` - Whether the video is currently playing
- **`isVideoPaused`** `boolean` - Whether the video is paused
- **`isVideoEnded`** `boolean` - Whether the video has finished playing
- **`videoDuration`** `number` - Total video duration in seconds

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

## Asset Preloader Methods

#### `addPreloaderTasks(assetsManager)`
Adds video preloading tasks to the assets manager.

**Parameters:**
- `assetsManager` `TOOLKIT.PreloadAssetsManager` - Assets manager for preloading

## Video Control Methods

### Playback Control

#### `playVideo()`
Starts video playback.

#### `pauseVideo()`
Pauses video playback.

#### `stopVideo()`
Stops video playback and resets to beginning.

#### `restartVideo()`
Restarts video from the beginning.

#### `togglePlayPause()`
Toggles between play and pause states.

### Audio Control

#### `muteVideo()`
Mutes the video audio.

#### `unmuteVideo()`
Unmutes the video audio.

#### `toggleMute()`
Toggles video mute state.

#### `setVolume(volume)`
Sets the video volume level.

**Parameters:**
- `volume` `number` - Volume level (0.0 to 1.0)

### Playback Configuration

#### `setPlaybackRate(rate)`
Sets the video playback speed.

**Parameters:**
- `rate` `number` - Playback rate multiplier (0.25 to 4.0)

#### `setCurrentTime(time)`
Sets the current playback position.

**Parameters:**
- `time` `number` - Time in seconds

#### `seekTo(time)`
Seeks to a specific time in the video.

**Parameters:**
- `time` `number` - Target time in seconds

#### `seekToPercent(percent)`
Seeks to a percentage of the video duration.

**Parameters:**
- `percent` `number` - Percentage (0.0 to 1.0)

### Video Source Management

#### `setVideoSource(url)`
Sets the video source URL.

**Parameters:**
- `url` `string` - Video file URL

#### `loadVideo(url)`
Loads a new video from URL.

**Parameters:**
- `url` `string` - Video file URL

## Usage Examples

### Basic Video Player Setup
```typescript
const videoPlayer = new TOOLKIT.WebVideoPlayer(transform, scene);

videoPlayer.videoName = "introVideo";
videoPlayer.videoUrl = "./videos/intro.mp4";
videoPlayer.videoAutoPlay = true;
videoPlayer.videoLoop = false;
videoPlayer.videoVolume = 0.8;

videoPlayer.awake();
videoPlayer.start();
```

### Video Texture on 3D Object
```typescript
class VideoScreen extends TOOLKIT.WebVideoPlayer {
    private screenMesh: BABYLON.Mesh;
    
    protected awake(): void {
        super.awake();
        this.setupVideoScreen();
    }
    
    private setupVideoScreen(): void {
        this.screenMesh = BABYLON.MeshBuilder.CreatePlane("videoScreen", {
            width: 16,
            height: 9
        }, this.scene);
        
        this.screenMesh.parent = this.transform;
        
        this.videoUrl = "./videos/presentation.mp4";
        this.videoAutoPlay = false;
        this.videoLoop = true;
        
        this.loadVideoTexture();
    }
    
    private loadVideoTexture(): void {
        this.videoTexture = new BABYLON.VideoTexture(
            "videoTexture",
            this.videoUrl,
            this.scene,
            true,
            false,
            BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE,
            {
                autoPlay: this.videoAutoPlay,
                loop: this.videoLoop,
                muted: this.videoMute
            }
        );
        
        this.videoMaterial = new BABYLON.StandardMaterial("videoMaterial", this.scene);
        this.videoMaterial.diffuseTexture = this.videoTexture;
        this.videoMaterial.emissiveTexture = this.videoTexture;
        this.videoMaterial.roughness = 1;
        this.videoMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
        
        this.screenMesh.material = this.videoMaterial;
        
        this.videoElement = this.videoTexture.video;
        this.setupVideoEvents();
    }
    
    private setupVideoEvents(): void {
        this.videoElement.addEventListener('loadeddata', () => {
            this.isVideoReady = true;
            this.videoDuration = this.videoElement.duration;
            console.log("Video loaded and ready");
        });
        
        this.videoElement.addEventListener('play', () => {
            this.isVideoPlaying = true;
            this.isVideoPaused = false;
            console.log("Video started playing");
        });
        
        this.videoElement.addEventListener('pause', () => {
            this.isVideoPlaying = false;
            this.isVideoPaused = true;
            console.log("Video paused");
        });
        
        this.videoElement.addEventListener('ended', () => {
            this.isVideoPlaying = false;
            this.isVideoEnded = true;
            console.log("Video ended");
        });
    }
    
    protected update(): void {
        super.update();
        
        if (this.videoElement && this.isVideoReady) {
            this.videoCurrentTime = this.videoElement.currentTime;
        }
    }
}
```

### Interactive Video Controls
```typescript
class InteractiveVideoPlayer extends TOOLKIT.WebVideoPlayer {
    private controlsUI: BABYLON.AdvancedDynamicTexture;
    private playButton: BABYLON.Button;
    private progressBar: BABYLON.Slider;
    private volumeSlider: BABYLON.Slider;
    
    protected awake(): void {
        super.awake();
        this.setupVideoControls();
    }
    
    private setupVideoControls(): void {
        this.controlsUI = BABYLON.AdvancedDynamicTexture.CreateFullscreenUI("videoControls");
        
        this.createPlayButton();
        this.createProgressBar();
        this.createVolumeSlider();
    }
    
    private createPlayButton(): void {
        this.playButton = BABYLON.Button.CreateSimpleButton("playButton", "Play");
        this.playButton.widthInPixels = 100;
        this.playButton.heightInPixels = 40;
        this.playButton.color = "white";
        this.playButton.cornerRadius = 5;
        this.playButton.background = "green";
        this.playButton.verticalAlignment = BABYLON.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.playButton.horizontalAlignment = BABYLON.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.playButton.leftInPixels = 20;
        this.playButton.topInPixels = -20;
        
        this.playButton.onPointerUpObservable.add(() => {
            this.togglePlayPause();
            this.updatePlayButtonText();
        });
        
        this.controlsUI.addControl(this.playButton);
    }
    
    private createProgressBar(): void {
        this.progressBar = new BABYLON.Slider("progressBar");
        this.progressBar.minimum = 0;
        this.progressBar.maximum = 100;
        this.progressBar.value = 0;
        this.progressBar.height = "20px";
        this.progressBar.width = "400px";
        this.progressBar.verticalAlignment = BABYLON.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.progressBar.horizontalAlignment = BABYLON.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.progressBar.topInPixels = -60;
        
        this.progressBar.onValueChangedObservable.add((value) => {
            if (this.videoDuration > 0) {
                const targetTime = (value / 100) * this.videoDuration;
                this.seekTo(targetTime);
            }
        });
        
        this.controlsUI.addControl(this.progressBar);
    }
    
    private createVolumeSlider(): void {
        this.volumeSlider = new BABYLON.Slider("volumeSlider");
        this.volumeSlider.minimum = 0;
        this.volumeSlider.maximum = 1;
        this.volumeSlider.value = this.videoVolume;
        this.volumeSlider.height = "20px";
        this.volumeSlider.width = "100px";
        this.volumeSlider.verticalAlignment = BABYLON.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.volumeSlider.horizontalAlignment = BABYLON.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.volumeSlider.rightInPixels = -20;
        this.volumeSlider.topInPixels = -20;
        
        this.volumeSlider.onValueChangedObservable.add((value) => {
            this.setVolume(value);
        });
        
        this.controlsUI.addControl(this.volumeSlider);
    }
    
    protected update(): void {
        super.update();
        this.updateProgressBar();
    }
    
    private updateProgressBar(): void {
        if (this.videoDuration > 0 && this.progressBar) {
            const progress = (this.videoCurrentTime / this.videoDuration) * 100;
            this.progressBar.value = progress;
        }
    }
    
    private updatePlayButtonText(): void {
        if (this.playButton) {
            this.playButton.textBlock.text = this.isVideoPlaying ? "Pause" : "Play";
        }
    }
    
    togglePlayPause(): void {
        if (this.isVideoPlaying) {
            this.pauseVideo();
        } else {
            this.playVideo();
        }
    }
}
```

### Video Playlist Manager
```typescript
class VideoPlaylist extends TOOLKIT.WebVideoPlayer {
    private playlist: string[] = [];
    private currentVideoIndex: number = 0;
    private autoAdvance: boolean = true;
    
    protected awake(): void {
        super.awake();
        this.setupPlaylist();
    }
    
    private setupPlaylist(): void {
        this.playlist = [
            "./videos/video1.mp4",
            "./videos/video2.mp4",
            "./videos/video3.mp4"
        ];
        
        this.loadCurrentVideo();
        this.setupPlaylistEvents();
    }
    
    private setupPlaylistEvents(): void {
        if (this.videoElement) {
            this.videoElement.addEventListener('ended', () => {
                if (this.autoAdvance) {
                    this.nextVideo();
                }
            });
        }
    }
    
    private loadCurrentVideo(): void {
        if (this.currentVideoIndex < this.playlist.length) {
            this.setVideoSource(this.playlist[this.currentVideoIndex]);
        }
    }
    
    nextVideo(): void {
        this.currentVideoIndex = (this.currentVideoIndex + 1) % this.playlist.length;
        this.loadCurrentVideo();
        
        if (this.videoAutoPlay) {
            this.playVideo();
        }
    }
    
    previousVideo(): void {
        this.currentVideoIndex = this.currentVideoIndex > 0 ? 
            this.currentVideoIndex - 1 : 
            this.playlist.length - 1;
        this.loadCurrentVideo();
        
        if (this.videoAutoPlay) {
            this.playVideo();
        }
    }
    
    playVideoAtIndex(index: number): void {
        if (index >= 0 && index < this.playlist.length) {
            this.currentVideoIndex = index;
            this.loadCurrentVideo();
            this.playVideo();
        }
    }
    
    addToPlaylist(videoUrl: string): void {
        this.playlist.push(videoUrl);
    }
    
    removeFromPlaylist(index: number): void {
        if (index >= 0 && index < this.playlist.length) {
            this.playlist.splice(index, 1);
            
            if (this.currentVideoIndex >= this.playlist.length) {
                this.currentVideoIndex = 0;
            }
            
            this.loadCurrentVideo();
        }
    }
    
    getCurrentVideoInfo(): { index: number, url: string, total: number } {
        return {
            index: this.currentVideoIndex,
            url: this.playlist[this.currentVideoIndex] || "",
            total: this.playlist.length
        };
    }
}
```

### Asset Preloader Integration
```typescript
class PreloadedVideoPlayer extends TOOLKIT.WebVideoPlayer {
    addPreloaderTasks(assetsManager: TOOLKIT.PreloadAssetsManager): void {
        if (this.videoUrl) {
            assetsManager.addBinaryFileTask(this.videoName, this.videoUrl);
        }
        
        if (this.videoPoster) {
            assetsManager.addTextureTask(`${this.videoName}_poster`, this.videoPoster);
        }
    }
    
    protected awake(): void {
        super.awake();
        
        const assetsManager = new TOOLKIT.PreloadAssetsManager(this.scene);
        this.addPreloaderTasks(assetsManager);
        
        assetsManager.onFinish = (tasks) => {
            console.log("Video assets preloaded successfully");
            this.initializeVideo();
        };
        
        assetsManager.load();
    }
    
    private initializeVideo(): void {
        this.loadVideoTexture();
        
        if (this.videoAutoPlay) {
            this.playVideo();
        }
    }
}
```

## Related Classes
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
- [IAssetPreloader](../interfaces/Core.md) - Asset preloading interface
- [SceneManager](../core/SceneManager.md) - Scene management utilities
- [AudioSource](../audio/AudioSource.md) - Audio playback system
