declare namespace PROJECT {
    /**
     * Babylon Script Component
     * @class MyCustomRotator
     */
    class MyCustomRotator extends TOOLKIT.ScriptComponent {
        rotationSpeed: number;
        constructor(transform: BABYLON.TransformNode, scene: BABYLON.Scene, properties?: any, alias?: string);
        awake(): void;
        start(): void;
        protected update(): void;
    }
}
