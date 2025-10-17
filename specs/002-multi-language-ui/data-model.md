# Data Model: Multi-Language UI Support

**Feature**: Multi-Language UI Support  
**Date**: 2025-01-27  
**Purpose**: Data model and entity definitions for multi-language support implementation

## Entities

### Language Selection

**Purpose**: Represents user's chosen language preference  
**Storage**: Browser localStorage with key "language"  
**Type**: String enum

**Fields**:
- `value`: Language code ("zh" | "zh-TW" | "en")
- `displayName`: Human-readable language name
- `flag`: Unicode flag emoji for visual representation

**Validation Rules**:
- Must be one of: "zh", "zh-TW", "en"
- Fallback to "zh" if invalid or missing
- Case-sensitive matching

**State Transitions**:
- `undefined` → `"zh"` (default on first visit)
- `"zh"` ↔ `"zh-TW"` ↔ `"en"` (user selection)
- `invalid` → `"zh"` (error fallback)

### Navigation Items

**Purpose**: Menu items that require translation  
**Storage**: Static configuration in translation files  
**Type**: Object with language-specific text

**Fields**:
- `key`: Navigation item identifier (e.g., "home", "products")
- `href`: Route path (language-independent)
- `translations`: Object mapping language codes to display text

**Validation Rules**:
- All navigation items must have translations for all supported languages
- Href paths must be valid Next.js routes
- Keys must be unique and descriptive

### Language Context

**Purpose**: React context providing language state and translation functions  
**Storage**: React Context + localStorage  
**Type**: React Context with hooks

**Fields**:
- `language`: Current language code
- `setLanguage`: Function to change language
- `t`: Translation function for accessing translated text

**Validation Rules**:
- Context must be available to all components that need translation
- setLanguage must update both context and localStorage
- Translation function must handle missing keys gracefully

## Data Flow

### Language Selection Flow

1. **Initial Load**:
   - Check localStorage for saved language
   - If found and valid, use saved language
   - If not found or invalid, default to "zh"
   - Initialize React Context with selected language

2. **Language Change**:
   - User selects new language from dropdown
   - Update React Context state immediately
   - Save to localStorage for persistence
   - Re-render components with new translations

3. **Page Navigation**:
   - Maintain language context across route changes
   - No localStorage access needed during navigation
   - Context persists for entire session

### Translation Resolution Flow

1. **Component Render**:
   - Component calls `t()` function with translation key
   - Function looks up key in current language's translation object
   - Returns translated text or fallback if missing

2. **Missing Translation Handling**:
   - Log warning for missing translations in development
   - Return translation key as fallback in production
   - Graceful degradation for incomplete translations

## Storage Schema

### localStorage Structure

```json
{
  "language": "zh" | "zh-TW" | "en"
}
```

### Translation File Structure

```typescript
export const translations = {
  zh: {
    nav: {
      home: "首页",
      products: "产品",
      about: "关于我们",
      contact: "联系我们",
      partnership: "合作下单"
    }
  },
  "zh-TW": {
    nav: {
      home: "首頁",
      products: "產品", 
      about: "關於我們",
      contact: "聯繫我們",
      partnership: "合作下單"
    }
  },
  en: {
    nav: {
      home: "Home",
      products: "Products",
      about: "About Us", 
      contact: "Contact",
      partnership: "Partnership"
    }
  }
}
```

## Error Handling

### Invalid Language Codes
- **Detection**: Check against valid language codes array
- **Response**: Reset to default language ("zh")
- **Logging**: Log error in development mode
- **User Impact**: Seamless fallback, no error visible to user

### Missing Translations
- **Detection**: Translation key not found in current language
- **Response**: Return translation key as fallback text
- **Logging**: Log warning in development mode
- **User Impact**: Shows untranslated key, but functionality continues

### localStorage Unavailable
- **Detection**: localStorage.setItem throws error
- **Response**: Continue with in-memory state only
- **Logging**: Log warning about persistence loss
- **User Impact**: Language selection works for session, but not persisted

## Performance Considerations

### Context Updates
- **Frequency**: Only on language change (infrequent)
- **Scope**: All components using language context
- **Optimization**: Use React.memo for expensive components

### Translation Lookups
- **Frequency**: Every component render
- **Scope**: Components displaying translated text
- **Optimization**: Memoize translation function results

### localStorage Access
- **Frequency**: Once on load, once per language change
- **Scope**: Language context initialization
- **Optimization**: Debounce rapid language changes
