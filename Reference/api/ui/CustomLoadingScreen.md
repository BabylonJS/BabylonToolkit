# CustomLoadingScreen

Custom loading screen implementation that provides configurable loading UI with customizable appearance and behavior.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Implements**: `BABYLON.ILoadingScreen`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

CustomLoadingScreen provides a flexible loading screen implementation that can be customized with different HTML content, CSS styling, and behavior options. It integrates with the Babylon.js engine loading system to provide visual feedback during asset loading operations.

## Constructor

### `constructor(loadingDivId, loadingUIText, hideLoadingUIWithEngine?, customInnerHtml?, customInnerCss?)`
Creates a new custom loading screen with the specified configuration.

**Parameters:**
- `loadingDivId` `string` - HTML element ID for the loading screen container
- `loadingUIText` `string` - Text to display during loading
- `hideLoadingUIWithEngine?` `boolean` - Whether to hide loading UI when engine is ready (optional)
- `customInnerHtml?` `string` - Custom HTML content for the loading screen (optional)
- `customInnerCss?` `string` - Custom CSS styles for the loading screen (optional)

## Properties

### Configuration
- **`loadingDivId`** `string` - HTML element ID for the loading screen container
- **`loadingUIText`** `string` - Text displayed during loading operations
- **`hideLoadingUIWithEngine`** `boolean` - Whether to automatically hide when engine is ready
- **`customInnerHtml`** `string` - Custom HTML content for the loading screen
- **`customInnerCss`** `string` - Custom CSS styles for the loading screen
- **`loadingUIBackgroundColor`** `string` - Background color for the loading UI

## Methods

### Loading Screen Control

#### `displayLoadingUI()`
Displays the loading screen UI.

#### `hideLoadingUI()`
Hides the loading screen UI.

#### `showLoadingDiv(show)`
Shows or hides the loading div element.

**Parameters:**
- `show` `boolean` - Whether to show the loading div

### Element Access

#### `getLoadingDiv()`
Gets the loading div HTML element.

**Returns:** `HTMLDivElement` - The loading div element

#### `hasLoadingDiv()`
Checks if the loading div element exists.

**Returns:** `boolean` - True if loading div exists

## Usage Examples

### Basic Loading Screen Setup
```typescript
class LoadingScreenManager extends TOOLKIT.ScriptComponent {
    public loadingScreen: TOOLKIT.CustomLoadingScreen;

    protected start(): void {
        this.setupLoadingScreen();
    }

    private setupLoadingScreen(): void {
        this.loadingScreen = new TOOLKIT.CustomLoadingScreen(
            "loading-container",
            "Loading assets...",
            true
        );

        this.loadingScreen.loadingUIBackgroundColor = "#000000";

        this.registerLoadingScreen();
    }

    private registerLoadingScreen(): void {
        const engine = TOOLKIT.SceneManager.GetEngine(this.scene);
        if (engine) {
            engine.loadingScreen = this.loadingScreen;
        }
    }

    public showLoading(): void {
        this.loadingScreen.displayLoadingUI();
    }

    public hideLoading(): void {
        this.loadingScreen.hideLoadingUI();
    }
}
```

### Custom Styled Loading Screen
```typescript
class CustomStyledLoadingScreen extends TOOLKIT.ScriptComponent {
    public loadingScreen: TOOLKIT.CustomLoadingScreen;

    protected start(): void {
        this.setupCustomLoadingScreen();
    }

    private setupCustomLoadingScreen(): void {
        const customHtml = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <h2 class="loading-title">Loading Game Assets</h2>
                <div class="loading-progress">
                    <div class="progress-bar"></div>
                </div>
                <p class="loading-text">Please wait while we prepare your experience...</p>
            </div>
        `;

        const customCss = `
            .loading-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                font-family: Arial, sans-serif;
                color: white;
            }
            
            .loading-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid #333;
                border-top: 3px solid #fff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .loading-title {
                margin: 0 0 20px 0;
                font-size: 24px;
                font-weight: bold;
            }
            
            .loading-progress {
                width: 300px;
                height: 6px;
                background-color: #333;
                border-radius: 3px;
                overflow: hidden;
                margin-bottom: 15px;
            }
            
            .progress-bar {
                height: 100%;
                background-color: #4CAF50;
                width: 0%;
                animation: progress 3s ease-in-out infinite;
            }
            
            @keyframes progress {
                0% { width: 0%; }
                50% { width: 70%; }
                100% { width: 100%; }
            }
            
            .loading-text {
                margin: 0;
                font-size: 14px;
                opacity: 0.8;
            }
        `;

        this.loadingScreen = new TOOLKIT.CustomLoadingScreen(
            "custom-loading-screen",
            "Loading...",
            true,
            customHtml,
            customCss
        );

        this.loadingScreen.loadingUIBackgroundColor = "#1a1a1a";
        this.setupLoadingScreenEvents();
    }

    private setupLoadingScreenEvents(): void {
        const engine = TOOLKIT.SceneManager.GetEngine(this.scene);
        if (engine) {
            engine.loadingScreen = this.loadingScreen;
        }
    }
}
```

### Progressive Loading Screen
```typescript
class ProgressiveLoadingScreen extends TOOLKIT.ScriptComponent {
    public loadingScreen: TOOLKIT.CustomLoadingScreen;
    public loadingProgress: number = 0;
    public loadingSteps: string[] = [
        "Initializing engine...",
        "Loading textures...",
        "Loading models...",
        "Loading audio...",
        "Finalizing..."
    ];
    public currentStep: number = 0;

    protected start(): void {
        this.setupProgressiveLoadingScreen();
    }

    private setupProgressiveLoadingScreen(): void {
        this.loadingScreen = new TOOLKIT.CustomLoadingScreen(
            "progressive-loading",
            this.loadingSteps[0],
            false
        );

        this.loadingScreen.loadingUIBackgroundColor = "#2c3e50";
        this.setupProgressiveUI();
    }

    private setupProgressiveUI(): void {
        const progressHtml = `
            <div class="progressive-loading">
                <div class="loading-logo">
                    <h1>Game Title</h1>
                </div>
                <div class="loading-info">
                    <div class="step-indicator">
                        <span class="current-step">1</span>
                        <span class="total-steps">/ ${this.loadingSteps.length}</span>
                    </div>
                    <div class="step-text">${this.loadingSteps[0]}</div>
                    <div class="progress-container">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <div class="progress-percentage">0%</div>
                </div>
            </div>
        `;

        const progressCss = `
            .progressive-loading {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background: linear-gradient(135deg, #2c3e50, #34495e);
                color: white;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            .loading-logo h1 {
                font-size: 48px;
                margin-bottom: 50px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }
            
            .loading-info {
                text-align: center;
                min-width: 400px;
            }
            
            .step-indicator {
                font-size: 18px;
                margin-bottom: 10px;
                opacity: 0.8;
            }
            
            .step-text {
                font-size: 16px;
                margin-bottom: 20px;
                height: 20px;
            }
            
            .progress-container {
                width: 100%;
                height: 8px;
                background-color: rgba(255,255,255,0.2);
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 10px;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #3498db, #2ecc71);
                transition: width 0.3s ease;
            }
            
            .progress-percentage {
                font-size: 14px;
                opacity: 0.7;
            }
        `;

        this.loadingScreen.customInnerHtml = progressHtml;
        this.loadingScreen.customInnerCss = progressCss;
    }

    protected update(): void {
        this.updateLoadingProgress();
    }

    private updateLoadingProgress(): void {
        this.loadingProgress += 0.5;
        
        if (this.loadingProgress >= 100) {
            this.loadingProgress = 100;
            this.completeLoading();
            return;
        }

        const stepProgress = this.loadingProgress / 20;
        const newStep = Math.floor(stepProgress);
        
        if (newStep !== this.currentStep && newStep < this.loadingSteps.length) {
            this.currentStep = newStep;
            this.updateStepText();
        }

        this.updateProgressBar();
    }

    private updateStepText(): void {
        if (this.loadingScreen.hasLoadingDiv()) {
            const loadingDiv = this.loadingScreen.getLoadingDiv();
            const stepText = loadingDiv.querySelector('.step-text');
            const stepIndicator = loadingDiv.querySelector('.current-step');
            
            if (stepText) {
                stepText.textContent = this.loadingSteps[this.currentStep];
            }
            
            if (stepIndicator) {
                stepIndicator.textContent = (this.currentStep + 1).toString();
            }
        }
    }

    private updateProgressBar(): void {
        if (this.loadingScreen.hasLoadingDiv()) {
            const loadingDiv = this.loadingScreen.getLoadingDiv();
            const progressFill = loadingDiv.querySelector('.progress-fill') as HTMLElement;
            const progressPercentage = loadingDiv.querySelector('.progress-percentage');
            
            if (progressFill) {
                progressFill.style.width = `${this.loadingProgress}%`;
            }
            
            if (progressPercentage) {
                progressPercentage.textContent = `${Math.round(this.loadingProgress)}%`;
            }
        }
    }

    private completeLoading(): void {
        setTimeout(() => {
            this.loadingScreen.hideLoadingUI();
        }, 1000);
    }

    public setLoadingStep(stepIndex: number): void {
        if (stepIndex >= 0 && stepIndex < this.loadingSteps.length) {
            this.currentStep = stepIndex;
            this.loadingProgress = (stepIndex / this.loadingSteps.length) * 100;
            this.updateStepText();
            this.updateProgressBar();
        }
    }

    public setCustomStep(stepText: string, progress: number): void {
        this.loadingProgress = Math.max(0, Math.min(100, progress));
        
        if (this.loadingScreen.hasLoadingDiv()) {
            const loadingDiv = this.loadingScreen.getLoadingDiv();
            const stepText = loadingDiv.querySelector('.step-text');
            
            if (stepText) {
                stepText.textContent = stepText;
            }
        }
        
        this.updateProgressBar();
    }
}
```

## Best Practices

1. **Visual Design** - Create visually appealing loading screens that match your application's theme
2. **Progress Indication** - Provide clear progress feedback to users during long loading operations
3. **Responsive Design** - Ensure loading screens work well on different screen sizes and orientations
4. **Performance** - Keep loading screen animations lightweight to avoid impacting loading performance
5. **Accessibility** - Include appropriate ARIA labels and ensure loading screens are accessible
6. **Error Handling** - Handle cases where loading div elements might not exist

## Related Classes
- [WindowManager](WindowManager.md) - Window and viewport management
- [SceneManager](../core/SceneManager.md) - Main scene management class
