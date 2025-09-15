import React, { Suspense, lazy, memo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'

// Layout components
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'

// Lazy load sections for better performance
const Hero = lazy(() => import('./components/sections/Hero/Hero'))
const About = lazy(() => import('./components/sections/About/About'))
const Rooms = lazy(() => import('./components/sections/Rooms/Rooms'))
const Facilities = lazy(() => import('./components/sections/Facilities/Facilities'))
const Reservation = lazy(() => import('./components/sections/Reservation/Reservation'))
const Reviews = lazy(() => import('./components/sections/Reviews/Reviews'))
const Location = lazy(() => import('./components/sections/Location/Location'))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full"
    />
  </div>
)

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cream-50">
          <div className="text-center">
            <h2 className="text-2xl font-serif text-neutral-800 mb-4">
              문제가 발생했습니다
            </h2>
            <p className="text-neutral-600 mb-6">
              페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              새로고침
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Main App component
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-cream-50">
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-100"
          >
            메인 콘텐츠로 건너뛰기
          </a>

          {/* Header */}
          <Header />

          {/* Main Content */}
          <main id="main-content" className="relative">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/facilities" element={<FacilitiesPage />} />
              <Route path="/reservation" element={<ReservationPage />} />
              <Route path="/location" element={<LocationPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

// Homepage component with all sections
const HomePage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Rooms />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Facilities />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Reviews />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Reservation />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Location />
      </Suspense>
    </>
  )
}

// Memoized page components for routing
const RoomsPage = memo(() => (
  <div className="pt-24">
    <Suspense fallback={<LoadingSpinner />}>
      <Rooms standalone />
    </Suspense>
  </div>
))

const FacilitiesPage = memo(() => (
  <div className="pt-24">
    <Suspense fallback={<LoadingSpinner />}>
      <Facilities standalone />
    </Suspense>
  </div>
))

const ReservationPage = memo(() => (
  <div className="pt-24">
    <Suspense fallback={<LoadingSpinner />}>
      <Reservation standalone />
    </Suspense>
  </div>
))

const LocationPage = memo(() => (
  <div className="pt-24">
    <Suspense fallback={<LoadingSpinner />}>
      <Location standalone />
    </Suspense>
  </div>
))

// 컴포넌트 이름 설정 (개발 도구용)
RoomsPage.displayName = 'RoomsPage'
FacilitiesPage.displayName = 'FacilitiesPage'
ReservationPage.displayName = 'ReservationPage'
LocationPage.displayName = 'LocationPage'

// 404 Not Found page
const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream-50 pt-24">
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl font-serif text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-serif text-neutral-800 mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <motion.a
          href="/"
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          홈으로 돌아가기
        </motion.a>
      </motion.div>
    </div>
  </div>
)

export default App