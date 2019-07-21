/// <reference path="babylon.d.ts" />
/// <reference path="babylon.scenecomponents.ts" />
/// <reference path="babylon.scenemanager.ts" />

module BABYLON {
    export class UniversalCameraRig extends BABYLON.CameraComponent {
        private static AUTO_INPUT = 1;
        private static RENDER_CANVAS = 2;
        public autoInput:boolean = true;
        public cameraInput:number = 0;
        public cameraSpeed:number = 1.0;
        public cameraMoveSpeed:number = 1.0;
        public cameraRotateSpeed:number = 0.005;
        private movementKeys:boolean = true;
        private multiPlayerView:boolean = false;
        private multiPlayerStart:number = 1;
        public preventDefaultEvents:boolean = true;
        private playerOneCamera:BABYLON.Camera = null;
        private playerTwoCamera:BABYLON.Camera = null;
        private playerThreeCamera:BABYLON.Camera = null;
        private playerFourCamera:BABYLON.Camera = null;
        public constructor(owner: BABYLON.Camera, scene: BABYLON.Scene, tick: boolean = true, propertyBag: any = {}) {
            super(owner, scene, tick, propertyBag);
        }

        protected ready() :void {
            this.cameraInput = this.getProperty("cameraInput", 0);
            this.cameraSpeed = this.getProperty("cameraSpeed", 1.0);
            this.movementKeys = this.getProperty("movementKeys", true);
            this.cameraMoveSpeed = this.getProperty("inputMoveSpeed", 1.0);
            this.cameraRotateSpeed = this.getProperty("inputRotateSpeed", 0.005);
            this.preventDefaultEvents = this.getProperty("preventDefaultEvents", true);
            this.multiPlayerStart = this.getProperty("multiPlayerStartup", 1);
            this.multiPlayerView = BABYLON.SceneManager.IsMultiPlayerView();
            if (this.cameraInput === BABYLON.UniversalCameraRig.AUTO_INPUT) {
                this.playerOneCamera = this.manager.getMainCamera(BABYLON.PlayerNumber.One);
                if (this.multiPlayerView === true) {
                    this.playerTwoCamera = this.manager.getMainCamera(BABYLON.PlayerNumber.Two);
                    this.playerThreeCamera = this.manager.getMainCamera(BABYLON.PlayerNumber.Three);
                    this.playerFourCamera = this.manager.getMainCamera(BABYLON.PlayerNumber.Four);
                    if (this.multiPlayerStart > 1) this.manager.setMultiPlayerViewLayout(this.multiPlayerStart);
                }
            } else if (this.cameraInput === BABYLON.UniversalCameraRig.RENDER_CANVAS) {
                let camera:BABYLON.Camera = this.manager.getMainCamera(BABYLON.PlayerNumber.One);
                camera.attachControl(this.engine.getRenderingCanvas(), this.preventDefaultEvents);
                if (camera instanceof BABYLON.FreeCamera) {
                    let freeCamera:BABYLON.FreeCamera = camera as BABYLON.FreeCamera;
                    if (this.movementKeys === true) {
                        freeCamera.keysUp.push('w'.charCodeAt(0));
                        freeCamera.keysUp.push('W'.charCodeAt(0));
                        freeCamera.keysDown.push('s'.charCodeAt(0));
                        freeCamera.keysDown.push('S'.charCodeAt(0));
                        freeCamera.keysRight.push('d'.charCodeAt(0));
                        freeCamera.keysRight.push('D'.charCodeAt(0));
                        freeCamera.keysLeft.push('a'.charCodeAt(0));
                        freeCamera.keysLeft.push('A'.charCodeAt(0));
                    }
                }
            }
        }

        protected update() :void {
            if (this.autoInput === true && this.cameraInput === BABYLON.UniversalCameraRig.AUTO_INPUT) {
                if (this.playerOneCamera != null) {
                    this.manager.updateCameraInput(this.playerOneCamera as BABYLON.FreeCamera, this.cameraMoveSpeed, this.cameraRotateSpeed, BABYLON.PlayerNumber.One);
                }
                if (this.multiPlayerView === true) {
                    let playerCount:number = BABYLON.SceneManager.GetMultiPlayerCount();
                    if (playerCount >= 2 && this.playerTwoCamera != null) {
                        this.manager.updateCameraInput(this.playerTwoCamera as BABYLON.FreeCamera, this.cameraMoveSpeed, this.cameraRotateSpeed, BABYLON.PlayerNumber.Two);
                    }
                    if (playerCount >= 3 && this.playerThreeCamera != null) {
                        this.manager.updateCameraInput(this.playerThreeCamera as BABYLON.FreeCamera, this.cameraMoveSpeed, this.cameraRotateSpeed, BABYLON.PlayerNumber.Three);
                    }
                    if (playerCount >= 4 && this.playerFourCamera != null) {
                        this.manager.updateCameraInput(this.playerFourCamera as BABYLON.FreeCamera, this.cameraMoveSpeed, this.cameraRotateSpeed, BABYLON.PlayerNumber.Four);
                    }
                }
            }
        }

        protected destroy() {
            this.playerOneCamera = null;
            this.playerTwoCamera = null;
            this.playerThreeCamera = null;
            this.playerFourCamera = null;
        }
    }
}