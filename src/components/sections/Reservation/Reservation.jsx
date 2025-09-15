import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, Phone, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
import { rooms } from '../../../data/pensionData'

const Reservation = ({ standalone = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: 'standard',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요'
    } else if (!/^[0-9-+()\\s]+$/.test(formData.phone)) {
      newErrors.phone = '올바른 연락처 형식이 아닙니다'
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다'
    }

    if (!formData.checkIn) {
      newErrors.checkIn = '체크인 날짜를 선택해주세요'
    }

    if (!formData.checkOut) {
      newErrors.checkOut = '체크아웃 날짜를 선택해주세요'
    }

    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn)
      const checkOutDate = new Date(formData.checkOut)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (checkInDate < today) {
        newErrors.checkIn = '체크인 날짜는 오늘 이후로 선택해주세요'
      }

      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = '체크아웃 날짜는 체크인 날짜 이후로 선택해주세요'
      }
    }

    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = '투숙 인원을 선택해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In real implementation, you would send data to your backend
      console.log('Reservation data:', formData)

      setIsSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
      // Handle error state
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate nights and total price
  const calculateBookingDetails = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn)
      const checkOutDate = new Date(formData.checkOut)
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))

      const selectedRoom = rooms.find(room => room.id === formData.roomType)
      const totalPrice = nights > 0 ? nights * selectedRoom.price : 0

      return { nights, totalPrice, roomPrice: selectedRoom.price }
    }
    return { nights: 0, totalPrice: 0, roomPrice: 0 }
  }

  const { nights, totalPrice, roomPrice } = calculateBookingDetails()

  // Success state
  if (isSubmitted) {
    return (
      <section id="reservation" className={`section bg-white ${standalone ? 'pt-24' : ''}`}>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-primary-800 mb-4">
              예약 문의가 접수되었습니다
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              빠른 시일 내에 예약 확인 연락을 드리겠습니다.<br />
              문의사항이 있으시면 언제든지 연락 주세요.
            </p>
            <div className="bg-cream-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-neutral-800 mb-4">접수된 예약 정보</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>예약자명:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>연락처:</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>숙박 기간:</span>
                  <span className="font-medium">{formData.checkIn} ~ {formData.checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span>객실 타입:</span>
                  <span className="font-medium">{rooms.find(r => r.id === formData.roomType)?.name}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn btn-outline"
              >
                새 예약 문의하기
              </button>
              <a href="tel:+82-33-123-4567" className="btn btn-primary">
                <Phone size={16} className="mr-2" />
                직접 통화하기
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="reservation" className={`section bg-white ${standalone ? 'pt-24' : ''}`}>
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
            예약 문의
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            편리하고 빠른 예약 시스템으로 여러분을 기다립니다.<br />
            아래 폼을 작성해주시면 빠른 시일 내에 예약 확인 연락을 드리겠습니다.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Reservation Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-cream-50 rounded-xl p-6">
                <h3 className="text-xl font-serif font-bold text-primary-800 mb-6">
                  예약자 정보
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="홍길동"
                    />
                    {errors.name && <p className="form-error">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="form-label">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="010-1234-5678"
                    />
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="form-label">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="example@email.com"
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Booking Information */}
              <div className="bg-cream-50 rounded-xl p-6">
                <h3 className="text-xl font-serif font-bold text-primary-800 mb-6">
                  숙박 정보
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">
                      체크인 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        className={`form-input pl-10 ${errors.checkIn ? 'border-red-500' : ''}`}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    {errors.checkIn && <p className="form-error">{errors.checkIn}</p>}
                  </div>

                  <div>
                    <label className="form-label">
                      체크아웃 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        className={`form-input pl-10 ${errors.checkOut ? 'border-red-500' : ''}`}
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    {errors.checkOut && <p className="form-error">{errors.checkOut}</p>}
                  </div>

                  <div>
                    <label className="form-label">
                      투숙 인원 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Users size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className={`form-input pl-10 ${errors.guests ? 'border-red-500' : ''}`}
                      >
                        {[1,2,3,4,5,6,7,8].map(num => (
                          <option key={num} value={num}>{num}명</option>
                        ))}
                      </select>
                    </div>
                    {errors.guests && <p className="form-error">{errors.guests}</p>}
                  </div>

                  <div>
                    <label className="form-label">
                      객실 타입 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      className="form-input"
                    >
                      {rooms.map(room => (
                        <option key={room.id} value={room.id}>
                          {room.name} - ₩{room.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label className="form-label">
                  추가 요청사항
                </label>
                <div className="relative">
                  <MessageSquare size={20} className="absolute left-3 top-3 text-neutral-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="form-input pl-10 resize-none"
                    placeholder="특별한 요청이나 문의사항이 있으시면 자유롭게 적어주세요."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    예약 문의 접수 중...
                  </div>
                ) : (
                  '예약 문의하기'
                )}
              </motion.button>

              <p className="text-sm text-neutral-500 text-center">
                예약 문의 후 24시간 내에 확인 연락을 드립니다.
              </p>
            </form>
          </motion.div>

          {/* Booking Summary & Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Booking Summary */}
            <div className="card">
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-primary-800 mb-4">
                  예약 요약
                </h3>

                {formData.checkIn && formData.checkOut && (
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">숙박 기간:</span>
                      <span className="font-medium">
                        {nights}박 {nights + 1}일
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">객실:</span>
                      <span className="font-medium">
                        {rooms.find(r => r.id === formData.roomType)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">투숙 인원:</span>
                      <span className="font-medium">{formData.guests}명</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                      <span className="text-neutral-600">1박 요금:</span>
                      <span className="font-medium">₩{roomPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-primary-800">
                      <span>총 예상 금액:</span>
                      <span>₩{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {(!formData.checkIn || !formData.checkOut) && (
                  <div className="text-center text-neutral-500 py-8">
                    체크인/체크아웃 날짜를 선택하면<br />
                    예약 요약이 표시됩니다
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="card">
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-primary-800 mb-4">
                  직접 문의
                </h3>

                <div className="space-y-4">
                  <motion.a
                    href="tel:+82-33-123-4567"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-cream-50 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Phone size={18} className="text-primary-600" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-800">전화 문의</div>
                      <div className="text-sm text-neutral-600">033-123-4567</div>
                    </div>
                  </motion.a>

                  <motion.a
                    href="mailto:info@cheongsolhyang.com"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-cream-50 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Mail size={18} className="text-primary-600" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-800">이메일 문의</div>
                      <div className="text-sm text-neutral-600">info@cheongsolhyang.com</div>
                    </div>
                  </motion.a>
                </div>

                <div className="mt-6 p-4 bg-cream-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle size={16} className="text-warm-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-neutral-600">
                      <strong>운영시간:</strong><br />
                      평일 09:00 - 18:00<br />
                      주말 09:00 - 20:00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Reservation