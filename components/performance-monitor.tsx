'use client';

import { useEffect } from 'react';
import { performanceMonitor, reportPerformance } from '@/lib/performance';

/**
 * Performance Monitor Component
 * Tracks Core Web Vitals and performance metrics for the Juewei UI website
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Initialize performance monitoring
    void performanceMonitor;
    
    // Monitor font loading performance
    if (typeof window !== 'undefined') {
      // Track font loading
      document.fonts.ready.then(() => {
        const fontLoadTime = performance.now();
        console.log(`Fonts loaded in ${fontLoadTime}ms`);
        
        // Report font performance
        reportPerformance({
          fontLoadTime,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
        });
      });
      
      // Monitor image loading performance
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        img.addEventListener('load', () => {
          const loadTime = performance.now();
          console.log(`Image ${index + 1} loaded in ${loadTime}ms`);
          
          // Report image performance
          reportPerformance({
            imageLoadTime: loadTime,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
          });
        });
      });
      
      // Monitor Core Web Vitals
      if ('PerformanceObserver' in window) {
        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              console.log(`FCP: ${entry.startTime}ms`);
              reportPerformance({
                fcp: entry.startTime,
                timestamp: Date.now(),
                userAgent: navigator.userAgent,
              });
            }
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              console.log(`LCP: ${entry.startTime}ms`);
              reportPerformance({
                lcp: entry.startTime,
                timestamp: Date.now(),
                userAgent: navigator.userAgent,
              });
            }
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value || 0;
            }
          }
          console.log(`CLS: ${clsValue}`);
          reportPerformance({
            cls: clsValue,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }
    }
    
    // Cleanup function
    return () => {
      // Cleanup any observers if needed
    };
  }, []);
  
  // This component doesn't render anything
  return null;
}

/**
 * Performance Metrics Display Component
 * Shows current performance metrics in development
 */
export function PerformanceMetrics() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm font-mono z-50">
      <div className="mb-2 font-bold">Performance Metrics</div>
      <div>FCP: <span id="fcp-metric">-</span>ms</div>
      <div>LCP: <span id="lcp-metric">-</span>ms</div>
      <div>CLS: <span id="cls-metric">-</span>ms</div>
      <div>Fonts: <span id="font-metric">-</span>ms</div>
    </div>
  );
}

/**
 * Performance Optimization Suggestions
 * Provides suggestions for performance improvements
 */
export function PerformanceSuggestions() {
  const suggestions = [
    {
      metric: 'FCP',
      threshold: 1800,
      suggestion: 'Optimize critical CSS and reduce render-blocking resources',
    },
    {
      metric: 'LCP',
      threshold: 2500,
      suggestion: 'Optimize images and preload critical resources',
    },
    {
      metric: 'CLS',
      threshold: 0.1,
      suggestion: 'Add size attributes to images and avoid layout shifts',
    },
    {
      metric: 'Font Loading',
      threshold: 200,
      suggestion: 'Use font-display: swap and preload critical fonts',
    },
  ];
  
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <h3 className="font-semibold text-yellow-800 mb-2">Performance Optimization Suggestions</h3>
      <ul className="space-y-2 text-sm text-yellow-700">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="font-medium">{suggestion.metric}:</span>
            <span>{suggestion.suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
