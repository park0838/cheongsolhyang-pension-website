import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, ThumbsUp, Verified } from 'lucide-react'
import { reviews } from '../../../data/pensionData'

const Reviews = ({ standalone = false }) => {
  const [currentReview, setCurrentReview] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance reviews
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, reviews.length])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentReview((prev) => (prev + 1) % reviews.length)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const goToReview = (index) => {
    setIsAutoPlaying(false)
    setCurrentReview(index)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-neutral-300'
        }`}
      />
    ))
  }

  return (
    <section id="reviews" className={`section bg-primary-900 text-white relative overflow-hidden ${standalone ? 'pt-24' : ''}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif font-bold text-white mb-6">
            고객 후기
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            청솔향 펜션을 이용하신 고객분들의 생생한 후기를 확인하세요.
            진정한 만족과 감동의 순간들을 함께 나누고 있습니다.
          </p>
        </motion.div>

        {/* Main Review Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Review Cards */}
            <div className="relative h-96 md:h-80 overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview}
                  className="absolute inset-0 bg-white text-neutral-900 rounded-2xl shadow-2xl p-8 md:p-12"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <div className="h-full flex flex-col justify-between">
                    {/* Review Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {reviews[currentReview].name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-neutral-800">
                                {reviews[currentReview].name}
                              </h4>
                              {reviews[currentReview].verified && (
                                <Verified size={16} className="text-blue-500" />
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-neutral-500">
                              <span>{reviews[currentReview].date}</span>
                              <span>•</span>
                              <span>{reviews[currentReview].room}룸 이용</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          {renderStars(reviews[currentReview].rating)}
                        </div>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-neutral-800 mb-4">
                        {reviews[currentReview].title}
                      </h3>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <p className="text-neutral-700 leading-relaxed text-lg">
                        "{reviews[currentReview].content}"
                      </p>
                    </div>

                    {/* Review Footer */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-200">
                      <div className="flex items-center space-x-2 text-neutral-500">
                        <ThumbsUp size={16} />
                        <span className="text-sm">
                          {reviews[currentReview].helpful}명이 도움이 되었다고 했어요
                        </span>
                      </div>
                      <div className="text-sm text-primary-600 font-medium">
                        검증된 후기
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-neutral-600 hover:bg-white hover:text-neutral-900 transition-colors duration-200 shadow-lg"
              aria-label="이전 후기"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-neutral-600 hover:bg-white hover:text-neutral-900 transition-colors duration-200 shadow-lg"
              aria-label="다음 후기"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Review Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentReview
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`${index + 1}번째 후기로 이동`}
              />
            ))}
          </div>
        </div>

        {/* Review Statistics */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="text-3xl font-bold text-white mb-2">4.8</div>
            <div className="flex justify-center mb-2">
              {renderStars(5)}
            </div>
            <div className="text-primary-200 text-sm">평균 평점</div>
          </div>

          <div>
            <div className="text-3xl font-bold text-white mb-2">450+</div>
            <div className="text-primary-200 text-sm">총 후기 수</div>
          </div>

          <div>
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-primary-200 text-sm">만족도</div>
          </div>

          <div>
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-primary-200 text-sm">재방문 의사</div>
          </div>
        </motion.div>

        {/* All Reviews Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button className="btn btn-outline btn-lg bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary-800">
            모든 후기 보기
          </button>
        </motion.div>

        {/* Auto-play Indicator */}
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center space-x-2 text-xs text-primary-300">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-primary-400 animate-pulse' : 'bg-primary-600'}`}></div>
            <span>{isAutoPlaying ? '자동 재생' : '일시 정지'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews