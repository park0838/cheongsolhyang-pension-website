import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

// GitHub Pages SPA support
if (typeof window !== 'undefined') {
  // Handle redirects from 404.html
  const search = window.location.search
  if (search && search.includes('?/')) {
    const query = search.slice(1).split('&')
    const route = query.find(param => param.startsWith('/'))
    if (route) {
      window.history.replaceState(null, null, route.replace(/~/g, '&'))
    }
  }
}

// Performance monitoring
if (typeof window !== 'undefined') {
  // Core Web Vitals monitoring
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log)
    getFID(console.log)
    getFCP(console.log)
    getLCP(console.log)
    getTTFB(console.log)
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)