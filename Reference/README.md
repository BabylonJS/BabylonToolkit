# Babylon Toolkit API Reference

A comprehensive API reference for the Babylon Toolkit library - a powerful extension framework for Babylon.js that provides Unity style components and utilities for 3D web development.

## Overview

The Babylon Toolkit extends Babylon.js with a comprehensive set of classes and utilities that make 3D web development more accessible and powerful. This documentation covers all classes, interfaces, and utilities available in the toolkit.

## Pro Classes

```typescript
// Access character controller
const character = TOOLKIT.SceneManager.GetComponent(transform, "TOOLKIT.CharacterController");

// Access rigidbody physics
const rigidbody = TOOLKIT.SceneManager.GetComponent(transform, "TOOLKIT.RigidbodyPhysics");

// Access animation state
const animator = TOOLKIT.SceneManager.GetComponent(transform, "TOOLKIT.AnimationState");

// Access navigation agent
const agent = TOOLKIT.SceneManager.GetComponent(transform, "TOOLKIT.NavigationAgent");

// Access web video player
const video = TOOLKIT.SceneManager.GetComponent(transform, "TOOLKIT.WebVideoPlayer");

// Access audio source
const audio = TOOLKIT.SceneManager.GetComponent(transform, "TOOLKIT.AudioSource");
```

## API Categories

### Core Framework
- [SceneManager](api/core/SceneManager.md) - Main toolkit scene management class
- [ScriptComponent](api/core/ScriptComponent.md) - Base class for all script components
- [Utilities](api/core/Utilities.md) - Collection of utility functions and helpers
- [MetadataParser](api/core/MetadataParser.md) - Internal metadata parsing utilities

### Physics System
- [RigidbodyPhysics](api/physics/RigidbodyPhysics.md) - Full rigidbody physics with Havok engine
- [CharacterController](api/physics/CharacterController.md) - Character movement and collision
- [SimpleCharacterController](api/physics/SimpleCharacterController.md) - Simplified character controller
- [RecastCharacterController](api/physics/RecastCharacterController.md) - Recast navigation character controller
- [RaycastVehicle](api/physics/RaycastVehicle.md) - Raycast-based vehicle physics
- [HavokRaycastVehicle](api/physics/HavokRaycastVehicle.md) - Havok raycast vehicle implementation
- [HavokWheelInfo](api/physics/HavokWheelInfo.md) - Vehicle wheel configuration
- [HavokVehicleUtilities](api/physics/HavokVehicleUtilities.md) - Vehicle utility functions

### Navigation System
- [NavigationAgent](api/navigation/NavigationAgent.md) - Unity-style navigation agent
- [RecastJSPluginExtension](api/navigation/RecastJSPluginExtension.md) - Recast navigation plugin
- [RecastJSCrowdExtension](api/navigation/RecastJSCrowdExtension.md) - Crowd simulation extension

### Animation System
- [AnimationState](api/animation/AnimationState.md) - Animation state management
- [AnimationMixer](api/animation/AnimationMixer.md) - Animation blending and mixing
- [BlendTreeSystem](api/animation/BlendTreeSystem.md) - Blend tree animation system
- [BlendTreeUtils](api/animation/BlendTreeUtils.md) - Blend tree utilities
- [BlendTreeValue](api/animation/BlendTreeValue.md) - Blend tree value container
- [MachineState](api/animation/MachineState.md) - State machine implementation
- [TransitionCheck](api/animation/TransitionCheck.md) - Animation transition logic
- [BlendingWeights](api/animation/BlendingWeights.md) - Animation blending weights

### Audio System
- [AudioSource](api/audio/AudioSource.md) - 3D audio source component

### Input System
- [InputController](api/input/InputController.md) - Comprehensive input handling
- [TouchJoystickHandler](api/input/TouchJoystickHandler.md) - Touch joystick controls
- [UserInputOptions](api/input/UserInputOptions.md) - Input configuration options

### UI and Window Management
- [WindowManager](api/ui/WindowManager.md) - Window and viewport management
- [CustomLoadingScreen](api/ui/CustomLoadingScreen.md) - Custom loading screen implementation

### Messaging and Communication
- [GlobalMessageBus](api/messaging/GlobalMessageBus.md) - Global event messaging system
- [LocalMessageBus](api/messaging/LocalMessageBus.md) - Local event messaging system

### Asset Management
- [PreloadAssetsManager](api/assets/PreloadAssetsManager.md) - Asset preloading and management


### Rendering and Materials
- [UniversalTerrainMaterial](api/rendering/UniversalTerrainMaterial.md) - Terrain material system
- [UniversalTerrainMaterialPlugin](api/rendering/UniversalTerrainMaterialPlugin.md) - Terrain material plugin
- [LinesMeshRenderer](api/rendering/LinesMeshRenderer.md) - Line mesh rendering utilities

### Particle System
- [ShurikenParticles](api/particles/ShurikenParticles.md) - Unity-style Shuriken particle system

### Terrain System
- [TerrainGenerator](api/terrain/TerrainGenerator.md) - Procedural terrain generation component

### Video System
- [WebVideoPlayer](api/video/WebVideoPlayer.md) - Web-based video player component

### Material System
- [CustomShaderMaterial](api/materials/CustomShaderMaterial.md) - Custom shader material system
- [CustomShaderMaterialPlugin](api/materials/CustomShaderMaterialPlugin.md) - Shader material plugin system

### Utilities and Helpers
- [EntityController](api/utilities/EntityController.md) - Entity management utilities
- [PrefabObjectPool](api/utilities/PrefabObjectPool.md) - Object pooling system
- [RaycastHitResult](api/utilities/RaycastHitResult.md) - Raycast result container
- [TriggerVolume](api/utilities/TriggerVolume.md) - Trigger volume detection

### Interfaces and Types
- [Core Interfaces](api/interfaces/Core.md) - Core framework interfaces
- [Unity Export Interfaces](api/interfaces/Unity.md) - Unity export type definitions
- [Physics Interfaces](api/interfaces/Physics.md) - Physics system interfaces
- [Animation Interfaces](api/interfaces/Animation.md) - Animation system interfaces

## Getting Started

1. **Installation**: Include the Babylon Toolkit in your project
2. **Scene Setup**: Load your scenes and assets as you normally would
3. **Components**: Add script components to transforms for interactive behavior

## Support

For questions, issues, or contributions, please refer to the Babylon Toolkit documentation and community resources.
