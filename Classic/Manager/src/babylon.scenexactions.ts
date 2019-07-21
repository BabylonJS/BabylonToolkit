/// <reference path="babylon.d.ts" />
/// <reference path="babylon.scenecomponents.ts" />
/// <reference path="babylon.scenemanager.ts" />

module BABYLON {
    export class ActionManagerComponent extends BABYLON.MeshComponent {
        public constructor(owner: BABYLON.AbstractMesh, scene: BABYLON.Scene, tick: boolean = true, propertyBag: any = {}) {
            super(owner, scene, tick, propertyBag);
        }

        protected ready() :void {
            // Scene execute when ready
        }

        protected start() :void {
            // Start component function
        }

        protected update() :void {
            // Update render loop function
        }

        protected after() :void {
            // After render loop function
        }

        protected destroy() :void {
            // Destroy component function
        }
    }
}
