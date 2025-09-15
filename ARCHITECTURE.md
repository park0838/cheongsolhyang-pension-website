# Cheongsolhyang Pension Website Architecture

## 🏗️ Project Overview
Premium pension website showcasing luxury accommodations with focus on performance, accessibility, and mobile-first design.

## 📁 Complete Folder Structure

```
cheongsolhyang-pension/
├── public/
│   ├── images/
│   │   ├── hero/                 # Hero slider images (WebP format)
│   │   ├── rooms/                # Room showcase images
│   │   ├── facilities/           # Amenities images
│   │   ├── gallery/              # Additional gallery images
│   │   └── icons/                # SVG icons and favicons
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/               # Reusable UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.test.js
│   │   │   │   └── index.js
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── LoadingSpinner/
│   │   │   └── LazyImage/        # Optimized image component
│   │   ├── layout/               # Layout components
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Navigation.jsx
│   │   │   │   └── MobileMenu.jsx
│   │   │   ├── Footer/
│   │   │   └── ScrollToTop/
│   │   └── sections/             # Page sections
│   │       ├── Hero/
│   │       │   ├── Hero.jsx
│   │       │   ├── HeroSlider.jsx
│   │       │   └── HeroCTA.jsx
│   │       ├── About/
│   │       ├── Rooms/
│   │       │   ├── RoomsShowcase.jsx
│   │       │   ├── RoomCard.jsx
│   │       │   └── RoomModal.jsx
│   │       ├── Facilities/
│   │       ├── Reservation/
│   │       │   ├── ReservationForm.jsx
│   │       │   └── FormValidation.js
│   │       ├── Reviews/
│   │       │   ├── ReviewsCarousel.jsx
│   │       │   └── ReviewCard.jsx
│   │       └── Location/
│   │           ├── LocationMap.jsx
│   │           └── DirectionsCard.jsx
│   ├── hooks/                    # Custom React hooks
│   │   ├── useScrollPosition.js
│   │   ├── useIntersectionObserver.js
│   │   ├── useWindowSize.js
│   │   └── useFormValidation.js
│   ├── context/                  # React Context providers
│   │   ├── ThemeContext.js
│   │   └── ReservationContext.js
│   ├── utils/                    # Utility functions
│   │   ├── validation.js         # Form validation helpers
│   │   ├── analytics.js          # Analytics tracking
│   │   ├── performance.js        # Performance monitoring
│   │   └── accessibility.js      # A11y helpers
│   ├── styles/                   # Styling configuration
│   │   ├── globals.css           # Global styles & Tailwind imports
│   │   ├── components.css        # Component-specific styles
│   │   └── animations.css        # Custom animations
│   ├── constants/                # Application constants
│   │   ├── content.js            # Static content & copy
│   │   ├── navigation.js         # Navigation structure
│   │   └── seo.js                # SEO metadata
│   ├── data/                     # Static data
│   │   ├── rooms.js              # Room information
│   │   ├── facilities.js         # Amenities data
│   │   └── reviews.js            # Testimonials
│   ├── App.jsx                   # Main App component
│   ├── App.css                   # App-specific styles
│   └── index.js                  # Entry point
├── tests/                        # Test files
│   ├── __mocks__/
│   ├── components/
│   └── utils/
├── docs/                         # Documentation
│   ├── COMPONENT_GUIDE.md
│   ├── PERFORMANCE.md
│   └── ACCESSIBILITY.md
├── .env                          # Environment variables
├── .env.example                  # Environment template
├── .gitignore
├── package.json
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
├── vite.config.js                # Vite build configuration
└── README.md
```

## 🧩 Component Hierarchy & Relationships

```
App
├── Header
│   ├── Navigation
│   └── MobileMenu
├── Main
│   ├── Hero
│   │   ├── HeroSlider
│   │   └── HeroCTA
│   ├── About
│   ├── RoomsShowcase
│   │   ├── RoomCard (×3)
│   │   └── RoomModal
│   ├── Facilities
│   ├── ReservationForm
│   ├── ReviewsCarousel
│   │   └── ReviewCard (×multiple)
│   └── LocationMap
├── Footer
└── ScrollToTop
```

### Component Relationships
- **Parent-Child**: Clear hierarchical structure with props flowing down
- **Sibling Communication**: Via React Context for reservation state
- **Event Bubbling**: Form submissions and modal interactions
- **Shared State**: Navigation active states, modal visibility

## 📊 State Management Strategy

### Local State (useState)
- Component-specific UI states (hover, focus, loading)
- Form input values and validation states
- Modal visibility and slider positions

### Global State (React Context)
```javascript
// ReservationContext - Manages reservation flow
const ReservationContext = {
  selectedRoom: null,
  checkInDate: null,
  checkOutDate: null,
  guestCount: 1,
  contactInfo: {},
  formErrors: {},
  isSubmitting: false
}

// ThemeContext - Manages theme preferences
const ThemeContext = {
  isDarkMode: false,
  reducedMotion: false,
  fontSize: 'medium'
}
```

### Custom Hooks for State Logic
- `useFormValidation`: Real-time form validation
- `useScrollPosition`: Header transparency and scroll behaviors
- `useIntersectionObserver`: Lazy loading and animations
- `useWindowSize`: Responsive behavior adjustments

## 🎨 Styling Approach with Tailwind

### Design System Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',   // Lightest green
          500: '#22c55e',  // Main green
          700: '#15803d',  // Dark green
          900: '#14532d'   // Darkest green
        },
        secondary: {
          50: '#fefce8',   // Lightest cream
          100: '#fef3c7',  // Light cream
          500: '#f59e0b',  // Warm brown
          700: '#92400e',  // Dark brown
          900: '#78350f'   // Darkest brown
        },
        neutral: {
          50: '#fafaf9',   // Off-white
          100: '#f5f5f4',  // Light gray
          500: '#71717a',  // Medium gray
          700: '#374151',  // Dark gray
          900: '#1f2937'   // Almost black
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')
  ]
}
```

### Component Styling Strategy
- **Utility-First**: Primary styling through Tailwind classes
- **Component Classes**: Complex components in `components.css`
- **Custom Properties**: CSS variables for dynamic theming
- **Responsive Design**: Mobile-first breakpoint system

### Styling Patterns
```javascript
// Consistent spacing scale
const spacingScale = {
  xs: 'p-2 md:p-3',
  sm: 'p-4 md:p-6',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-12',
  xl: 'p-12 md:p-16'
}

// Typography hierarchy
const typography = {
  h1: 'text-4xl md:text-6xl font-display font-bold',
  h2: 'text-3xl md:text-5xl font-display font-semibold',
  h3: 'text-2xl md:text-3xl font-display font-medium',
  body: 'text-base md:text-lg font-body leading-relaxed',
  caption: 'text-sm font-body text-neutral-600'
}
```

## ⚡ Performance Optimization Strategy

### Bundle Optimization
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'date-fns']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  plugins: [
    react(),
    splitVendorChunkPlugin()
  ]
})
```

### Image Optimization
- **Format Strategy**: WebP with JPEG fallback
- **Responsive Images**: Multiple sizes with `srcset`
- **Lazy Loading**: Intersection Observer for below-fold images
- **Preloading**: Critical hero images

### Code Splitting
```javascript
// Lazy load non-critical components
const RoomModal = lazy(() => import('./components/sections/Rooms/RoomModal'))
const LocationMap = lazy(() => import('./components/sections/Location/LocationMap'))

// Component-level splitting
const Reviews = lazy(() =>
  import('./components/sections/Reviews/ReviewsCarousel')
)
```

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Custom Metrics**: Component render times, image load speeds
- **Error Boundaries**: Graceful error handling
- **Performance Budget**: Bundle size limits and monitoring

### Optimization Techniques
- **Tree Shaking**: Remove unused code
- **CSS Purging**: Remove unused Tailwind classes
- **Service Worker**: Cache static assets
- **Resource Hints**: Preload, prefetch critical resources

## ♿ Accessibility Implementation Plan

### WCAG 2.1 AA Compliance
```javascript
// Accessibility utilities
export const a11yUtils = {
  // Focus management
  trapFocus: (element) => { /* Implementation */ },
  restoreFocus: (element) => { /* Implementation */ },

  // Screen reader announcements
  announce: (message, priority = 'polite') => {
    const announcer = document.getElementById('screen-reader-announcer')
    announcer.setAttribute('aria-live', priority)
    announcer.textContent = message
  },

  // Color contrast validation
  validateContrast: (foreground, background) => { /* Implementation */ }
}
```

### Accessibility Features
- **Keyboard Navigation**: Full tab order and focus management
- **Screen Reader Support**: Proper ARIA labels and live regions
- **Color Contrast**: Minimum 4.5:1 ratio for normal text
- **Motion Preferences**: Respect `prefers-reduced-motion`
- **Focus Indicators**: Visible focus states for all interactive elements

### Implementation Checklist
- [ ] Semantic HTML structure (`main`, `section`, `article`)
- [ ] Alt text for all images
- [ ] Form labels and error messages
- [ ] Skip links for keyboard users
- [ ] Proper heading hierarchy (h1 → h6)
- [ ] ARIA landmarks and roles
- [ ] Color-blind friendly palette
- [ ] High contrast mode support

### Testing Strategy
```javascript
// Automated accessibility testing
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('should not have accessibility violations', async () => {
  const { container } = render(<App />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## 🔍 SEO Structure Recommendations

### Meta Configuration
```javascript
// SEO constants
export const seoConfig = {
  title: 'Cheongsolhyang Pension - Premium Mountain Retreat',
  description: 'Luxury pension in pristine mountain setting. Perfect for couples and families seeking premium accommodations with stunning nature views.',
  keywords: 'pension, luxury accommodation, mountain retreat, family vacation, couples getaway',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    site_name: 'Cheongsolhyang Pension',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cheongsolhyang Pension exterior view'
      }
    ]
  },
  structuredData: {
    '@type': 'LodgingBusiness',
    name: 'Cheongsolhyang Pension',
    address: {
      '@type': 'PostalAddress',
      // Address details
    },
    priceRange: '$$',
    amenityFeature: [
      'Free WiFi',
      'Parking',
      'Kitchen',
      'Mountain View'
    ]
  }
}
```

### URL Structure
```
/ - Homepage
/rooms - Room overview
/rooms/[room-type] - Individual room details
/facilities - Amenities and services
/location - Location and directions
/contact - Contact and reservation
/gallery - Photo gallery
```

### Technical SEO
- **Semantic HTML**: Proper document structure
- **Schema Markup**: JSON-LD for rich snippets
- **Sitemap**: XML sitemap generation
- **Robots.txt**: Search engine guidelines
- **Meta Tags**: Open Graph and Twitter Cards
- **Performance**: Core Web Vitals optimization

### Content Strategy
- **Heading Structure**: Logical h1-h6 hierarchy
- **Internal Linking**: Related pages and sections
- **Image SEO**: Descriptive alt text and file names
- **Local SEO**: Location-specific keywords and content

## 🚀 Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Project setup and configuration
- [ ] Design system implementation
- [ ] Basic component structure
- [ ] Responsive layout framework

### Phase 2: Core Features (Week 2)
- [ ] Hero section with slider
- [ ] Room showcase functionality
- [ ] Navigation and routing
- [ ] Basic form implementation

### Phase 3: Enhanced Features (Week 3)
- [ ] Reservation system
- [ ] Reviews carousel
- [ ] Location integration
- [ ] Performance optimization

### Phase 4: Polish & Testing (Week 4)
- [ ] Accessibility compliance
- [ ] Cross-browser testing
- [ ] Performance auditing
- [ ] SEO optimization

## 📱 Mobile-First Responsive Strategy

### Breakpoint System
```javascript
const breakpoints = {
  xs: '320px',   // Small phones
  sm: '640px',   // Large phones
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px' // Large screens
}
```

### Component Responsiveness
- **Navigation**: Hamburger menu on mobile, full nav on desktop
- **Hero**: Single image on mobile, slider on larger screens
- **Rooms**: Single column on mobile, grid on larger screens
- **Forms**: Stacked on mobile, side-by-side on desktop

This architecture provides a solid foundation for building a professional, performant, and accessible pension website that showcases modern frontend development practices.