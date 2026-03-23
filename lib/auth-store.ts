'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  rewardPoints: number
  tier: 'Puppy Pal' | 'Gold Paw' | 'Platinum Tail'
  createdAt: Date
}

export interface Pet {
  id: string
  name: string
  breed: string
  size: string
  age: string
  notes?: string
  image?: string
}

export interface Booking {
  id: string
  serviceId: string
  serviceName: string
  addOns: string[]
  date: string
  time: string
  petName: string
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'
  total: number
  groomer?: string
}

export interface RefundRequest {
  id: string
  bookingId: string
  reason: string
  status: 'Pending' | 'Approved' | 'Partial' | 'Denied'
  amount: number
  createdAt: string
}

interface AuthState {
  user: User | null
  pets: Pet[]
  bookings: Booking[]
  refundRequests: RefundRequest[]
  pointsHistory: { date: string; points: number; description: string }[]
  isAuthenticated: boolean
  
  // Actions
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  addPet: (pet: Omit<Pet, 'id'>) => void
  updatePet: (id: string, updates: Partial<Pet>) => void
  removePet: (id: string) => void
  addBooking: (booking: Omit<Booking, 'id'>) => void
  cancelBooking: (id: string) => void
  requestRefund: (bookingId: string, reason: string, amount: number) => void
  addPoints: (points: number, description: string) => void
  redeemPoints: (points: number, description: string) => void
}

// Mock user for demo
const mockUser: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@kurlytails.com',
  phone: '(555) 123-4567',
  rewardPoints: 750,
  tier: 'Gold Paw',
  createdAt: new Date('2024-01-15'),
}

const mockPets: Pet[] = [
  { id: '1', name: 'Buddy', breed: 'Golden Retriever', size: 'Large (50-80 lbs)', age: 'Adult (1-7 years)' },
  { id: '2', name: 'Luna', breed: 'French Bulldog', size: 'Small (under 20 lbs)', age: 'Adult (1-7 years)' },
]

const mockBookings: Booking[] = [
  { id: '1', serviceId: 'full-groom', serviceName: 'Full Groom', addOns: ['De-shedding Treatment'], date: '2025-03-28', time: '10:00 AM', petName: 'Buddy', status: 'Confirmed', total: 100, groomer: 'Alex' },
  { id: '2', serviceId: 'spa-day', serviceName: 'Spa Day', addOns: [], date: '2025-03-15', time: '2:00 PM', petName: 'Luna', status: 'Completed', total: 95 },
  { id: '3', serviceId: 'bath-brush', serviceName: 'Bath & Brush', addOns: ['Flea Treatment'], date: '2025-02-20', time: '11:00 AM', petName: 'Buddy', status: 'Completed', total: 60 },
]

const mockPointsHistory = [
  { date: '2025-03-15', points: 95, description: 'Spa Day for Luna' },
  { date: '2025-02-20', points: 60, description: 'Bath & Brush for Buddy' },
  { date: '2025-01-15', points: 50, description: 'Welcome bonus' },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      pets: [],
      bookings: [],
      refundRequests: [],
      pointsHistory: [],
      isAuthenticated: false,
      
      login: (email, password) => {
        // Mock login - in production this would validate against a backend
        if (email && password) {
          set({ 
            user: mockUser, 
            pets: mockPets, 
            bookings: mockBookings,
            pointsHistory: mockPointsHistory,
            isAuthenticated: true 
          })
          return true
        }
        return false
      },
      
      register: (name, email, password) => {
        if (name && email && password) {
          const newUser: User = {
            id: Date.now().toString(),
            name,
            email,
            rewardPoints: 50, // 50 bonus points on signup
            tier: 'Puppy Pal',
            createdAt: new Date(),
          }
          set({ 
            user: newUser, 
            pets: [], 
            bookings: [],
            pointsHistory: [{ date: new Date().toISOString().split('T')[0], points: 50, description: 'Welcome bonus' }],
            isAuthenticated: true 
          })
          return true
        }
        return false
      },
      
      logout: () => {
        set({ 
          user: null, 
          pets: [], 
          bookings: [], 
          refundRequests: [],
          pointsHistory: [],
          isAuthenticated: false 
        })
      },
      
      updateProfile: (updates) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, ...updates } })
        }
      },
      
      addPet: (pet) => {
        const newPet: Pet = { ...pet, id: Date.now().toString() }
        set((state) => ({ pets: [...state.pets, newPet] }))
      },
      
      updatePet: (id, updates) => {
        set((state) => ({
          pets: state.pets.map((pet) => 
            pet.id === id ? { ...pet, ...updates } : pet
          )
        }))
      },
      
      removePet: (id) => {
        set((state) => ({ pets: state.pets.filter((pet) => pet.id !== id) }))
      },
      
      addBooking: (booking) => {
        const newBooking: Booking = { ...booking, id: Date.now().toString() }
        set((state) => ({ bookings: [...state.bookings, newBooking] }))
        // Add reward points
        get().addPoints(Math.floor(booking.total), `${booking.serviceName} for ${booking.petName}`)
      },
      
      cancelBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id ? { ...booking, status: 'Cancelled' as const } : booking
          )
        }))
      },
      
      requestRefund: (bookingId, reason, amount) => {
        const refund: RefundRequest = {
          id: Date.now().toString(),
          bookingId,
          reason,
          status: 'Pending',
          amount,
          createdAt: new Date().toISOString().split('T')[0],
        }
        set((state) => ({ refundRequests: [...state.refundRequests, refund] }))
      },
      
      addPoints: (points, description) => {
        const { user, pointsHistory } = get()
        if (user) {
          const newPoints = user.rewardPoints + points
          let tier: User['tier'] = 'Puppy Pal'
          if (newPoints >= 1000) tier = 'Platinum Tail'
          else if (newPoints >= 500) tier = 'Gold Paw'
          
          set({ 
            user: { ...user, rewardPoints: newPoints, tier },
            pointsHistory: [
              { date: new Date().toISOString().split('T')[0], points, description },
              ...pointsHistory
            ]
          })
        }
      },
      
      redeemPoints: (points, description) => {
        const { user, pointsHistory } = get()
        if (user && user.rewardPoints >= points) {
          const newPoints = user.rewardPoints - points
          let tier: User['tier'] = 'Puppy Pal'
          if (newPoints >= 1000) tier = 'Platinum Tail'
          else if (newPoints >= 500) tier = 'Gold Paw'
          
          set({ 
            user: { ...user, rewardPoints: newPoints, tier },
            pointsHistory: [
              { date: new Date().toISOString().split('T')[0], points: -points, description },
              ...pointsHistory
            ]
          })
        }
      },
    }),
    {
      name: 'kurlytails-auth',
    }
  )
)
