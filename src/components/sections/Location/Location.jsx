import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Car, Bus, Plane, Clock, Navigation, Phone, MessageSquare } from 'lucide-react'
import { pensionInfo, nearbyAttractions } from '../../../data/pensionData'

const Location = ({ standalone = false }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  // Initialize Leaflet map
  useEffect(() => {
    let map = null

    const initMap = async () => {
      try {
        // Dynamic import for better performance
        const L = await import('leaflet')

        if (mapRef.current && !mapInstanceRef.current) {
          map = L.map(mapRef.current).setView([37.6868, 128.7203], 13)

          // Add tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map)

          // Custom icon for pension
          const pensionIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `
              <div style="
                background-color: #2d5a27;
                width: 40px;
                height: 40px;
                border-radius: 50% 50% 50% 0;
                border: 3px solid white;
                transform: rotate(-45deg);
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <span style="color: white; transform: rotate(45deg); font-weight: bold; font-size: 12px;">청</span>
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 40]
          })

          // Add marker for pension
          L.marker([37.6868, 128.7203], { icon: pensionIcon })
            .addTo(map)
            .bindPopup(`
              <div style="text-align: center; padding: 8px;">
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">청솔향 펜션</h3>
                <p style="margin: 0; font-size: 14px; color: #666;">강원도 평창군 대관령면<br/>솔봉로 123</p>
              </div>
            `)

          mapInstanceRef.current = map
        }
      } catch (error) {
        console.error('Failed to load map:', error)
      }
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const transportOptions = [
    {
      icon: Car,
      title: '자가용 이용',
      time: '서울에서 약 2시간 30분',
      description: '영동고속도로 → 대관령IC → 솔봉로',
      details: ['무료 주차장 완비', '내비게이션: 청솔향 펜션']
    },
    {
      icon: Bus,
      title: '대중교통 이용',
      time: '서울에서 약 3시간',
      description: '동서울터미널 → 횡계버스터미널 → 택시 10분',
      details: ['버스 시간표 확인 필수', '픽업 서비스 문의 가능']
    },
    {
      icon: Plane,
      title: '항공 이용',
      time: '양양공항에서 약 1시간',
      description: '양양공항 → 렌터카 또는 택시',
      details: ['렌터카 이용 권장', '택시비 약 50,000원']
    }
  ]

  const categoryIcons = {
    nature: '🌲',
    sports: '⛷️',
    culture: '🏛️'
  }

  return (
    <section id="location" className={`section bg-cream-50 ${standalone ? 'pt-24' : ''}`}>
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
            찾아오시는 길
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            강원도 평창군 대관령면에 위치한 청솔향 펜션으로 오시는 길을 안내합니다.<br />
            아름다운 자연 속에서 여러분을 기다리고 있습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Map */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="card overflow-hidden">
              <div
                ref={mapRef}
                className="w-full h-96 bg-neutral-100"
              >
                {/* Fallback content while map loads */}
                <div className="w-full h-full flex items-center justify-center text-neutral-500">
                  <div className="text-center">
                    <MapPin size={48} className="mx-auto mb-4 text-primary-600" />
                    <p>지도를 불러오는 중...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="card">
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-primary-800 mb-4">
                  주소 정보
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-primary-600 mt-1" size={20} />
                    <div>
                      <div className="font-medium text-neutral-800">
                        {pensionInfo.address.full}
                      </div>
                      <div className="text-sm text-neutral-600">
                        ({pensionInfo.address.postalCode})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Navigation className="text-primary-600" size={20} />
                    <div>
                      <div className="font-medium text-neutral-800">
                        GPS 좌표
                      </div>
                      <div className="text-sm text-neutral-600 font-mono">
                        {pensionInfo.address.coordinates.lat}, {pensionInfo.address.coordinates.lng}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <motion.a
                    href={`https://map.kakao.com/link/to/청솔향펜션,${pensionInfo.address.coordinates.lat},${pensionInfo.address.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    카카오맵에서 보기
                  </motion.a>
                  <motion.a
                    href={`https://map.naver.com/index.nhn?slng=${pensionInfo.address.coordinates.lng}&slat=${pensionInfo.address.coordinates.lat}&stext=청솔향펜션`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    네이버맵에서 보기
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Transportation Guide */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif font-bold text-primary-800">
              교통안내
            </h3>

            {transportOptions.map((transport, index) => {
              const IconComponent = transport.icon

              return (
                <motion.div
                  key={index}
                  className="card card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent size={24} className="text-primary-600" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-neutral-800">
                            {transport.title}
                          </h4>
                          <div className="flex items-center text-sm text-neutral-500">
                            <Clock size={16} className="mr-1" />
                            {transport.time}
                          </div>
                        </div>

                        <p className="text-neutral-600 mb-3">
                          {transport.description}
                        </p>

                        <ul className="space-y-1">
                          {transport.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center text-sm text-neutral-500">
                              <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></div>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Nearby Attractions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold text-primary-800 mb-4">
              주변 관광지
            </h3>
            <p className="text-lg text-neutral-700">
              청솔향 펜션 주변의 매력적인 관광지들을 소개합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyAttractions.map((attraction, index) => (
              <motion.div
                key={index}
                className="card card-hover text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">
                    {categoryIcons[attraction.category]}
                  </div>
                  <h4 className="text-lg font-serif font-bold text-primary-800 mb-2">
                    {attraction.name}
                  </h4>
                  <div className="flex items-center justify-center text-sm text-primary-600 mb-3">
                    <MapPin size={14} className="mr-1" />
                    {attraction.distance}
                  </div>
                  <p className="text-neutral-600 text-sm">
                    {attraction.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact for Directions */}
        <motion.div
          className="mt-16 bg-white rounded-2xl shadow-soft p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">
            길을 잃으셨나요?
          </h3>
          <p className="text-neutral-600 mb-6">
            오시는 길에 어려움이 있으시면 언제든지 연락 주세요.<br />
            친절하게 길 안내를 도와드리겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:+82-33-123-4567"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={16} className="mr-2" />
              길 안내 요청하기
            </motion.a>
            <motion.a
              href={`sms:+82-33-123-4567?body=청솔향펜션 길안내 요청드립니다.`}
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare size={16} className="mr-2" />
              문자로 문의하기
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Location