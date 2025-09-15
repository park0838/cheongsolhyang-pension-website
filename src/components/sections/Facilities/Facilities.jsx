import React from 'react'
import { motion } from 'framer-motion'
import { Waves, Flame, Coffee, Dumbbell, Mountain, Baby } from 'lucide-react'
import { facilities } from '../../../data/pensionData'

const Facilities = ({ standalone = false }) => {
  // Icon mapping for facilities
  const iconMap = {
    Pool: Waves,
    Grill: Flame,
    Coffee: Coffee,
    Dumbbell: Dumbbell,
    Mountain: Mountain,
    Baby: Baby
  }

  return (
    <section id="facilities" className={`section bg-cream-50 ${standalone ? 'pt-24' : ''}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif font-bold text-primary-800 mb-6">
            부대시설
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            다양한 부대시설로 더욱 풍성하고 즐거운 휴가를 만들어보세요.
            가족, 연인, 친구들과 함께 특별한 추억을 쌓으실 수 있습니다.
          </p>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => {
            const IconComponent = iconMap[facility.icon]

            return (
              <motion.div
                key={facility.id}
                className="card card-hover group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  {/* Facility Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-warm-100 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={32} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-serif font-bold text-primary-800">
                        {facility.name}
                      </h3>
                      <span className="text-sm text-neutral-500">
                        {facility.englishName}
                      </span>
                    </div>

                    <p className="text-neutral-600 mb-4 leading-relaxed">
                      {facility.description}
                    </p>

                    <div className="space-y-2">
                      {facility.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-neutral-600">
                          <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 flex-shrink-0"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 bg-white rounded-2xl shadow-soft p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">
            시설 이용 안내
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-neutral-600">
            <div>
              <div className="font-medium text-primary-600 mb-1">운영시간</div>
              <div>06:00 - 23:00</div>
            </div>
            <div>
              <div className="font-medium text-primary-600 mb-1">예약</div>
              <div>일부 시설 예약 필수</div>
            </div>
            <div>
              <div className="font-medium text-primary-600 mb-1">이용료</div>
              <div>숙박 고객 무료</div>
            </div>
            <div>
              <div className="font-medium text-primary-600 mb-1">문의</div>
              <div>033-123-4567</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Facilities