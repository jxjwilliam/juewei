# Quickstart: Multi-Language UI Support

**Feature**: Multi-Language UI Support  
**Date**: 2025-01-27  
**Purpose**: Quick implementation guide for adding multi-language support

## Overview

This feature adds support for 简体中文 (Simplified Chinese), 繁体中文 (Traditional Chinese), and English languages to the Juewei UI website. It includes a language dropdown in the navigation bar and translates navigation menu items.

## Implementation Steps

### 1. Update Language Types

**File**: `lib/i18n/translations.ts`

```typescript
// Update the Language type to include Traditional Chinese
export type Language = "zh" | "zh-TW" | "en"

// Update the languages object
export const languages = {
  zh: { name: "简体中文", flag: "🇨🇳" },
  "zh-TW": { name: "繁體中文", flag: "🇹🇼" },
  en: { name: "English", flag: "🇺🇸" },
}
```

### 2. Add Traditional Chinese Translations

**File**: `lib/i18n/translations.ts`

```typescript
export const translations = {
  // ... existing zh and en translations
  "zh-TW": {
    nav: {
      home: "首頁",
      products: "產品",
      about: "關於我們",
      contact: "聯繫我們",
      partnership: "合作下單",
    },
    // ... other sections
  },
}
```

### 3. Update Language Context

**File**: `lib/i18n/language-context.tsx`

```typescript
// Update the language validation to include zh-TW
useEffect(() => {
  const saved = localStorage.getItem("language") as Language
  if (saved && (saved === "zh" || saved === "zh-TW" || saved === "en")) {
    setLanguageState(saved)
  }
}, [])
```

### 4. Update Language Switcher Component

**File**: `components/language-switcher.tsx`

```typescript
// The existing component should work with the updated languages object
// No changes needed if using the existing pattern
```

### 5. Update Header Component

**File**: `components/header.tsx`

```typescript
// Add the language switcher to the header
import { LanguageSwitcher } from "./language-switcher"

// In the header JSX, add the language switcher
<div className="flex items-center gap-4">
  <LanguageSwitcher />
  {/* other header content */}
</div>
```

### 6. Update Navigation Items

**File**: `components/header.tsx`

```typescript
// Replace hardcoded navigation with translated versions
import { useLanguage } from "@/lib/i18n/language-context"

export function Header() {
  const { t } = useLanguage()
  
  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.products"), href: "/products" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
    { name: t("nav.partnership"), href: "/partnership" },
  ]
  
  // ... rest of component
}
```

## Testing

### Unit Tests

```typescript
// Test language context
describe("LanguageContext", () => {
  it("should default to zh", () => {
    // Test default language
  })
  
  it("should persist language selection", () => {
    // Test localStorage persistence
  })
  
  it("should handle invalid language codes", () => {
    // Test error handling
  })
})
```

### Integration Tests

```typescript
// Test language switcher component
describe("LanguageSwitcher", () => {
  it("should display all language options", () => {
    // Test dropdown options
  })
  
  it("should update language on selection", () => {
    // Test language switching
  })
  
  it("should be accessible via keyboard", () => {
    // Test keyboard navigation
  })
})
```

### E2E Tests

```typescript
// Test complete user flow
describe("Multi-language Support", () => {
  it("should allow language switching", () => {
    // Test complete user journey
  })
  
  it("should persist language across page navigation", () => {
    // Test persistence
  })
})
```

## Verification Checklist

- [ ] Language dropdown appears in navigation bar
- [ ] All three languages are available in dropdown
- [ ] Language selection updates navigation menu text
- [ ] Language preference persists across page navigation
- [ ] Language preference persists across browser sessions
- [ ] Fallback to default language when localStorage unavailable
- [ ] Keyboard navigation works for dropdown
- [ ] Screen reader accessibility is maintained
- [ ] Language switching completes in under 2 seconds

## Troubleshooting

### Common Issues

1. **Language not persisting**: Check localStorage availability and error handling
2. **Translations not updating**: Verify language context is properly connected
3. **Accessibility issues**: Ensure proper ARIA labels and keyboard navigation
4. **Performance issues**: Check for unnecessary re-renders in language context

### Debug Tools

```typescript
// Add to language context for debugging
if (process.env.NODE_ENV === 'development') {
  console.log('Current language:', language)
  console.log('Available translations:', Object.keys(translations[language]))
}
```

## Rollback Plan

If issues arise, rollback steps:

1. Revert language type changes
2. Remove Traditional Chinese translations
3. Restore original navigation hardcoded text
4. Remove language switcher from header

## Performance Considerations

- Language context updates should be minimal
- Use React.memo for expensive components
- Debounce rapid language changes
- Optimize translation lookups
