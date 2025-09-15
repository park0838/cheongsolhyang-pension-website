/**
 * SEO configuration and metadata for Cheongsolhyang Pension
 */

// Base SEO configuration
export const baseSEO = {
  siteName: 'Cheongsolhyang Pension',
  siteUrl: process.env.VITE_SITE_URL || 'https://cheongsolhyang.com',
  defaultTitle: 'Cheongsolhyang Pension - Premium Mountain Retreat',
  titleTemplate: '%s | Cheongsolhyang Pension',
  defaultDescription: 'Experience luxury in nature at Cheongsolhyang Pension. Premium mountain accommodations with stunning forest and mountain views, perfect for couples and families seeking tranquil retreats.',
  defaultKeywords: [
    'pension',
    'mountain retreat',
    'luxury accommodation',
    'forest view',
    'mountain view',
    'family vacation',
    'couples getaway',
    'nature retreat',
    'premium hospitality',
    'Korea mountain lodge'
  ],
  author: 'Cheongsolhyang Pension',
  language: 'ko',
  locale: 'ko_KR',
  alternateLocales: ['en_US'],
}

// Open Graph default configuration
export const openGraphDefaults = {
  type: 'website',
  siteName: baseSEO.siteName,
  locale: baseSEO.locale,
  url: baseSEO.siteUrl,
  images: [
    {
      url: '/images/og/og-image-main.jpg',
      width: 1200,
      height: 630,
      alt: 'Cheongsolhyang Pension - Premium Mountain Retreat',
      type: 'image/jpeg',
    },
    {
      url: '/images/og/og-image-rooms.jpg',
      width: 1200,
      height: 630,
      alt: 'Luxury rooms with forest and mountain views',
      type: 'image/jpeg',
    }
  ]
}

// Twitter Card defaults
export const twitterDefaults = {
  card: 'summary_large_image',
  site: '@cheongsolhyang',
  creator: '@cheongsolhyang',
  image: '/images/og/twitter-card.jpg',
  imageAlt: 'Cheongsolhyang Pension - Premium Mountain Retreat',
}

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: 'Premium Mountain Retreat - Luxury Accommodation in Nature',
    description: 'Discover tranquility at Cheongsolhyang Pension. Premium mountain accommodations with breathtaking forest and mountain views. Perfect for romantic getaways and family retreats.',
    keywords: [
      'mountain pension',
      'luxury retreat',
      'forest accommodation',
      'mountain view rooms',
      'premium hospitality',
      'nature getaway',
      'family vacation',
      'couples retreat'
    ],
    path: '/',
    openGraph: {
      title: 'Cheongsolhyang Pension - Where Luxury Meets Nature',
      description: 'Premium mountain retreat offering luxury accommodations with stunning natural views. Experience tranquility and comfort in our carefully designed rooms.',
      images: [
        {
          url: '/images/og/home-hero.jpg',
          width: 1200,
          height: 630,
          alt: 'Cheongsolhyang Pension nestled in mountain forest',
        }
      ]
    }
  },

  rooms: {
    title: 'Luxury Rooms & Suites - Premium Mountain Accommodations',
    description: 'Choose from our selection of premium rooms featuring forest views, mountain vistas, and garden access. Each room designed for comfort and tranquility.',
    keywords: [
      'luxury rooms',
      'mountain view rooms',
      'forest suite',
      'garden deluxe',
      'premium accommodation',
      'mountain lodge rooms'
    ],
    path: '/rooms',
    openGraph: {
      title: 'Premium Rooms with Stunning Natural Views',
      description: 'Explore our carefully designed rooms featuring forest views, mountain panoramas, and direct garden access. Luxury meets nature.',
      images: [
        {
          url: '/images/og/rooms-overview.jpg',
          width: 1200,
          height: 630,
          alt: 'Luxury rooms with natural views at Cheongsolhyang Pension',
        }
      ]
    }
  },

  facilities: {
    title: 'Premium Facilities & Amenities - Mountain Retreat Services',
    description: 'Discover our range of premium facilities including wellness amenities, recreational activities, and luxury services designed for your comfort.',
    keywords: [
      'pension facilities',
      'mountain retreat amenities',
      'wellness facilities',
      'recreational activities',
      'luxury services'
    ],
    path: '/facilities',
    openGraph: {
      title: 'World-Class Facilities in Natural Setting',
      description: 'Premium amenities and facilities designed to enhance your mountain retreat experience.',
    }
  },

  location: {
    title: 'Location & Directions - How to Reach Cheongsolhyang Pension',
    description: 'Located in pristine mountain setting with easy access from major cities. Find directions, transportation options, and local attractions.',
    keywords: [
      'pension location',
      'mountain location',
      'directions',
      'transportation',
      'how to get there',
      'mountain access'
    ],
    path: '/location',
    openGraph: {
      title: 'Pristine Mountain Location with Easy Access',
      description: 'Discover our secluded mountain location with convenient transportation options and nearby attractions.',
    }
  },

  contact: {
    title: 'Contact & Reservations - Book Your Mountain Retreat',
    description: 'Contact Cheongsolhyang Pension for reservations and inquiries. Easy booking process for your premium mountain retreat experience.',
    keywords: [
      'pension booking',
      'reservations',
      'contact information',
      'mountain retreat booking',
      'luxury accommodation booking'
    ],
    path: '/contact',
    openGraph: {
      title: 'Book Your Premium Mountain Retreat',
      description: 'Easy reservation process for your luxury mountain getaway. Contact us for personalized service.',
    }
  },

  gallery: {
    title: 'Photo Gallery - Stunning Views & Premium Accommodations',
    description: 'Explore our photo gallery showcasing beautiful rooms, facilities, and breathtaking natural surroundings of Cheongsolhyang Pension.',
    keywords: [
      'pension photos',
      'room gallery',
      'mountain views',
      'forest views',
      'facility photos',
      'accommodation gallery'
    ],
    path: '/gallery',
    openGraph: {
      title: 'Stunning Photo Gallery of Mountain Retreat',
      description: 'Visual journey through our premium accommodations and breathtaking natural surroundings.',
    }
  }
}

// Structured data schemas
export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    'name': baseSEO.siteName,
    'description': baseSEO.defaultDescription,
    'url': baseSEO.siteUrl,
    'logo': `${baseSEO.siteUrl}/images/logo.png`,
    'image': `${baseSEO.siteUrl}/images/og/og-image-main.jpg`,
    'telephone': '+82-10-1234-5678',
    'email': 'info@cheongsolhyang.com',
    'priceRange': '$$',
    'starRating': {
      '@type': 'Rating',
      'ratingValue': '4.8',
      'bestRating': '5'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '123 Mountain Road',
      'addressLocality': 'Gangwon-do',
      'addressCountry': 'KR',
      'postalCode': '12345'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 37.7749,
      'longitude': 127.4194
    },
    'amenityFeature': [
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Free WiFi',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Parking',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Mountain View',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Forest View',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Garden Access',
        'value': true
      }
    ],
    'checkinTime': '15:00',
    'checkoutTime': '11:00',
    'petsAllowed': false,
    'smokingAllowed': false
  },

  breadcrumbList: (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${baseSEO.siteUrl}${item.path}`
    }))
  }),

  room: (room) => ({
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    'name': room.name,
    'description': room.description,
    'image': `${baseSEO.siteUrl}${room.images.main}`,
    'floorSize': {
      '@type': 'QuantitativeValue',
      'value': room.size,
      'unitCode': 'MTK'
    },
    'occupancy': {
      '@type': 'QuantitativeValue',
      'maxValue': room.maxGuests
    },
    'amenityFeature': room.amenities.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      'name': amenity,
      'value': true
    })),
    'offers': {
      '@type': 'Offer',
      'price': room.pricePerNight,
      'priceCurrency': room.currency,
      'priceSpecification': {
        '@type': 'UnitPriceSpecification',
        'price': room.pricePerNight,
        'priceCurrency': room.currency,
        'referenceQuantity': {
          '@type': 'QuantitativeValue',
          'value': 1,
          'unitCode': 'DAY'
        }
      }
    }
  })
}

// Helper functions
export const getSEOConfig = (page) => {
  const pageConfig = pageSEO[page] || {}

  return {
    title: pageConfig.title || baseSEO.defaultTitle,
    description: pageConfig.description || baseSEO.defaultDescription,
    keywords: [...baseSEO.defaultKeywords, ...(pageConfig.keywords || [])],
    canonical: `${baseSEO.siteUrl}${pageConfig.path || ''}`,
    openGraph: {
      ...openGraphDefaults,
      title: pageConfig.openGraph?.title || pageConfig.title || baseSEO.defaultTitle,
      description: pageConfig.openGraph?.description || pageConfig.description || baseSEO.defaultDescription,
      url: `${baseSEO.siteUrl}${pageConfig.path || ''}`,
      images: pageConfig.openGraph?.images || openGraphDefaults.images,
      ...pageConfig.openGraph
    },
    twitter: {
      ...twitterDefaults,
      title: pageConfig.title || baseSEO.defaultTitle,
      description: pageConfig.description || baseSEO.defaultDescription,
    }
  }
}

export const generateStructuredData = (type, data = {}) => {
  switch (type) {
    case 'organization':
      return structuredData.organization
    case 'breadcrumb':
      return structuredData.breadcrumbList(data.items)
    case 'room':
      return structuredData.room(data.room)
    default:
      return null
  }
}