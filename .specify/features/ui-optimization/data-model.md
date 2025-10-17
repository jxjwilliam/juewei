# Data Model: UI Optimization

**Feature**: UI Optimization - CSS Improvements, Font Replacement, and Media Optimization  
**Created**: 2024-12-19  
**Status**: Complete  

## Entity Definitions

### CSS Variables Entity
**Purpose**: Design tokens for consistent styling across the application

**Fields**:
- `id`: string (unique identifier)
- `category`: 'colors' | 'spacing' | 'typography' | 'shadows' | 'animations'
- `name`: string (variable name, e.g., '--food-red')
- `value`: string (CSS value, e.g., 'oklch(0.55 0.22 25)')
- `description`: string (human-readable description)
- `usage`: string[] (components that use this variable)
- `responsive`: boolean (whether variable changes across breakpoints)

**Relationships**:
- One-to-many with Component Styles
- Many-to-many with Utility Classes

**Validation Rules**:
- Variable names must follow CSS custom property naming convention
- Values must be valid CSS values
- Categories must be from predefined list
- Usage tracking must be updated when components change

### Font Family Entity
**Purpose**: Typography system for Chinese and English text

**Fields**:
- `id`: string (unique identifier)
- `name`: string (font family name, e.g., 'Source Han Sans')
- `type`: 'primary' | 'heading' | 'fallback'
- `language`: 'chinese' | 'english' | 'both'
- `weights`: number[] (available font weights, e.g., [400, 500, 700])
- `loading_strategy`: 'preload' | 'swap' | 'fallback'
- `fallback_chain`: string[] (fallback font stack)
- `performance_metrics`: object (loading time, file size, etc.)

**Relationships**:
- One-to-many with Typography Scale
- Many-to-many with Component Styles

**Validation Rules**:
- Font names must be unique within language
- Weights must be valid CSS font-weight values
- Fallback chain must include system fonts
- Performance metrics must be measurable

### Image Asset Entity
**Purpose**: Optimized images for restaurant content

**Fields**:
- `id`: string (unique identifier)
- `filename`: string (original filename)
- `category`: 'product' | 'hero' | 'logo' | 'certification' | 'social'
- `format`: 'webp' | 'jpg' | 'png' | 'gif'
- `sizes`: object (responsive image sizes)
- `alt_text`: string (accessibility description)
- `usage_count`: number (how many components reference this image)
- `optimization_level`: 'high' | 'medium' | 'low'
- `file_size`: number (file size in bytes)
- `dimensions`: object (width, height)

**Relationships**:
- One-to-many with Component References
- Many-to-one with Image Category

**Validation Rules**:
- Filename must be unique within category
- Alt text must be provided for accessibility
- File size must be within performance thresholds
- Dimensions must match responsive requirements

### Performance Metric Entity
**Purpose**: Track performance improvements and optimization results

**Fields**:
- `id`: string (unique identifier)
- `metric_type`: 'fcp' | 'lcp' | 'cls' | 'fid' | 'ttfb'
- `value`: number (metric value)
- `threshold`: number (target threshold)
- `status`: 'pass' | 'fail' | 'warning'
- `measurement_date`: Date
- `page_url`: string (URL where metric was measured)
- `device_type`: 'mobile' | 'desktop' | 'tablet'
- `connection_speed`: 'slow' | 'fast' | 'medium'

**Relationships**:
- Many-to-one with Page Entity
- One-to-many with Optimization Actions

**Validation Rules**:
- Values must be positive numbers
- Status must be calculated based on threshold comparison
- Measurement date must be recent
- Device type must be from predefined list

## State Transitions

### Font Loading States
```
unloaded → loading → loaded → error
    ↓         ↓        ↓       ↓
  preload → swap → fallback → system
```

**Transitions**:
- `unloaded → loading`: Font request initiated
- `loading → loaded`: Font successfully loaded
- `loading → error`: Font loading failed
- `error → fallback`: Fallback font activated

### Image Loading States
```
unloaded → loading → loaded → optimized
    ↓         ↓        ↓         ↓
  lazy → priority → responsive → cached
```

**Transitions**:
- `unloaded → loading`: Image request initiated
- `loading → loaded`: Image successfully loaded
- `loaded → optimized`: Image optimization applied
- `optimized → cached`: Image cached for future use

### CSS Optimization States
```
unorganized → analyzed → optimized → purged
     ↓           ↓          ↓         ↓
  legacy → modern → tokenized → minimal
```

**Transitions**:
- `unorganized → analyzed`: CSS audit completed
- `analyzed → optimized`: CSS architecture improved
- `optimized → purged`: Unused CSS removed
- `purged → minimal`: Final optimization applied

## Data Relationships

### Component → CSS Variables
- **Relationship**: Many-to-many
- **Purpose**: Track which components use which design tokens
- **Implementation**: Usage tracking in CSS variables entity

### Font Family → Typography Scale
- **Relationship**: One-to-many
- **Purpose**: Define typography hierarchy for each font family
- **Implementation**: Typography scale references font family ID

### Image Asset → Component References
- **Relationship**: One-to-many
- **Purpose**: Track which components use which images
- **Implementation**: Usage count in image asset entity

### Performance Metric → Optimization Action
- **Relationship**: One-to-many
- **Purpose**: Track which optimizations affect which metrics
- **Implementation**: Optimization action references metric ID

## Validation Rules

### CSS Variables Validation
- Variable names must start with `--` and use kebab-case
- Values must be valid CSS values for the property type
- Categories must be from predefined list
- Usage tracking must be updated when components change

### Font Family Validation
- Font names must be unique within language scope
- Weights must be valid CSS font-weight values
- Fallback chain must include system fonts
- Performance metrics must be measurable and recent

### Image Asset Validation
- Filename must be unique within category
- Alt text must be provided for accessibility compliance
- File size must be within performance thresholds
- Dimensions must match responsive image requirements

### Performance Metric Validation
- Values must be positive numbers
- Status must be calculated based on threshold comparison
- Measurement date must be recent (within 30 days)
- Device type and connection speed must be from predefined lists

## Data Integrity

### Referential Integrity
- Font family references must exist before use
- Image asset references must be valid
- CSS variable references must be resolvable
- Performance metric references must be current

### Consistency Rules
- Font loading strategy must be consistent across components
- Image optimization level must match performance requirements
- CSS variable values must be consistent across usage
- Performance metrics must be measured under consistent conditions

### Data Quality
- All entities must have required fields populated
- Relationships must be properly maintained
- Validation rules must be enforced
- Performance data must be current and accurate
