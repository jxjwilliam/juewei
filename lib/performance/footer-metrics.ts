/**
 * Footer Performance Metrics
 * 
 * This module provides performance monitoring and metrics collection
 * for the Footer component, including loading times, user interactions,
 * and accessibility metrics.
 */

export interface FooterMetrics {
  loadTime: number
  renderTime: number
  imageLoadTime: number
  interactionCount: number
  accessibilityScore: number
  responsiveBreakpoint: string
  timestamp: Date
}

export interface FooterInteraction {
  type: 'click' | 'hover' | 'focus' | 'scroll'
  element: string
  timestamp: Date
  duration?: number
}

export interface FooterPerformanceConfig {
  enableMetrics: boolean
  enableInteractions: boolean
  enableAccessibility: boolean
  sampleRate: number // 0-1, percentage of users to track
}

class FooterPerformanceMonitor {
  private config: FooterPerformanceConfig
  private metrics: FooterMetrics[] = []
  private interactions: FooterInteraction[] = []
  private startTime: number = 0
  private renderStartTime: number = 0

  constructor(config: Partial<FooterPerformanceConfig> = {}) {
    this.config = {
      enableMetrics: true,
      enableInteractions: true,
      enableAccessibility: true,
      sampleRate: 0.1, // Track 10% of users by default
      ...config
    }
  }

  /**
   * Initialize performance monitoring for the footer
   */
  public initialize(): void {
    if (!this.shouldTrack()) return

    this.startTime = performance.now()
    this.renderStartTime = performance.now()
    
    // Track footer load time
    if (this.config.enableMetrics) {
      this.trackLoadTime()
    }

    // Track user interactions
    if (this.config.enableInteractions) {
      this.trackInteractions()
    }

    // Track accessibility metrics
    if (this.config.enableAccessibility) {
      this.trackAccessibility()
    }
  }

  /**
   * Track footer load time and render performance
   */
  private trackLoadTime(): void {
    const loadTime = performance.now() - this.startTime
    const renderTime = performance.now() - this.renderStartTime

    // Track image loading performance
    this.trackImageLoadTime()

    // Record metrics
    const metrics: FooterMetrics = {
      loadTime,
      renderTime,
      imageLoadTime: 0, // Will be updated by trackImageLoadTime
      interactionCount: 0,
      accessibilityScore: 0, // Will be updated by trackAccessibility
      responsiveBreakpoint: this.getCurrentBreakpoint(),
      timestamp: new Date()
    }

    this.metrics.push(metrics)
    this.reportMetrics(metrics)
  }

  /**
   * Track image loading performance for social media QR codes
   */
  private trackImageLoadTime(): void {
    const images = document.querySelectorAll('footer img[alt*="QR Code"]')
    let loadedImages = 0
    const totalImages = images.length

    if (totalImages === 0) return

    const startTime = performance.now()

    images.forEach((img) => {
      const imageElement = img as HTMLImageElement;
      if (imageElement.complete) {
        loadedImages++
      } else {
        imageElement.addEventListener('load', () => {
          loadedImages++
          if (loadedImages === totalImages) {
            const loadTime = performance.now() - startTime
            this.updateImageLoadTime(loadTime)
          }
        })
      }
    })

    // If all images are already loaded
    if (loadedImages === totalImages) {
      const loadTime = performance.now() - startTime
      this.updateImageLoadTime(loadTime)
    }
  }

  /**
   * Track user interactions with footer elements
   */
  private trackInteractions(): void {
    const footer = document.querySelector('footer')
    if (!footer) return

    // Track clicks on navigation links
    const navLinks = footer.querySelectorAll('nav a')
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        this.recordInteraction('click', 'navigation-link', event.target as Element)
      })
    })

    // Track clicks on social media links
    const socialLinks = footer.querySelectorAll('a[href*="instagram"], a[href*="xiaohongshu"], a[href*="tiktok"], a[href*="weixin"]')
    socialLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        this.recordInteraction('click', 'social-media-link', event.target as Element)
      })
    })

    // Track hover interactions
    const interactiveElements = footer.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', (event) => {
        this.recordInteraction('hover', 'interactive-element', event.target as Element)
      })
    })

    // Track focus events for accessibility
    const focusableElements = footer.querySelectorAll('a, button, [tabindex]')
    focusableElements.forEach((element) => {
      element.addEventListener('focus', (event) => {
        this.recordInteraction('focus', 'focusable-element', event.target as Element)
      })
    })
  }

  /**
   * Track accessibility metrics
   */
  private trackAccessibility(): void {
    const footer = document.querySelector('footer')
    if (!footer) return

    let accessibilityScore = 100

    // Check for proper heading hierarchy
    const headings = footer.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)))
    
    // Check for heading hierarchy violations
    for (let i = 1; i < headingLevels.length; i++) {
      if (headingLevels[i] > headingLevels[i-1] + 1) {
        accessibilityScore -= 10
      }
    }

    // Check for missing alt text on images
    const images = footer.querySelectorAll('img')
    images.forEach((img) => {
      if (!img.alt || img.alt.trim() === '') {
        accessibilityScore -= 5
      }
    })

    // Check for proper link text
    const links = footer.querySelectorAll('a')
    links.forEach((link) => {
      if (!link.textContent?.trim() && !link.getAttribute('aria-label')) {
        accessibilityScore -= 5
      }
    })

    // Check for proper ARIA attributes
    const interactiveElements = footer.querySelectorAll('[role="button"], [role="link"]')
    interactiveElements.forEach((element) => {
      if (!element.getAttribute('aria-label') && !element.textContent?.trim()) {
        accessibilityScore -= 5
      }
    })

    this.updateAccessibilityScore(Math.max(0, accessibilityScore))
  }

  /**
   * Record a user interaction
   */
  private recordInteraction(type: FooterInteraction['type'], element: string, target: Element): void {
    const interaction: FooterInteraction = {
      type,
      element,
      timestamp: new Date(),
      duration: type === 'hover' ? performance.now() : undefined
    }

    this.interactions.push(interaction)
    this.updateInteractionCount()
  }

  /**
   * Get current responsive breakpoint
   */
  private getCurrentBreakpoint(): string {
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  /**
   * Determine if we should track this user
   */
  private shouldTrack(): boolean {
    return Math.random() < this.config.sampleRate
  }

  /**
   * Update image load time in latest metrics
   */
  private updateImageLoadTime(loadTime: number): void {
    if (this.metrics.length > 0) {
      this.metrics[this.metrics.length - 1].imageLoadTime = loadTime
    }
  }

  /**
   * Update accessibility score in latest metrics
   */
  private updateAccessibilityScore(score: number): void {
    if (this.metrics.length > 0) {
      this.metrics[this.metrics.length - 1].accessibilityScore = score
    }
  }

  /**
   * Update interaction count in latest metrics
   */
  private updateInteractionCount(): void {
    if (this.metrics.length > 0) {
      this.metrics[this.metrics.length - 1].interactionCount = this.interactions.length
    }
  }

  /**
   * Report metrics to analytics service
   */
  private reportMetrics(metrics: FooterMetrics): void {
    // Send to analytics service (e.g., Google Analytics, custom endpoint)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'footer_performance', {
        load_time: metrics.loadTime,
        render_time: metrics.renderTime,
        image_load_time: metrics.imageLoadTime,
        interaction_count: metrics.interactionCount,
        accessibility_score: metrics.accessibilityScore,
        breakpoint: metrics.responsiveBreakpoint
      })
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      // Footer Performance Metrics logged
    }
  }

  /**
   * Get collected metrics
   */
  public getMetrics(): FooterMetrics[] {
    return [...this.metrics]
  }

  /**
   * Get collected interactions
   */
  public getInteractions(): FooterInteraction[] {
    return [...this.interactions]
  }

  /**
   * Clear collected data
   */
  public clearData(): void {
    this.metrics = []
    this.interactions = []
  }

  /**
   * Get performance summary
   */
  public getPerformanceSummary(): {
    averageLoadTime: number
    averageRenderTime: number
    averageImageLoadTime: number
    totalInteractions: number
    averageAccessibilityScore: number
    breakpointDistribution: Record<string, number>
  } {
    if (this.metrics.length === 0) {
      return {
        averageLoadTime: 0,
        averageRenderTime: 0,
        averageImageLoadTime: 0,
        totalInteractions: 0,
        averageAccessibilityScore: 0,
        breakpointDistribution: {}
      }
    }

    const totalMetrics = this.metrics.length
    const averageLoadTime = this.metrics.reduce((sum, m) => sum + m.loadTime, 0) / totalMetrics
    const averageRenderTime = this.metrics.reduce((sum, m) => sum + m.renderTime, 0) / totalMetrics
    const averageImageLoadTime = this.metrics.reduce((sum, m) => sum + m.imageLoadTime, 0) / totalMetrics
    const averageAccessibilityScore = this.metrics.reduce((sum, m) => sum + m.accessibilityScore, 0) / totalMetrics

    const breakpointDistribution = this.metrics.reduce((acc, m) => {
      acc[m.responsiveBreakpoint] = (acc[m.responsiveBreakpoint] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      averageLoadTime,
      averageRenderTime,
      averageImageLoadTime,
      totalInteractions: this.interactions.length,
      averageAccessibilityScore,
      breakpointDistribution
    }
  }
}

// Export singleton instance
export const footerPerformanceMonitor = new FooterPerformanceMonitor()

// Export hook for React components
export function useFooterPerformance(config?: Partial<FooterPerformanceConfig>) {
  const monitor = new FooterPerformanceMonitor(config)
  
  return {
    initialize: () => monitor.initialize(),
    getMetrics: () => monitor.getMetrics(),
    getInteractions: () => monitor.getInteractions(),
    getPerformanceSummary: () => monitor.getPerformanceSummary(),
    clearData: () => monitor.clearData()
  }
}

// Export types for external use
// All types are already exported as interfaces above
