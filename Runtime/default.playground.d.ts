declare namespace MY {
    /**
     * Babylon Script Component
     * @class CustomRotator
     */
    class CustomRotator extends TOOLKIT.ScriptComponent {
        rotationSpeed: number;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        protected awake(): void;
        protected start(): void;
        protected ready(): void;
        protected update(): void;
        protected late(): void;
        protected step(): void;
        protected fixed(): void;
        protected after(): void;
        protected reset(): void;
        protected destroy(): void;
    }
}
