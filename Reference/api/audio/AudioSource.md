# AudioSource

3D audio source component for spatial audio playback with comprehensive sound management and effects.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Extends**: `TOOLKIT.ScriptComponent`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

AudioSource provides a complete 3D audio system for playing sounds with spatial positioning, distance attenuation, and various audio effects. It integrates with Babylon.js audio system to deliver immersive audio experiences.

## Instance Properties

### Audio Configuration
- **`audioClip`** `BABYLON.Sound` - The audio clip to play
- **`volume`** `number` - Volume level (0.0 to 1.0)
- **`pitch`** `number` - Pitch multiplier (0.5 to 2.0)
- **`loop`** `boolean` - Whether the audio should loop
- **`mute`** `boolean` - Whether the audio is muted
- **`playOnAwake`** `boolean` - Whether to play automatically when component starts

### 3D Audio Properties
- **`spatialBlend`** `number` - 3D spatial blend (0.0 = 2D, 1.0 = 3D)
- **`minDistance`** `number` - Minimum distance for 3D audio falloff
- **`maxDistance`** `number` - Maximum distance for 3D audio falloff
- **`rolloffMode`** `number` - Distance attenuation rolloff mode
- **`dopplerLevel`** `number` - Doppler effect intensity

### Playback State
- **`isPlaying`** `boolean` - Whether audio is currently playing
- **`isPaused`** `boolean` - Whether audio is currently paused
- **`time`** `number` - Current playback time in seconds
- **`length`** `number` - Total audio clip length in seconds

## Audio Control Methods

### Playback Control

#### `play(delay?)`
Play the audio clip.

**Parameters:**
- `delay?` `number` - Delay before playing in seconds

#### `playOneShot(clip, volumeScale?)`
Play an audio clip once without affecting the main audio clip.

**Parameters:**
- `clip` `BABYLON.Sound` - Audio clip to play
- `volumeScale?` `number` - Volume scale for this playback

#### `stop()`
Stop audio playback.

#### `pause()`
Pause audio playback.

#### `resume()`
Resume paused audio playback.

#### `restart()`
Restart audio from the beginning.

### Audio Configuration

#### `setAudioClip(clip)`
Set the audio clip to play.

**Parameters:**
- `clip` `BABYLON.Sound` - The audio clip

#### `setVolume(volume)`
Set the volume level.

**Parameters:**
- `volume` `number` - Volume level (0.0 to 1.0)

#### `setPitch(pitch)`
Set the pitch multiplier.

**Parameters:**
- `pitch` `number` - Pitch multiplier (0.5 to 2.0)

#### `setLoop(loop)`
Set whether the audio should loop.

**Parameters:**
- `loop` `boolean` - Loop setting

#### `setMute(mute)`
Set whether the audio is muted.

**Parameters:**
- `mute` `boolean` - Mute setting

### 3D Audio Configuration

#### `setSpatialBlend(blend)`
Set the 3D spatial blend amount.

**Parameters:**
- `blend` `number` - Spatial blend (0.0 = 2D, 1.0 = 3D)

#### `setMinDistance(distance)`
Set the minimum distance for 3D audio falloff.

**Parameters:**
- `distance` `number` - Minimum distance

#### `setMaxDistance(distance)`
Set the maximum distance for 3D audio falloff.

**Parameters:**
- `distance` `number` - Maximum distance

#### `setRolloffMode(mode)`
Set the distance attenuation rolloff mode.

**Parameters:**
- `mode` `number` - Rolloff mode (Linear, Logarithmic, etc.)

#### `setDopplerLevel(level)`
Set the Doppler effect intensity.

**Parameters:**
- `level` `number` - Doppler level (0.0 to 5.0)

## Usage Examples

### Basic Audio Playback
```typescript
// Create audio source component
const audioSource = new TOOLKIT.AudioSource(transform, scene);

// Load and set audio clip
const sound = new BABYLON.Sound("music", "./audio/background.wav", scene);
audioSource.setAudioClip(sound);

// Configure playback
audioSource.setVolume(0.8);
audioSource.setLoop(true);
audioSource.playOnAwake = true;

// Play audio
audioSource.play();
```

### 3D Spatial Audio
```typescript
// Configure 3D audio properties
audioSource.setSpatialBlend(1.0); // Full 3D
audioSource.setMinDistance(5.0);
audioSource.setMaxDistance(50.0);
audioSource.setRolloffMode(BABYLON.Engine.AUDIO_ROLLOFF_LOGARITHMIC);

// Enable Doppler effect
audioSource.setDopplerLevel(1.0);

// Play positioned audio
audioSource.play();
```

## Related Classes
- [ScriptComponent](../core/ScriptComponent.md) - Base component class
- [SceneManager](../core/SceneManager.md) - Scene management utilities
