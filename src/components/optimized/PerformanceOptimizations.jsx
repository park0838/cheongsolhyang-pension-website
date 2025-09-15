// Performance optimization utilities and components

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

// Enhanced media query hook with performance optimizations
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = (event) => setMatches(event.matches)

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

// Optimized reduced motion hook
export const useReducedMotion = () => {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

// Performance-aware intersection observer
export const usePerformantIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const [elementRef, setElementRef] = useState(null)

  const observerOptions = useMemo(() => ({
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  }), [options])

  useEffect(() => {
    if (!elementRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      observerOptions
    )

    observer.observe(elementRef)

    return () => {
      if (elementRef) {
        observer.unobserve(elementRef)
      }
    }
  }, [elementRef, hasIntersected, observerOptions])

  const ref = useCallback((node) => {
    if (node !== null) {
      setElementRef(node)
    }
  }, [])

  return { ref, isIntersecting, hasIntersected }
}

// Optimized lazy loading component
export const LazySection = ({ children, className = '', fallback = null }) => {
  const { ref, hasIntersected } = usePerformantIntersectionObserver({
    rootMargin: '100px' // Load earlier for smoother UX
  })

  return (
    <div ref={ref} className={className}>
      {hasIntersected ? children : fallback}
    </div>
  )
}

// Performance-optimized loading spinner
export const OptimizedLoadingSpinner = ({ size = 'medium' }) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div
        className={`${sizes[size]} border-2 border-primary-600 border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="로딩 중"
      />
    </div>
  )
}

// Optimized image with progressive loading
export const ProgressiveImage = ({
  src,
  placeholder,
  alt,
  className = '',
  priority = false,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(placeholder || '')
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!src) return

    const img = new Image()
    img.src = src
    img.onload = () => {
      setImgSrc(src)
      setIsLoaded(true)
    }
    img.onerror = () => {
      setHasError(true)
    }
  }, [src])

  if (hasError) {
    return (
      <div className={`bg-neutral-100 flex items-center justify-center ${className}`}>
        <span className="text-neutral-400 text-sm">이미지를 불러올 수 없습니다</span>
      </div>
    )
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-70'
      } ${className}`}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      {...props}
    />
  )
}

// Performance monitoring component
export const WebVitalsReporter = () => {
  useEffect(() => {
    // Import web-vitals dynamically to reduce initial bundle size
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      const sendToAnalytics = (metric) => {
        // Send to your analytics service
        console.log('Web Vital:', {
          name: metric.name,
          value: metric.value,
          id: metric.id,
          delta: metric.delta,
        })

        // Example: Send to Google Analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
          })
        }
      }

      getCLS(sendToAnalytics)
      getFID(sendToAnalytics)
      getFCP(sendToAnalytics)
      getLCP(sendToAnalytics)
      getTTFB(sendToAnalytics)
    })
  }, [])

  return null
}

// Optimized animation wrapper with reduced motion support
export const MotionWrapper = ({
  children,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.6 },
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion()

  const optimizedTransition = prefersReducedMotion
    ? { duration: 0.2 }
    : transition

  const optimizedInitial = prefersReducedMotion
    ? { opacity: 0 }
    : initial

  const optimizedAnimate = prefersReducedMotion
    ? { opacity: 1 }
    : animate

  return (
    <motion.div
      initial={optimizedInitial}
      animate={optimizedAnimate}
      transition={optimizedTransition}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Font loading optimization utility
export const FontPreloader = ({ fonts }) => {
  useEffect(() => {
    fonts.forEach(font => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = font.url
      link.as = 'font'
      link.type = font.type || 'font/woff2'
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    // Cleanup function
    return () => {
      fonts.forEach(font => {
        const link = document.querySelector(`link[href="${font.url}"]`)
        if (link) {
          document.head.removeChild(link)
        }
      })
    }
  }, [fonts])

  return null
}

// Resource hints component for performance
export const ResourceHints = () => {
  useEffect(() => {
    const hints = [
      { rel: 'dns-prefetch', href: '//images.unsplash.com' },
      { rel: 'dns-prefetch', href: '//tile.openstreetmap.org' },
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://images.unsplash.com' },
    ]

    hints.forEach(hint => {
      const link = document.createElement('link')
      link.rel = hint.rel
      link.href = hint.href
      if (hint.crossorigin) {
        link.crossOrigin = hint.crossorigin
      }
      document.head.appendChild(link)
    })
  }, [])

  return null
}

// Performance budget monitor (development only)
export const PerformanceBudgetMonitor = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const checkBudget = () => {
      if (performance && performance.getEntriesByType) {
        const entries = performance.getEntriesByType('navigation')
        if (entries.length > 0) {
          const [entry] = entries

          // Check various performance metrics
          const metrics = {
            'DOM Content Loaded': entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
            'Load Complete': entry.loadEventEnd - entry.loadEventStart,
            'DNS Lookup': entry.domainLookupEnd - entry.domainLookupStart,
            'TCP Connection': entry.connectEnd - entry.connectStart,
          }

          console.group('🚀 Performance Budget Check')
          Object.entries(metrics).forEach(([name, value]) => {
            console.log(`${name}: ${Math.round(value)}ms`)
          })
          console.groupEnd()
        }
      }
    }

    // Check on page load
    if (document.readyState === 'complete') {
      setTimeout(checkBudget, 1000)
    } else {
      window.addEventListener('load', () => {
        setTimeout(checkBudget, 1000)
      })
    }
  }, [])

  return null
}

// Bundle size analyzer (development only)
export const BundleAnalyzer = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const analyzeChunks = async () => {
      const chunkInfo = []

      // Analyze loaded scripts
      const scripts = document.querySelectorAll('script[src]')
      for (const script of scripts) {
        try {
          const response = await fetch(script.src)
          const size = response.headers.get('content-length')
          if (size) {
            chunkInfo.push({
              name: script.src.split('/').pop(),
              size: parseInt(size),
              compressed: response.headers.get('content-encoding') ? 'Yes' : 'No'
            })
          }
        } catch (error) {
          // Handle CORS or network errors silently
        }
      }

      if (chunkInfo.length > 0) {
        console.group('📦 Bundle Analysis')
        console.table(chunkInfo)

        const totalSize = chunkInfo.reduce((sum, chunk) => sum + chunk.size, 0)
        console.log(`Total JavaScript: ${(totalSize / 1024).toFixed(2)} KB`)

        // Performance budget warnings
        if (totalSize > 250000) { // 250KB
          console.warn('⚠️ JavaScript bundle exceeds performance budget (250KB)')
        }
        console.groupEnd()
      }
    }

    setTimeout(analyzeChunks, 2000)
  }, [])

  return null
}

// Export all optimizations as a single component for easy integration
export const PerformanceOptimizations = () => {
  const criticalFonts = [
    {
      url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.woff2',
      type: 'font/woff2'
    },
    {
      url: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtXK-F2qO03q.woff2',
      type: 'font/woff2'
    }
  ]

  return (
    <>
      <ResourceHints />
      <FontPreloader fonts={criticalFonts} />
      <WebVitalsReporter />
      <PerformanceBudgetMonitor />
      <BundleAnalyzer />
    </>
  )
}

export default PerformanceOptimizations