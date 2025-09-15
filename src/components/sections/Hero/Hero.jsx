import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Calendar, Eye } from 'lucide-react'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Hero images with sample nature/mountain imagery
  const heroImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      alt: '청솔향 펜션 전경과 아름다운 산세',
      title: '자연 속 완벽한 휴식',
      subtitle: '강원도 대관령의 맑은 공기와 함께'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop',
      alt: '청솔향 펜션 객실 내부',
      title: '프리미엄 숙박 경험',
      subtitle: '최고급 시설과 세심한 서비스'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=2064&auto=format&fit=crop',
      alt: '주변 자연 환경과 등산로',
      title: '사계절 아름다운 풍경',
      subtitle: '등산과 산책을 즐길 수 있는 자연 속 힐링'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
      alt: '펜션 부대시설과 수영장',
      title: '완벽한 휴식 공간',
      subtitle: '수영장, BBQ, 카페 등 다양한 부대시설'
    }
  ]

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [heroImages.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const scrollToNext = () => {
    const nextSection = document.querySelector('#about')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <img
              src={heroImages[currentSlide].url}
              alt={heroImages[currentSlide].alt}
              className="w-full h-full object-cover"
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            {/* Forest Pattern Overlay */}
            <div className="absolute inset-0 bg-pattern-dots opacity-20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Main Title */}
            <h1 className="text-hero text-white font-serif font-bold mb-6 text-shadow-lg">
              청솔향 펜션
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-subtitle text-cream-100 mb-4 text-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              자연 속에서 찾는 진정한 휴식
            </motion.p>

            {/* Dynamic subtitle based on current slide */}
            <motion.p
              key={currentSlide}
              className="text-lg md:text-xl text-cream-200 mb-12 text-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {heroImages[currentSlide].subtitle}
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <motion.a
                href="#rooms"
                className="btn btn-primary btn-lg w-full sm:w-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#rooms')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Eye className="mr-2" size={20} />
                객실 보기
              </motion.a>

              <motion.a
                href="#reservation"
                className="btn btn-outline btn-lg w-full sm:w-auto bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary-800"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Calendar className="mr-2" size={20} />
                지금 예약하기
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300 group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-label="다음 섹션으로 스크롤"
        >
          <span className="text-sm font-medium mb-2 group-hover:text-cream-100">
            아래로 스크롤
          </span>
          <ChevronDown size={24} className="group-hover:scale-110 transition-transform duration-300" />
        </motion.button>
      </motion.div>

      {/* Progress Bar */}
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

      {/* Hotel Information Badge */}
      <motion.div
        className="absolute top-24 right-4 lg:right-8 z-30 glass rounded-xl p-4 text-white max-w-xs hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="text-sm space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>체크인: 15:00</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>체크아웃: 11:00</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Tel: 033-123-4567</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero