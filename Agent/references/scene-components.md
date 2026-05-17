# Interactive Scene Content (1.0.0)

Interactive scene content summary

## Interactive GLTF FILES

When asked to create a scene `component reference` for interfactive gltf scene files, please scan the gltf json looking for node `extras` metadata components. For example:
```
"name": "DefaultPlayer",
"extras": {
"metadata": {
    "guid": "d601760b-5a69-4393-b691-d72cd9f0c1ce",
    "components": [
    {
        "alias": "script",
        "order": -1,
        "klass": "TOOLKIT.CharacterController",
        "properties": {
        "avatarRadius": 0.28,
        "avatarHeight": 1.8,
        "centerOffset": {
            "x": 0.0,
            "y": 0.94,
            "z": 0.0
        },
        "skinWidth": 0.025,
        "slopeLimit": 45.0,
        "stepOffset": 0.25,
        "minMoveDistance": 0.0,
        "capsuleSegments": 16,
        "useGhostSweepTest": false
        },
        "instanceID": 157188,
        "instance": null
    },
    {
        "alias": "script",
        "order": 0,
        "klass": "PROJECT.ThirdPersonPlayerController",
        "properties": {
        "enableInput": true,
        "attachCamera": true,
        "playerNumber": 1,
        "playerControl": 0,
        "runKeyRequired": true,
        "arrowKeyRotation": true,
        "postNetworkAttribs": false,
        "rigidBodyMass": 85.0,
        "gravityMultiplier": 3.0,
        "stepUpVelocity": 1.0,
        "minStepHeight": 0.15,
        "minFallVelocity": 2.5,
        "airbornTimeout": 0.5,
        "groundCheckDist": 0.25,
        "moveSpeed": 5.335,
        "walkSpeed": 2.0,
        "jumpSpeed": 12.0,
        "jumpDelay": 0.25,
        "rootMotion": false,
        "lowTurnSpeed": 15.0,
        "highTurnSpeed": 25.0,
        "hasCharacterController": true,
        "maxAngle": 45.0,
        "useClimbSystem": false,
        "vaultVolumeTag": "Vault",
        "climbVolumeTag": "Climb",
        "rayClimbOffset": 0.35,
        "rayClimbLength": 0.85,
        "rayHeightOffset": 5.0,
        "rayHeightLength": 6.0,
        "maxHeightRanges": {
            "stepUpRange": {
            "minimumHeight": 0.25,
            "maximumHeight": 0.85,
            "rotationSpeed": 10.0,
            "rotateTowards": false,
            "matchHeight": false,
            "startTime": 0.0,
            "targetTime": 0.0,
            "targetOffset": 0.0
            },
            "jumpUpRange": {
            "minimumHeight": 0.85,
            "maximumHeight": 1.5,
            "rotationSpeed": 10.0,
            "rotateTowards": true,
            "matchHeight": false,
            "startTime": 0.0,
            "targetTime": 0.0,
            "targetOffset": 0.0
            },
            "climbUpRange": {
            "minimumHeight": 1.5,
            "maximumHeight": 2.5,
            "rotationSpeed": 10.0,
            "rotateTowards": true,
            "matchHeight": false,
            "startTime": 0.0,
            "targetTime": 0.0,
            "targetOffset": 0.0
            },
            "vaultOverRange": {
            "minimumHeight": 0.75,
            "maximumHeight": 1.25,
            "rotationSpeed": 10.0,
            "rotateTowards": true,
            "matchHeight": false,
            "startTime": 0.0,
            "targetTime": 0.0,
            "targetOffset": 0.0
            }
        },
        "createFootIKRig": false,
        "abstractSkinMesh": null,
        "rootBoneTransform": null,
        "leftFootTransform": null,
        "leftFootPoleOffset": {
            "x": -0.1,
            "y": 0.5,
            "z": 0.5
        },
        "leftFootMaxAngle": 180.0,
        "rightFootTransform": null,
        "rightFootMaxAngle": 180.0,
        "rightFootPoleOffset": {
            "x": 0.1,
            "y": 0.5,
            "z": 0.5
        },
        "displayHandles": false,
        "updateStateParams": true,
        "smoothMotionSpeed": true,
        "smoothInputVectors": false,
        "smoothDampTime": 0.1,
        "animationStateParams": {
            "moveDirection": "Direction",
            "inputMagnitude": "Magnitude",
            "horizontalInput": "Horizontal",
            "verticalInput": "Vertical",
            "mouseXInput": "MouseX",
            "mouseYInput": "MouseY",
            "heightInput": "Height",
            "speedInput": "Speed",
            "jumpFrame": "Jumped",
            "jumpState": "Jump",
            "actionState": "Action",
            "fallingState": "FreeFall",
            "slidingState": "Sliding",
            "groundedState": "Grounded"
        }
        },
        "instanceID": 157188,
        "instance": null
    }
    ]
  }
}
```

You can then generate a `component reference` markdown result breakdown of all the components in the scene. Be sure to include anything need that other AI can use to create game logic using interactive scene components. Cross reference any components found with with the AI Training Example Reference at https://github.com/babylonjs/babylontoolkit/tree/master/agent/references/training-reference.md for detailed class information.

## Declaration File Class Information

Check the declaration files for detail class information

- https://github.com/babylonjs/babylontoolkit/tree/master/agent/references/training-references/declarations/babylon.toolkit.d.ts: Babylon Toolkit type and API declarations.
- https://github.com/babylonjs/babylontoolkit/tree/master/agent/references/training-references/declarations/default.playground.d.ts: Default playground and DLC runtime declarations.

---


Interactibe scene content details


---

**Use these references for for details on interactive scene content**
