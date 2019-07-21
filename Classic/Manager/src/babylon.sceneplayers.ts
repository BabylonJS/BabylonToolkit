/// <reference path="babylon.d.ts" />
/// <reference path="babylon.scenecomponents.ts" />
/// <reference path="babylon.scenemanager.ts" />

//////////////////////////////////////////////
// Notes
//////////////////////////////////////////////
// velocity = direction.scale(speed);
// speed = velocity.length();
// direction = velocity.normalize();
//////////////////////////////////////////////

module BABYLON {
    export class CharacterController extends BABYLON.MeshComponent {
        public movementType:number = BABYLON.MovementType.DirectVelocity;
        public avatarControl:number = 0; //  Zero: Non Player Character
        public avatarHeight:number = 2.0;
        public avatarRadius:number = 0.25;
        public fallingVelocity:number = 0.1;
        public slidingVelocity:number = 0.25;
        public synchronizeVelocity:boolean = true;
        public isJumping():boolean { return this._jumping; }
        public isFalling():boolean { return this._falling; }
        public isSliding():boolean { return this._sliding; }
        public isGrounded():boolean { return this._grounded; }
        public getVelocity():BABYLON.Vector3 { return this._velocity; }
        public getFriction():number { return this.manager.getFrictionLevel(this.mesh); }
        public setFriction(friction:number):void { this.manager.applyFriction(this.mesh, friction); }
        public onPhysicsContact:(collider:BABYLON.AbstractMesh, tag:string)=>void = null;
        private _jumping:boolean = false;
        private _falling:boolean = false;
        private _sliding:boolean = false;
        private _grounded:boolean = true;
        private _threashold:number = 0.5;
        private _velocity:BABYLON.Vector3 = BABYLON.Vector3.Zero();
        private _angularVelocity:BABYLON.Vector3 = BABYLON.Vector3.Zero();
        private _jumpingVelocity:BABYLON.Vector3 = BABYLON.Vector3.Zero();
        public constructor(owner: BABYLON.AbstractMesh, scene: BABYLON.Scene, tick: boolean = true, propertyBag: any = {}) {
            super(owner, scene, tick, propertyBag);
            this.movementType = this.getProperty("movementType", BABYLON.MovementType.DirectVelocity);
            this.avatarControl = this.getProperty("avatarControl", 0);
            this.avatarHeight = this.getProperty("avatarHeight", 2.0);
            this.avatarRadius = this.getProperty("avatarRadius", 0.25);
            this.fallingVelocity = this.getProperty("fallingVelocity", 0.1);
            this.slidingVelocity = this.getProperty("slidingVelocity", 0.25);
        }
        protected start():void {
            this._jumping = false;
            this._falling = false;
            this._sliding = false;
            this._grounded = true;
            this.updateGroundingState();
            // ..
            // Character Collision Events
            // ..
            this.onCollisionEvent = (collider:BABYLON.AbstractMesh, tag:string) => {
                if (this.manager.checkCollisionContact(this.mesh, collider, BABYLON.CollisionContact.Bottom, this._threashold) === true) {
                    this._jumping = false;
                    this.updateGroundingState();
                }
                if (this.onPhysicsContact != null) this.onPhysicsContact(collider, tag);
            };
        }
        protected update() :void {  this.updateGroundingState(); }
        protected after() :void {  this.updateGroundingState(); }
        protected updateGroundingState():void {
            this._grounded = (this._jumping === false);
            // ..
            // TODO: Get Collision Current Velocity
            // ..
            this._velocity = (this.movementType === BABYLON.MovementType.CheckCollision) ? BABYLON.Vector3.Zero() : this.manager.getLinearVelocity(this.mesh);
            this._falling = (this._velocity != null && this._velocity.y < (-this.fallingVelocity));
            this._sliding = (this._grounded === true && this._velocity != null && this._velocity.y < (-this.slidingVelocity));
        }

        ///////////////////////////////////////////////////
        // Public Character Controller Movement Function //
        ///////////////////////////////////////////////////
        
        public move(velocity:BABYLON.Vector3, friction:number = -1.0, jump:number = -1.0):void {
            if (this.movementType === BABYLON.MovementType.CheckCollision) {
                // ..
                // TODO: Move With Collision
                // ..
            } else {
                if (friction >= 0.0) this.manager.applyFriction(this.mesh, friction);
                if (this.synchronizeVelocity) velocity.y = this._velocity.y;
                if (this.movementType === BABYLON.MovementType.AppliedForces) {
                    this.manager.applyForce(this.mesh, velocity, this.mesh.getAbsolutePosition());
                } else {
                    this.manager.setLinearVelocity(this.mesh, velocity);
                }
                if (jump > 0.0) {
                    this._jumping = true;
                    this._jumpingVelocity.copyFromFloats(0.0, jump, 0.0);
                    this.manager.applyImpulse(this.mesh, this._jumpingVelocity, this.mesh.getAbsolutePosition());
                    this.updateGroundingState();
                }
            }
        }
        public turn(speed:number, friction:number = -1.0):void {
            if (this.movementType === BABYLON.MovementType.CheckCollision) {
                // ..
                // TODO: Turn With Collision
                // ..
            } else {
                if (friction >= 0.0) this.manager.applyFriction(this.mesh, friction);
                this._angularVelocity.copyFromFloats(0.0, speed, 0.0);
                this.manager.setAngularVelocity(this.mesh, this._angularVelocity);
            }
        }
    }
}
