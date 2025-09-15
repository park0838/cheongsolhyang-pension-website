import React from 'react'
import { motion } from 'framer-motion'
import { rooms } from '../../../data/pensionData'

const Rooms = ({ standalone = false }) => {
  return (
    <section id="rooms" className={`section bg-white ${standalone ? 'pt-24' : ''}`}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif font-bold text-primary-800 mb-6">
            객실 안내
          </h2>
          <p className="text-lg text-neutral-700">
            편안하고 안락한 객실에서 특별한 휴식을 경험하세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              className="card card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-video bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 text-lg font-medium">
                  {room.name} 이미지
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-primary-800 mb-2">
                  {room.name}
                </h3>
                <p className="text-neutral-600 mb-4">{room.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary-600">
                    ₩{room.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-neutral-500">
                    최대 {room.capacity}명
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Rooms