/**
 * Critical CSS Inlining for Juewei UI
 * Extracts and inlines critical CSS for above-the-fold content
 */

// Critical CSS for above-the-fold content
export const criticalCSS = `
/* Critical CSS - Above the fold styles */
.hero-carousel {
  display: block;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.hero-slide.active {
  opacity: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
}

.hero-text {
  text-align: center;
  color: white;
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.hero-description {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

.hero-button {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s ease-out;
  min-width: 200px;
}

.hero-button-primary {
  background: linear-gradient(135deg, #dc2626, #ea580c);
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.hero-button-secondary {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
}

/* Navigation */
.navigation-dots {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.dot.active {
  background: white;
  transform: scale(1.25);
}

/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  height: 5rem;
  align-items: center;
  justify-content: space-between;
}

.logo {
  height: 3rem;
  width: auto;
  transition: transform 0.3s ease-out;
}

.logo:hover {
  transform: scale(1.05);
}

/* Banner Section */
.banner-section {
  position: relative;
  width: 100%;
  padding: 6rem 0;
  background: linear-gradient(135deg, #fed7aa, #fecaca);
  overflow: hidden;
}

.banner-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.banner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.banner-text {
  flex: 1;
  text-align: center;
}

.banner-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: #1f2937;
}

.banner-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  line-height: 1.3;
  color: #374151;
}

.banner-description {
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  color: #6b7280;
  max-width: 32rem;
}

.banner-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

.banner-button {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s ease-out;
  min-width: 200px;
}

.banner-button-primary {
  background: linear-gradient(135deg, #dc2626, #ea580c);
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.banner-button-secondary {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 2px solid #fed7aa;
  color: #1f2937;
}

/* Responsive Design */
@media (min-width: 768px) {
  .hero-title {
    font-size: 4rem;
  }
  
  .hero-subtitle {
    font-size: 2rem;
  }
  
  .hero-buttons {
    flex-direction: row;
  }
  
  .banner-content {
    flex-direction: row;
    gap: 4rem;
  }
  
  .banner-text {
    text-align: left;
  }
  
  .banner-buttons {
    justify-content: flex-start;
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 5rem;
  }
  
  .hero-subtitle {
    font-size: 2.5rem;
  }
  
  .banner-title {
    font-size: 4rem;
  }
  
  .banner-subtitle {
    font-size: 2rem;
  }
}

/* Font Loading Optimization */
@font-face {
  font-family: 'Source Han Sans';
  src: url('/fonts/source_han_sans/SourceHanSansCN-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Source Han Sans';
  src: url('/fonts/source_han_sans/SourceHanSansCN-Medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Source Han Sans';
  src: url('/fonts/source_han_sans/SourceHanSansCN-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Base Styles */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Source Han Sans', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif;
  line-height: 1.6;
  color: #1f2937;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Utility Classes */
.container-wide {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.text-shadow-xl {
  text-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}
`;

// Function to inline critical CSS
export function inlineCriticalCSS() {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    style.setAttribute('data-critical', 'true');
    document.head.insertBefore(style, document.head.firstChild);
  }
}

// Function to load non-critical CSS asynchronously
export function loadNonCriticalCSS() {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/styles/non-critical.css';
    link.media = 'print';
    link.onload = function() {
      (this as HTMLLinkElement).media = 'all';
    };
    document.head.appendChild(link);
  }
}

// Performance monitoring for CSS loading
export function monitorCSSPerformance() {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('.css')) {
          console.log(`CSS loaded: ${entry.name} in ${entry.duration}ms`);
        }
      }
    });
    observer.observe({ entryTypes: ['resource'] });
  }
}
