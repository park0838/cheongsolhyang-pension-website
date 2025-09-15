import React from 'react'
import { motion } from 'framer-motion'

const About = ({ standalone = false }) => {
  return (
    <section id="about" className={`section bg-cream-50 ${standalone ? 'pt-24' : ''}`}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif font-bold text-primary-800 mb-6">
            청솔향 펜션 소개
          </h2>
          <p className="text-lg text-neutral-700 leading-relaxed">
            강원도 평창 대관령의 아름다운 자연 속에서 진정한 휴식을 경험하세요.
            청솔향 펜션은 최고의 서비스와 시설로 여러분을 맞이합니다.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default About