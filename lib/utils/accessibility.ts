/**
 * Accessibility Testing Utilities
 * 
 * This module provides utilities for testing and validating
 * accessibility features in the footer component.
 */

import { FooterContent, FooterInteraction } from '@/lib/types/footer'

// Accessibility test results
export interface AccessibilityTestResult {
  test: string
  passed: boolean
  score: number
  message: string
  element?: HTMLElement
  suggestions?: string[]
}

// Accessibility test suite
export interface AccessibilityTestSuite {
  results: AccessibilityTestResult[]
  overallScore: number
  passedTests: number
  totalTests: number
  recommendations: string[]
}

// Color contrast ratios
export const CONTRAST_RATIOS = {
  AA: 4.5,
  AAA: 7.0,
  LARGE_TEXT_AA: 3.0,
  LARGE_TEXT_AAA: 4.5
} as const

// Accessibility test functions
export const testHeadingHierarchy = (element: HTMLElement): AccessibilityTestResult => {
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)))
  
  let violations = 0
  for (let i = 1; i < headingLevels.length; i++) {
    if (headingLevels[i] > headingLevels[i-1] + 1) {
      violations++
    }
  }
  
  const score = Math.max(0, 100 - (violations * 20))
  const passed = violations === 0
  
  return {
    test: 'Heading Hierarchy',
    passed,
    score,
    message: passed ? 'Proper heading hierarchy found' : `${violations} heading hierarchy violations found`,
    suggestions: passed ? [] : ['Ensure headings follow logical order (h1 > h2 > h3)']
  }
}

export const testAltText = (element: HTMLElement): AccessibilityTestResult => {
  const images = element.querySelectorAll('img')
  let missingAlt = 0
  let emptyAlt = 0
  
  images.forEach(img => {
    if (!img.alt) {
      missingAlt++
    } else if (img.alt.trim() === '') {
      emptyAlt++
    }
  })
  
  const totalIssues = missingAlt + emptyAlt
  const score = Math.max(0, 100 - (totalIssues * 25))
  const passed = totalIssues === 0
  
  return {
    test: 'Image Alt Text',
    passed,
    score,
    message: passed ? 'All images have proper alt text' : `${totalIssues} images missing or have empty alt text`,
    suggestions: passed ? [] : ['Add descriptive alt text to all images']
  }
}

export const testLinkText = (element: HTMLElement): AccessibilityTestResult => {
  const links = element.querySelectorAll('a')
  let missingText = 0
  let emptyText = 0
  
  links.forEach(link => {
    if (!link.textContent?.trim() && !link.getAttribute('aria-label')) {
      missingText++
    } else if (link.textContent?.trim() === '') {
      emptyText++
    }
  })
  
  const totalIssues = missingText + emptyText
  const score = Math.max(0, 100 - (totalIssues * 20))
  const passed = totalIssues === 0
  
  return {
    test: 'Link Text',
    passed,
    score,
    message: passed ? 'All links have proper text content' : `${totalIssues} links missing or have empty text`,
    suggestions: passed ? [] : ['Add descriptive text or aria-label to all links']
  }
}

export const testARIA = (element: HTMLElement): AccessibilityTestResult => {
  const interactiveElements = element.querySelectorAll('[role="button"], [role="link"], [role="tab"]')
  let missingLabels = 0
  
  interactiveElements.forEach(el => {
    if (!el.getAttribute('aria-label') && !el.textContent?.trim()) {
      missingLabels++
    }
  })
  
  const score = Math.max(0, 100 - (missingLabels * 25))
  const passed = missingLabels === 0
  
  return {
    test: 'ARIA Labels',
    passed,
    score,
    message: passed ? 'All interactive elements have proper ARIA labels' : `${missingLabels} elements missing ARIA labels`,
    suggestions: passed ? [] : ['Add aria-label or aria-labelledby to interactive elements']
  }
}

export const testColorContrast = (element: HTMLElement): AccessibilityTestResult => {
  // This is a simplified test - in a real implementation, you'd use a library like color-contrast
  const textElements = element.querySelectorAll('p, span, div, a, h1, h2, h3, h4, h5, h6')
  let contrastIssues = 0
  
  textElements.forEach(el => {
    const styles = window.getComputedStyle(el)
    const color = styles.color
    const backgroundColor = styles.backgroundColor
    
    // Simplified contrast check (in reality, you'd calculate actual contrast ratio)
    if (color === backgroundColor) {
      contrastIssues++
    }
  })
  
  const score = Math.max(0, 100 - (contrastIssues * 30))
  const passed = contrastIssues === 0
  
  return {
    test: 'Color Contrast',
    passed,
    score,
    message: passed ? 'Color contrast meets accessibility standards' : `${contrastIssues} elements have contrast issues`,
    suggestions: passed ? [] : ['Ensure text has sufficient contrast against background']
  }
}

export const testKeyboardNavigation = (element: HTMLElement): AccessibilityTestResult => {
  const focusableElements = element.querySelectorAll('a, button, input, select, textarea, [tabindex]')
  let navigationIssues = 0
  
  focusableElements.forEach(el => {
    if (el.getAttribute('tabindex') === '-1' && !el.getAttribute('aria-hidden')) {
      navigationIssues++
    }
  })
  
  const score = Math.max(0, 100 - (navigationIssues * 20))
  const passed = navigationIssues === 0
  
  return {
    test: 'Keyboard Navigation',
    passed,
    score,
    message: passed ? 'All interactive elements are keyboard accessible' : `${navigationIssues} elements not keyboard accessible`,
    suggestions: passed ? [] : ['Ensure all interactive elements are keyboard accessible']
  }
}

export const testSemanticHTML = (element: HTMLElement): AccessibilityTestResult => {
  const semanticElements = element.querySelectorAll('header, nav, main, section, article, aside, footer')
  const divElements = element.querySelectorAll('div')
  
  const semanticRatio = semanticElements.length / (semanticElements.length + divElements.length)
  const score = Math.round(semanticRatio * 100)
  const passed = score >= 70
  
  return {
    test: 'Semantic HTML',
    passed,
    score,
    message: passed ? 'Good use of semantic HTML elements' : 'Consider using more semantic HTML elements',
    suggestions: passed ? [] : ['Use semantic HTML elements (header, nav, main, section, article, aside, footer)']
  }
}

export const testFocusManagement = (element: HTMLElement): AccessibilityTestResult => {
  const focusableElements = element.querySelectorAll('a, button, input, select, textarea, [tabindex]')
  let focusIssues = 0
  
  focusableElements.forEach(el => {
    if (!el.getAttribute('tabindex') && !el.matches('a, button, input, select, textarea')) {
      focusIssues++
    }
  })
  
  const score = Math.max(0, 100 - (focusIssues * 15))
  const passed = focusIssues === 0
  
  return {
    test: 'Focus Management',
    passed,
    score,
    message: passed ? 'Proper focus management implemented' : `${focusIssues} focus management issues found`,
    suggestions: passed ? [] : ['Ensure proper focus management for interactive elements']
  }
}

// Run all accessibility tests
export const runAccessibilityTests = (element: HTMLElement): AccessibilityTestSuite => {
  const tests = [
    testHeadingHierarchy,
    testAltText,
    testLinkText,
    testARIA,
    testColorContrast,
    testKeyboardNavigation,
    testSemanticHTML,
    testFocusManagement
  ]
  
  const results = tests.map(test => test(element))
  const passedTests = results.filter(result => result.passed).length
  const totalTests = results.length
  const overallScore = Math.round(results.reduce((sum, result) => sum + result.score, 0) / totalTests)
  
  const recommendations = results
    .filter(result => !result.passed)
    .flatMap(result => result.suggestions || [])
  
  return {
    results,
    overallScore,
    passedTests,
    totalTests,
    recommendations
  }
}

// Accessibility validation for footer content
export const validateFooterContent = (content: FooterContent): AccessibilityTestResult => {
  const issues = []
  
  // Check contact information
  if (!content.contactInfo.phone || !content.contactInfo.email) {
    issues.push('Missing contact information')
  }
  
  // Check navigation links
  if (content.navigation.length === 0) {
    issues.push('No navigation links provided')
  }
  
  // Check social media links
  if (content.socialMedia.length === 0) {
    issues.push('No social media links provided')
  }
  
  // Check trust badges
  if (content.trustBadges.length === 0) {
    issues.push('No trust badges provided')
  }
  
  const score = Math.max(0, 100 - (issues.length * 20))
  const passed = issues.length === 0
  
  return {
    test: 'Footer Content Validation',
    passed,
    score,
    message: passed ? 'Footer content is complete' : `${issues.length} content issues found`,
    suggestions: passed ? [] : issues
  }
}

// Accessibility monitoring
export const monitorAccessibility = (element: HTMLElement, callback: (result: AccessibilityTestSuite) => void) => {
  const runTests = () => {
    const result = runAccessibilityTests(element)
    callback(result)
  }
  
  // Run tests initially
  runTests()
  
  // Monitor for changes
  const observer = new MutationObserver(runTests)
  observer.observe(element, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['aria-label', 'aria-describedby', 'role', 'tabindex']
  })
  
  return () => observer.disconnect()
}

// Accessibility utilities
export const accessibilityUtils = {
  testHeadingHierarchy,
  testAltText,
  testLinkText,
  testARIA,
  testColorContrast,
  testKeyboardNavigation,
  testSemanticHTML,
  testFocusManagement,
  runAccessibilityTests,
  validateFooterContent,
  monitorAccessibility
}

export default accessibilityUtils
