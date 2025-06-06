# MetadataParser

Internal metadata parser for processing Unity asset metadata and component information.

**Namespace**: `TOOLKIT`  
**Type**: `class`  
**Copyright**: All rights reserved (c) 2024 Mackey Kinard

## Overview

MetadataParser provides internal functionality for parsing Unity asset metadata and component information during the asset import and conversion process. This class handles the interpretation of Unity-specific data structures and their conversion to Babylon Toolkit format.

## Static Methods

### Metadata Processing

#### `parseMetadata(data)`
Parses raw metadata from Unity assets.

**Parameters:**
- `data` `any` - Raw metadata object

**Returns:** `any` - Parsed metadata structure

#### `extractComponentInfo(metadata)`
Extracts component information from parsed metadata.

**Parameters:**
- `metadata` `any` - Parsed metadata object

**Returns:** `any` - Component information

#### `processAssetReferences(metadata)`
Processes asset references within metadata.

**Parameters:**
- `metadata` `any` - Metadata containing asset references

**Returns:** `any[]` - Array of processed asset references

## Usage Examples

### Basic Metadata Parsing
```typescript
const rawMetadata = {
    components: [...],
    assets: [...],
    transforms: [...]
};

const parsedData = TOOLKIT.MetadataParser.parseMetadata(rawMetadata);
const componentInfo = TOOLKIT.MetadataParser.extractComponentInfo(parsedData);
const assetRefs = TOOLKIT.MetadataParser.processAssetReferences(parsedData);
```

## Related Classes
- [SceneManager](SceneManager.md) - Scene management utilities
- [Utilities](Utilities.md) - General utility functions
