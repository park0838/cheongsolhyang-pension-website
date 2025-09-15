import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: '홈', href: '#hero' },
    { name: '소개', href: '#about' },
    { name: '객실', href: '#rooms' },
    { name: '부대시설', href: '#facilities' },
    { name: '예약', href: '#reservation' },
    { name: '후기', href: '#reviews' },
    { name: '위치', href: '#location' }
  ]

  const roomTypes = [
    { name: '스탠다드룸', price: '₩120,000' },
    { name: '디럭스룸', price: '₩180,000' },
    { name: '펜트하우스', price: '₩280,000' }
  ]

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-400' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-400' }
  ]

  const handleLinkClick = (href) => {
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
    <footer className="bg-primary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-5"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

            {/* Company Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">청</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold">청솔향 펜션</h3>
                  <p className="text-primary-200 text-sm">자연 속에서 찾는 진정한 휴식</p>
                </div>
              </div>

              <p className="text-primary-100 text-sm leading-relaxed">
                강원도 평창 대관령의 아름다운 자연 속에서
                특별한 휴식과 힐링을 경험하세요.
                프리미엄 서비스와 최고급 시설로
                잊을 수 없는 추억을 만들어드립니다.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className={`text-primary-300 ${social.color} transition-colors duration-300`}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold font-serif">바로가기</h4>
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.href)
                    }}
                    className="block text-primary-200 hover:text-white transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
            </motion.div>

            {/* Room Types */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold font-serif">객실 요금</h4>
              <div className="space-y-3">
                {roomTypes.map((room) => (
                  <div key={room.name} className="flex justify-between items-center">
                    <span className="text-primary-200">{room.name}</span>
                    <span className="text-white font-medium">{room.price}</span>
                  </div>
                ))}
                <p className="text-xs text-primary-300 mt-4">
                  * 성수기 및 주말 요금은 별도 문의
                </p>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold font-serif">연락처</h4>
              <div className="space-y-4">
                <motion.a
                  href="tel:+82-33-123-4567"
                  className="flex items-center space-x-3 text-primary-200 hover:text-white transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  <Phone size={18} className="text-primary-400" />
                  <span>033-123-4567</span>
                </motion.a>

                <motion.a
                  href="mailto:info@cheongsolhyang.com"
                  className="flex items-center space-x-3 text-primary-200 hover:text-white transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  <Mail size={18} className="text-primary-400" />
                  <span>info@cheongsolhyang.com</span>
                </motion.a>

                <div className="flex items-start space-x-3 text-primary-200">
                  <MapPin size={18} className="text-primary-400 mt-0.5" />
                  <div className="text-sm">
                    <p>강원도 평창군 대관령면</p>
                    <p>솔봉로 123</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-primary-200">
                  <Clock size={18} className="text-primary-400 mt-0.5" />
                  <div className="text-sm">
                    <p>체크인: 15:00</p>
                    <p>체크아웃: 11:00</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.p
                className="text-primary-300 text-sm text-center md:text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                © {currentYear} 청솔향 펜션. 모든 권리 보유.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">
                  이용약관
                </a>
                <a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">
                  개인정보처리방침
                </a>
                <a href="#" className="text-primary-300 hover:text-white transition-colors duration-200">
                  취소/환불정책
                </a>
              </motion.div>
            </div>

            {/* Business License Info */}
            <motion.div
              className="mt-4 pt-4 border-t border-primary-800 text-xs text-primary-400 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p>사업자등록번호: 123-45-67890 | 통신판매업신고번호: 제2024-강원평창-0123호</p>
              <p className="mt-1">대표자: 김청솔 | 관광사업자등록번호: 강원도 제2024-01호</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-300 z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        aria-label="맨 위로 이동"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </motion.button>
    </footer>
  )
}

export default Footer