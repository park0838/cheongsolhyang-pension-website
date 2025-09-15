import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MapPin } from 'lucide-react'
import { useScrollPosition } from '../../../hooks/useScrollPosition'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScrollPosition()
  const isScrolled = scrollY > 50

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navigationItems = [
    { name: '홈', href: '#hero', id: 'home' },
    { name: '소개', href: '#about', id: 'about' },
    { name: '객실', href: '#rooms', id: 'rooms' },
    { name: '부대시설', href: '#facilities', id: 'facilities' },
    { name: '예약', href: '#reservation', id: 'reservation' },
    { name: '후기', href: '#reviews', id: 'reviews' },
    { name: '위치', href: '#location', id: 'location' }
  ]

  const handleNavClick = (href) => {
    setIsMenuOpen(false)

    // Smooth scroll to section
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        const headerHeight = 80
        const elementPosition = element.offsetTop - headerHeight

        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass py-3 shadow-lg'
            : 'bg-transparent py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">청</span>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-serif font-bold text-primary-800">
                  청솔향 펜션
                </h1>
                <p className="text-xs text-neutral-600 hidden sm:block">
                  자연 속에서 찾는 진정한 휴식
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className="nav-link text-sm font-medium"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Contact Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Contact Button */}
              <motion.a
                href="tel:+82-33-123-4567"
                className="hidden sm:flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={16} />
                <span className="text-sm font-medium">033-123-4567</span>
              </motion.a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
                aria-label="메뉴 열기"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">청</span>
                    </div>
                    <span className="font-serif font-bold text-primary-800">
                      청솔향 펜션
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100"
                    aria-label="메뉴 닫기"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href)
                      }}
                      className="block px-4 py-3 rounded-lg text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile Contact Info */}
                <div className="mt-8 pt-8 border-t border-neutral-200 space-y-4">
                  <motion.a
                    href="tel:+82-33-123-4567"
                    className="flex items-center space-x-3 text-neutral-700 hover:text-primary-700 transition-colors duration-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Phone size={20} className="text-primary-600" />
                    <span>033-123-4567</span>
                  </motion.a>

                  <motion.div
                    className="flex items-start space-x-3 text-neutral-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <MapPin size={20} className="text-primary-600 mt-0.5" />
                    <div className="text-sm">
                      <p>강원도 평창군 대관령면</p>
                      <p>솔봉로 123</p>
                    </div>
                  </motion.div>
                </div>

                {/* Mobile CTA */}
                <motion.a
                  href="#reservation"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('#reservation')
                  }}
                  className="block w-full mt-6 bg-primary-600 text-white text-center py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  지금 예약하기
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header