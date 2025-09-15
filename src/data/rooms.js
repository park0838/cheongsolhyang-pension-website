/**
 * Room data for Cheongsolhyang Pension
 * Includes detailed information for each room type
 */

export const roomTypes = {
  FOREST_SUITE: 'forest-suite',
  MOUNTAIN_VIEW: 'mountain-view',
  GARDEN_DELUXE: 'garden-deluxe',
}

export const rooms = [
  {
    id: 'forest-suite',
    type: roomTypes.FOREST_SUITE,
    name: 'Forest Suite',
    subtitle: 'Premium Forest Experience',
    description: 'Immerse yourself in nature with our premium Forest Suite, featuring panoramic forest views and luxury amenities designed for the ultimate mountain retreat.',
    longDescription: 'The Forest Suite offers an unparalleled connection to nature with floor-to-ceiling windows overlooking pristine forest canopy. This spacious accommodation features a separate living area, premium bedding, and a private deck where you can enjoy morning coffee while listening to birdsong. The suite combines modern luxury with natural elements, creating a serene sanctuary for discerning guests.',

    // Pricing
    pricePerNight: 180000,
    currency: 'KRW',
    minStay: 1,
    maxGuests: 4,

    // Room specifications
    size: 85, // square meters
    bedConfiguration: '1 King bed + 1 Sofa bed',
    bathroom: 'Private bathroom with forest view bathtub',

    // Amenities
    amenities: [
      'Panoramic forest views',
      'Private forest-facing deck',
      'King-size premium bedding',
      'Separate living area',
      'Forest view bathtub',
      'Mini kitchen with coffee machine',
      'Free Wi-Fi',
      'Air conditioning & heating',
      'Smart TV with streaming',
      'Premium toiletries',
      'Bathrobes and slippers',
      'Mountain spring water',
    ],

    // Features for marketing
    highlights: [
      'Best forest views in the pension',
      'Largest room with separate living space',
      'Perfect for romantic getaways',
      'Premium amenities included',
    ],

    // Images
    images: {
      main: '/images/rooms/forest-suite/main.webp',
      gallery: [
        '/images/rooms/forest-suite/bedroom.webp',
        '/images/rooms/forest-suite/living-area.webp',
        '/images/rooms/forest-suite/bathroom.webp',
        '/images/rooms/forest-suite/deck.webp',
        '/images/rooms/forest-suite/view.webp',
      ],
      thumbnail: '/images/rooms/forest-suite/thumbnail.webp',
    },

    // SEO and metadata
    seo: {
      title: 'Forest Suite - Premium Mountain Accommodation | Cheongsolhyang Pension',
      description: 'Experience luxury in nature with our Forest Suite featuring panoramic forest views, private deck, and premium amenities. Perfect for couples and families.',
      keywords: 'forest suite, luxury accommodation, mountain view, premium room, nature retreat',
    },

    // Availability and booking
    availableSeasons: ['spring', 'summer', 'autumn', 'winter'],
    popularFeatures: ['forest views', 'private deck', 'bathtub'],
    roomCategory: 'premium',
    isAvailable: true,
    isFeatured: true,
  },

  {
    id: 'mountain-view',
    type: roomTypes.MOUNTAIN_VIEW,
    name: 'Mountain View',
    subtitle: 'Scenic Mountain Escape',
    description: 'Wake up to breathtaking mountain vistas in our Mountain View room, thoughtfully designed with comfort and tranquility in mind.',
    longDescription: 'The Mountain View room captures the majestic beauty of the surrounding peaks through large picture windows that frame the landscape like living artwork. This comfortable retreat features quality furnishings, a cozy seating area, and all the amenities needed for a restorative mountain getaway. Perfect for couples seeking a romantic escape or small families wanting to connect with nature.',

    // Pricing
    pricePerNight: 140000,
    currency: 'KRW',
    minStay: 1,
    maxGuests: 3,

    // Room specifications
    size: 65, // square meters
    bedConfiguration: '1 Queen bed + 1 Single bed',
    bathroom: 'Private bathroom with mountain view shower',

    // Amenities
    amenities: [
      'Stunning mountain views',
      'Queen-size comfortable bedding',
      'Cozy seating area',
      'Mountain view shower',
      'Kitchenette with essentials',
      'Free Wi-Fi',
      'Air conditioning & heating',
      'Smart TV',
      'Quality toiletries',
      'Coffee and tea facilities',
      'Mountain spring water',
      'Blackout curtains',
    ],

    // Features for marketing
    highlights: [
      'Spectacular mountain panorama',
      'Perfect for couples and small families',
      'Comfortable and well-appointed',
      'Great value for mountain views',
    ],

    // Images
    images: {
      main: '/images/rooms/mountain-view/main.webp',
      gallery: [
        '/images/rooms/mountain-view/bedroom.webp',
        '/images/rooms/mountain-view/seating-area.webp',
        '/images/rooms/mountain-view/bathroom.webp',
        '/images/rooms/mountain-view/view.webp',
        '/images/rooms/mountain-view/kitchenette.webp',
      ],
      thumbnail: '/images/rooms/mountain-view/thumbnail.webp',
    },

    // SEO and metadata
    seo: {
      title: 'Mountain View Room - Scenic Mountain Accommodation | Cheongsolhyang Pension',
      description: 'Enjoy breathtaking mountain vistas from our comfortable Mountain View room. Perfect for couples and small families seeking natural beauty.',
      keywords: 'mountain view, scenic room, comfortable accommodation, mountain retreat, family room',
    },

    // Availability and booking
    availableSeasons: ['spring', 'summer', 'autumn', 'winter'],
    popularFeatures: ['mountain views', 'comfortable bedding', 'kitchenette'],
    roomCategory: 'standard-plus',
    isAvailable: true,
    isFeatured: true,
  },

  {
    id: 'garden-deluxe',
    type: roomTypes.GARDEN_DELUXE,
    name: 'Garden Deluxe',
    subtitle: 'Serene Garden Sanctuary',
    description: 'Relax in our peaceful Garden Deluxe room with direct access to beautifully landscaped gardens and a tranquil atmosphere.',
    longDescription: 'The Garden Deluxe room offers a ground-level sanctuary with direct access to our meticulously maintained gardens. Large sliding doors open onto a private patio where you can enjoy the fragrance of seasonal flowers and the gentle sounds of nature. This room is ideal for those who prefer easy garden access and enjoy spending time outdoors in a beautifully landscaped setting.',

    // Pricing
    pricePerNight: 120000,
    currency: 'KRW',
    minStay: 1,
    maxGuests: 2,

    // Room specifications
    size: 55, // square meters
    bedConfiguration: '1 Queen bed',
    bathroom: 'Private bathroom with garden view',

    // Amenities
    amenities: [
      'Direct garden access',
      'Private patio with garden furniture',
      'Queen-size premium bedding',
      'Garden view bathroom',
      'Basic kitchenette',
      'Free Wi-Fi',
      'Air conditioning & heating',
      'Smart TV',
      'Eco-friendly toiletries',
      'Coffee and tea station',
      'Garden spring water',
      'Reading nook',
    ],

    // Features for marketing
    highlights: [
      'Direct access to beautiful gardens',
      'Private patio for relaxation',
      'Perfect for nature lovers',
      'Peaceful and serene atmosphere',
    ],

    // Images
    images: {
      main: '/images/rooms/garden-deluxe/main.webp',
      gallery: [
        '/images/rooms/garden-deluxe/bedroom.webp',
        '/images/rooms/garden-deluxe/patio.webp',
        '/images/rooms/garden-deluxe/bathroom.webp',
        '/images/rooms/garden-deluxe/garden-view.webp',
        '/images/rooms/garden-deluxe/reading-nook.webp',
      ],
      thumbnail: '/images/rooms/garden-deluxe/thumbnail.webp',
    },

    // SEO and metadata
    seo: {
      title: 'Garden Deluxe Room - Garden Access Accommodation | Cheongsolhyang Pension',
      description: 'Enjoy direct garden access and tranquil surroundings in our Garden Deluxe room with private patio and peaceful atmosphere.',
      keywords: 'garden access, deluxe room, private patio, peaceful accommodation, nature lovers',
    },

    // Availability and booking
    availableSeasons: ['spring', 'summer', 'autumn'],
    popularFeatures: ['garden access', 'private patio', 'peaceful setting'],
    roomCategory: 'standard',
    isAvailable: true,
    isFeatured: false,
  },
]

// Helper functions
export const getRoomById = (id) => {
  return rooms.find(room => room.id === id)
}

export const getRoomsByCategory = (category) => {
  return rooms.filter(room => room.roomCategory === category)
}

export const getFeaturedRooms = () => {
  return rooms.filter(room => room.isFeatured)
}

export const getAvailableRooms = (season = null) => {
  if (!season) {
    return rooms.filter(room => room.isAvailable)
  }
  return rooms.filter(room =>
    room.isAvailable && room.availableSeasons.includes(season)
  )
}

export const formatPrice = (price, currency = 'KRW') => {
  const formatter = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  })
  return formatter.format(price)
}

export const getRoomCapacity = (roomId) => {
  const room = getRoomById(roomId)
  return room ? room.maxGuests : 0
}

// Room comparison helper
export const compareRooms = (roomIds) => {
  return roomIds.map(id => getRoomById(id)).filter(Boolean)
}