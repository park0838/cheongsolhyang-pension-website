import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

// HashRouter를 사용하므로 SPA 리다이렉션 처리 불필요

// Performance monitoring (production only)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  // Core Web Vitals monitoring
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    const sendToAnalytics = (metric) => {
      // 실제 환경에서는 analytics 서비스로 전송
      if (metric.value > 0) {
        console.info(`${metric.name}: ${metric.value}`)
      }
    }

    getCLS(sendToAnalytics)
    getFID(sendToAnalytics)
    getFCP(sendToAnalytics)
    getLCP(sendToAnalytics)
    getTTFB(sendToAnalytics)
  }).catch(() => {
    // web-vitals 로딩 실패 시 무시
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)