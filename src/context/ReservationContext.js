import { createContext, useContext, useReducer } from 'react'

// Initial state for reservation
const initialState = {
  selectedRoom: null,
  checkInDate: null,
  checkOutDate: null,
  guestCount: 1,
  contactInfo: {
    name: '',
    email: '',
    phone: '',
    message: '',
  },
  formErrors: {},
  isSubmitting: false,
  currentStep: 1, // 1: Room, 2: Dates, 3: Contact, 4: Confirmation
}

// Action types
const RESERVATION_ACTIONS = {
  SET_ROOM: 'SET_ROOM',
  SET_DATES: 'SET_DATES',
  SET_GUEST_COUNT: 'SET_GUEST_COUNT',
  SET_CONTACT_INFO: 'SET_CONTACT_INFO',
  SET_FORM_ERRORS: 'SET_FORM_ERRORS',
  SET_SUBMITTING: 'SET_SUBMITTING',
  SET_STEP: 'SET_STEP',
  NEXT_STEP: 'NEXT_STEP',
  PREV_STEP: 'PREV_STEP',
  RESET_RESERVATION: 'RESET_RESERVATION',
  UPDATE_FIELD: 'UPDATE_FIELD',
}

// Reducer function
const reservationReducer = (state, action) => {
  switch (action.type) {
    case RESERVATION_ACTIONS.SET_ROOM:
      return {
        ...state,
        selectedRoom: action.payload,
        formErrors: {},
      }

    case RESERVATION_ACTIONS.SET_DATES:
      return {
        ...state,
        checkInDate: action.payload.checkIn,
        checkOutDate: action.payload.checkOut,
        formErrors: {},
      }

    case RESERVATION_ACTIONS.SET_GUEST_COUNT:
      return {
        ...state,
        guestCount: action.payload,
      }

    case RESERVATION_ACTIONS.SET_CONTACT_INFO:
      return {
        ...state,
        contactInfo: {
          ...state.contactInfo,
          ...action.payload,
        },
        formErrors: {},
      }

    case RESERVATION_ACTIONS.SET_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
      }

    case RESERVATION_ACTIONS.SET_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.payload,
      }

    case RESERVATION_ACTIONS.SET_STEP:
      return {
        ...state,
        currentStep: action.payload,
      }

    case RESERVATION_ACTIONS.NEXT_STEP:
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 4),
      }

    case RESERVATION_ACTIONS.PREV_STEP:
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      }

    case RESERVATION_ACTIONS.UPDATE_FIELD:
      return {
        ...state,
        [action.field]: action.value,
        formErrors: {
          ...state.formErrors,
          [action.field]: undefined,
        },
      }

    case RESERVATION_ACTIONS.RESET_RESERVATION:
      return initialState

    default:
      return state
  }
}

// Create contexts
const ReservationContext = createContext()
const ReservationDispatchContext = createContext()

// Provider component
export const ReservationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reservationReducer, initialState)

  return (
    <ReservationContext.Provider value={state}>
      <ReservationDispatchContext.Provider value={dispatch}>
        {children}
      </ReservationDispatchContext.Provider>
    </ReservationContext.Provider>
  )
}

// Custom hooks
export const useReservation = () => {
  const context = useContext(ReservationContext)
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider')
  }
  return context
}

export const useReservationDispatch = () => {
  const context = useContext(ReservationDispatchContext)
  if (!context) {
    throw new Error('useReservationDispatch must be used within a ReservationProvider')
  }
  return context
}

// Action creators
export const reservationActions = {
  setRoom: (room) => ({
    type: RESERVATION_ACTIONS.SET_ROOM,
    payload: room,
  }),

  setDates: (checkIn, checkOut) => ({
    type: RESERVATION_ACTIONS.SET_DATES,
    payload: { checkIn, checkOut },
  }),

  setGuestCount: (count) => ({
    type: RESERVATION_ACTIONS.SET_GUEST_COUNT,
    payload: count,
  }),

  setContactInfo: (info) => ({
    type: RESERVATION_ACTIONS.SET_CONTACT_INFO,
    payload: info,
  }),

  setFormErrors: (errors) => ({
    type: RESERVATION_ACTIONS.SET_FORM_ERRORS,
    payload: errors,
  }),

  setSubmitting: (isSubmitting) => ({
    type: RESERVATION_ACTIONS.SET_SUBMITTING,
    payload: isSubmitting,
  }),

  setStep: (step) => ({
    type: RESERVATION_ACTIONS.SET_STEP,
    payload: step,
  }),

  nextStep: () => ({
    type: RESERVATION_ACTIONS.NEXT_STEP,
  }),

  prevStep: () => ({
    type: RESERVATION_ACTIONS.PREV_STEP,
  }),

  updateField: (field, value) => ({
    type: RESERVATION_ACTIONS.UPDATE_FIELD,
    field,
    value,
  }),

  resetReservation: () => ({
    type: RESERVATION_ACTIONS.RESET_RESERVATION,
  }),
}

// Validation helpers
export const validateReservationStep = (step, state) => {
  const errors = {}

  switch (step) {
    case 1: // Room selection
      if (!state.selectedRoom) {
        errors.room = 'Please select a room'
      }
      break

    case 2: // Date selection
      if (!state.checkInDate) {
        errors.checkIn = 'Please select check-in date'
      }
      if (!state.checkOutDate) {
        errors.checkOut = 'Please select check-out date'
      }
      if (state.checkInDate && state.checkOutDate) {
        const checkIn = new Date(state.checkInDate)
        const checkOut = new Date(state.checkOutDate)

        if (checkIn >= checkOut) {
          errors.dates = 'Check-out date must be after check-in date'
        }

        if (checkIn < new Date().setHours(0, 0, 0, 0)) {
          errors.checkIn = 'Check-in date cannot be in the past'
        }
      }
      if (state.guestCount < 1 || state.guestCount > 10) {
        errors.guestCount = 'Guest count must be between 1 and 10'
      }
      break

    case 3: // Contact information
      if (!state.contactInfo.name.trim()) {
        errors.name = 'Name is required'
      }
      if (!state.contactInfo.email.trim()) {
        errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.contactInfo.email)) {
        errors.email = 'Please enter a valid email address'
      }
      if (!state.contactInfo.phone.trim()) {
        errors.phone = 'Phone number is required'
      } else if (!/^[\d\s\-\+\(\)]+$/.test(state.contactInfo.phone)) {
        errors.phone = 'Please enter a valid phone number'
      }
      break

    default:
      break
  }

  return errors
}

// Calculate total cost (example implementation)
export const calculateTotalCost = (state) => {
  if (!state.selectedRoom || !state.checkInDate || !state.checkOutDate) {
    return 0
  }

  const checkIn = new Date(state.checkInDate)
  const checkOut = new Date(state.checkOutDate)
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))

  return nights * state.selectedRoom.pricePerNight
}