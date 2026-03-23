'use client'

import { create } from 'zustand'

export interface BookingState {
  // Step 1: Service selection
  selectedService: string | null
  selectedAddOns: string[]
  
  // Step 2: Date and time
  selectedDate: Date | null
  selectedTime: string | null
  
  // Step 3: Pet and owner details
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  petName: string
  petBreed: string
  petSize: string
  petAge: string
  notes: string
  
  // Step 4: Payment
  promoCode: string
  promoDiscount: number
  useRewardPoints: boolean
  rewardPointsDiscount: number
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  
  // Actions
  setSelectedService: (service: string | null) => void
  toggleAddOn: (addOn: string) => void
  setSelectedDate: (date: Date | null) => void
  setSelectedTime: (time: string | null) => void
  setOwnerDetails: (details: Partial<Pick<BookingState, 'ownerName' | 'ownerEmail' | 'ownerPhone'>>) => void
  setPetDetails: (details: Partial<Pick<BookingState, 'petName' | 'petBreed' | 'petSize' | 'petAge' | 'notes'>>) => void
  setPromoCode: (code: string) => void
  applyPromoCode: (code: string) => boolean
  setUseRewardPoints: (use: boolean) => void
  setCardDetails: (details: Partial<Pick<BookingState, 'cardNumber' | 'cardExpiry' | 'cardCvc'>>) => void
  reset: () => void
}

const initialState = {
  selectedService: null,
  selectedAddOns: [],
  selectedDate: null,
  selectedTime: null,
  ownerName: '',
  ownerEmail: '',
  ownerPhone: '',
  petName: '',
  petBreed: '',
  petSize: '',
  petAge: '',
  notes: '',
  promoCode: '',
  promoDiscount: 0,
  useRewardPoints: false,
  rewardPointsDiscount: 0,
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
}

export const useBookingStore = create<BookingState>((set, get) => ({
  ...initialState,
  
  setSelectedService: (service) => set({ selectedService: service }),
  
  toggleAddOn: (addOn) => set((state) => ({
    selectedAddOns: state.selectedAddOns.includes(addOn)
      ? state.selectedAddOns.filter((a) => a !== addOn)
      : [...state.selectedAddOns, addOn]
  })),
  
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  setSelectedTime: (time) => set({ selectedTime: time }),
  
  setOwnerDetails: (details) => set(details),
  
  setPetDetails: (details) => set(details),
  
  setPromoCode: (code) => set({ promoCode: code }),
  
  applyPromoCode: (code) => {
    if (code.toUpperCase() === 'KURLY10') {
      set({ promoCode: code, promoDiscount: 10 })
      return true
    }
    set({ promoCode: '', promoDiscount: 0 })
    return false
  },
  
  setUseRewardPoints: (use) => set({ 
    useRewardPoints: use, 
    rewardPointsDiscount: use ? 5 : 0 
  }),
  
  setCardDetails: (details) => set(details),
  
  reset: () => set(initialState),
}))
