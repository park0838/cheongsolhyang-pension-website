import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, Calendar, Eye } from 'lucide-react'

// Optimized image configuration with responsive serving
const useOptimizedImages = () => useMemo(() => [
  {
    id: 1,
    // WebP format for modern browsers, with responsive sizes
    webp: {
      mobile: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?fm=webp&q=75&w=800&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?fm=webp&q=80&w=1200&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?fm=webp&q=80&w=2070&fit=crop'
    },
    fallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&fit=crop',
    alt: '청솔향 펜션 전경과 아름다운 산세',
    title: '자연 속 완벽한 휴식',
    subtitle: '강원도 대관령의 맑은 공기와 함께',
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
  },
  {
    id: 2,
    webp: {
      mobile: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?fm=webp&q=75&w=800&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?fm=webp&q=80&w=1200&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?fm=webp&q=80&w=2070&fit=crop'
    },
    fallback: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&fit=crop',
    alt: '청솔향 펜션 객실 내부',
    title: '프리미엄 숙박 경험',
    subtitle: '최고급 시설과 세심한 서비스',
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
  },
  {
    id: 3,
    webp: {
      mobile: 'https://images.unsplash.com/photo-1549294413-26f195200c16?fm=webp&q=75&w=800&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1549294413-26f195200c16?fm=webp&q=80&w=1200&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1549294413-26f195200c16?fm=webp&q=80&w=2070&fit=crop'
    },
    fallback: 'https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1200&fit=crop',
    alt: '주변 자연 환경과 등산로',
    title: '사계절 아름다운 풍경',
    subtitle: '등산과 산책을 즐길 수 있는 자연 속 힐링',
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
  },
  {
    id: 4,
    webp: {
      mobile: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?fm=webp&q=75&w=800&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?fm=webp&q=80&w=1200&fit=crop',
      desktop: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?fm=webp&q=80&w=2070&fit=crop'
    },
    fallback: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&fit=crop',
    alt: '펜션 부대시설과 수영장',
    title: '완벽한 휴식 공간',
    subtitle: '수영장, BBQ, 카페 등 다양한 부대시설',
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
  }
], [])

// Progressive image loading hook
const useProgressiveImage = (src, placeholder) => {
  const [imgSrc, setImgSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setImgSrc(src)
      setIsLoaded(true)
    }
  }, [src])

  return { imgSrc, isLoaded }
}

// Responsive image component
const ResponsiveImage = ({ image, isActive, priority = false }) => {
  const { imgSrc, isLoaded } = useProgressiveImage(
    priority ? image.webp.desktop : image.fallback,
    image.placeholder
  )

  return (
    <picture className="absolute inset-0">
      <source
        media="(max-width: 768px)"
        srcSet={`${image.webp.mobile} 800w`}
        type="image/webp"
      />
      <source
        media="(max-width: 1200px)"
        srcSet={`${image.webp.tablet} 1200w`}
        type="image/webp"
      />
      <source
        srcSet={`${image.webp.desktop} 2070w`}
        type="image/webp"
      />
      <img
        src={imgSrc}
        alt={image.alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-80'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        // Fixed aspect ratio to prevent CLS
        style={{ aspectRatio: '16/9' }}
      />
    </picture>
  )
}

const OptimizedHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroImages = useOptimizedImages()
  const prefersReducedMotion = useReducedMotion()

  // Optimized animation configurations based on motion preferences
  const animationConfig = useMemo(() => ({
    slideTransition: prefersReducedMotion
      ? { duration: 0.3 }
      : { duration: 1.2, ease: 'easeInOut' },
    contentAnimation: prefersReducedMotion
      ? { duration: 0.2 }
      : { duration: 1, delay: 0.3 },
    scaleEffect: prefersReducedMotion
      ? { scale: 1 }
      : { initial: { scale: 1.1 }, animate: { scale: 1 } }
  }), [prefersReducedMotion])

  // Memoized navigation handlers
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
  }, [])

  const scrollToNext = useCallback(() => {
    const nextSection = document.querySelector('#about')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Auto-advance slides with cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [heroImages.length])

  // Preload next image for smoother transitions
  useEffect(() => {
    const nextSlide = (currentSlide + 1) % heroImages.length
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = heroImages[nextSlide].webp.desktop
    document.head.appendChild(link)

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [currentSlide, heroImages])

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Optimized Loading */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, ...animationConfig.scaleEffect.initial }}
            animate={{ opacity: 1, ...animationConfig.scaleEffect.animate }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={animationConfig.slideTransition}
          >
            <ResponsiveImage
              image={heroImages[currentSlide]}
              isActive={true}
              priority={currentSlide === 0} // First image gets priority loading
            />

            {/* Optimized gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            <div className="absolute inset-0 bg-pattern-dots opacity-20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content with Reduced Motion Support */}
      <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 20 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={animationConfig.contentAnimation}
          >
            {/* Main Title with Proper Typography Loading */}
            <h1 className="text-hero text-white font-serif font-bold mb-6 text-shadow-lg">
              청솔향 펜션
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-subtitle text-cream-100 mb-4 text-shadow"
              initial={{ opacity: 0, y: prefersReducedMotion ? 10 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...animationConfig.contentAnimation, delay: 0.6 }}
            >
              자연 속에서 찾는 진정한 휴식
            </motion.p>

            {/* Dynamic subtitle with optimized re-renders */}
            <motion.p
              key={`${currentSlide}-subtitle`} // Stable key for better performance
              className="text-lg md:text-xl text-cream-200 mb-12 text-shadow"
              initial={{ opacity: 0, y: prefersReducedMotion ? 5 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.8, delay: 0.9 }}
            >
              {heroImages[currentSlide].subtitle}
            </motion.p>

            {/* Call to Action Buttons with Optimized Touch Targets */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: prefersReducedMotion ? 10 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...animationConfig.contentAnimation, delay: 1.2 }}
            >
              <motion.a
                href="#rooms"
                className="btn btn-primary btn-lg w-full sm:w-auto touch-manipulation"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#rooms')?.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{ minHeight: '44px' }} // WCAG touch target size
              >
                <Eye className="mr-2" size={20} />
                객실 보기
              </motion.a>

              <motion.a
                href="#reservation"
                className="btn btn-outline btn-lg w-full sm:w-auto bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary-800 touch-manipulation"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{ minHeight: '44px' }}
              >
                <Calendar className="mr-2" size={20} />
                지금 예약하기
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Optimized Slide Navigation */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-3" role="tablist" aria-label="이미지 슬라이드 선택">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 touch-manipulation ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              style={{ minWidth: '44px', minHeight: '44px' }} // Larger touch target
              aria-label={`${index + 1}번째 슬라이드로 이동`}
              role="tab"
              aria-selected={index === currentSlide}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator with Reduced Motion */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300 group touch-manipulation"
          animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-label="다음 섹션으로 스크롤"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          <span className="text-sm font-medium mb-2 group-hover:text-cream-100">
            아래로 스크롤
          </span>
          <ChevronDown size={24} className="group-hover:scale-110 transition-transform duration-300" />
        </motion.button>
      </motion.div>

      {/* Performance-Optimized Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="h-1 bg-white/20">
          <motion.div
            className="h-full bg-primary-400"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentSlide + 1) / heroImages.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Information Badge with Better Mobile Handling */}
      <motion.div
        className="absolute top-24 right-4 lg:right-8 z-30 glass rounded-xl p-4 text-white max-w-xs hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="text-sm space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span>체크인: 15:00</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span>체크아웃: 11:00</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span>Tel: 033-123-4567</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default OptimizedHero