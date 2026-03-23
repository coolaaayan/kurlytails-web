'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Pet {
  id: string
  name: string
  breed: string
  size: string
  age: string
  notes?: string
}

export interface Booking {
  id: string
  serviceId: string
  serviceName: string
  addOns: string[]
  date: string
  time: string
  petName: string
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
  total: number
  groomer: string
}

export interface RefundRequest {
  id: string
  bookingId: string
  reason: string
  status: 'Pending' | 'Approved' | 'Partial' | 'Denied'
  amount: number
  createdAt: string
}

export interface PointsHistory {
  points: number
  description: string
  date: string
}

interface UserDataState {
  // Rewards
  rewardPoints: number
  tier: 'Puppy Love' | 'Gold Paw' | 'Platinum Tail'
  pointsHistory: PointsHistory[]
  
  // Bookings
  bookings: Booking[]
  
  // Pets
  pets: Pet[]
  
  // Refunds
  refundRequests: RefundRequest[]
  
  // Actions
  addPoints: (points: number, description: string) => void
  redeemPoints: (points: number, description: string) => void
  addBooking: (booking: Omit<Booking, 'id'>) => void
  cancelBooking: (bookingId: string) => void
  addPet: (pet: Omit<Pet, 'id'>) => void
  updatePet: (petId: string, data: Partial<Pet>) => void
  removePet: (petId: string) => void
  requestRefund: (bookingId: string, reason: string, amount: number) => void
}

const calculateTier = (points: number): 'Puppy Love' | 'Gold Paw' | 'Platinum Tail' => {
  if (points >= 1000) return 'Platinum Tail'
  if (points >= 500) return 'Gold Paw'
  return 'Puppy Love'
}

export const useUserDataStore = create<UserDataState>()(
  persist(
    (set, get) => ({
      // Initial state
      rewardPoints: 50, // Welcome bonus
      tier: 'Puppy Love',
      pointsHistory: [
        { points: 50, description: 'Welcome bonus', date: new Date().toLocaleDateString() }
      ],
      bookings: [],
      pets: [],
      refundRequests: [],

      // Actions
      addPoints: (points, description) => {
        const newTotal = get().rewardPoints + points
        set({
          rewardPoints: newTotal,
          tier: calculateTier(newTotal),
          pointsHistory: [
            { points, description, date: new Date().toLocaleDateString() },
            ...get().pointsHistory,
          ],
        })
      },

      redeemPoints: (points, description) => {
        const current = get().rewardPoints
        if (current >= points) {
          const newTotal = current - points
          set({
            rewardPoints: newTotal,
            tier: calculateTier(newTotal),
            pointsHistory: [
              { points: -points, description, date: new Date().toLocaleDateString() },
              ...get().pointsHistory,
            ],
          })
        }
      },

      addBooking: (booking) => {
        const newBooking: Booking = {
          ...booking,
          id: `booking-${Date.now()}`,
        }
        // Add reward points for booking (10% of total as points)
        const pointsEarned = Math.floor(booking.total * 0.1)
        set({
          bookings: [newBooking, ...get().bookings],
        })
        if (pointsEarned > 0) {
          get().addPoints(pointsEarned, `Earned from ${booking.serviceName} booking`)
        }
      },

      cancelBooking: (bookingId) => {
        set({
          bookings: get().bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b
          ),
        })
      },

      addPet: (pet) => {
        const newPet: Pet = {
          ...pet,
          id: `pet-${Date.now()}`,
        }
        set({ pets: [...get().pets, newPet] })
      },

      updatePet: (petId, data) => {
        set({
          pets: get().pets.map(p =>
            p.id === petId ? { ...p, ...data } : p
          ),
        })
      },

      removePet: (petId) => {
        set({
          pets: get().pets.filter(p => p.id !== petId),
        })
      },

      requestRefund: (bookingId, reason, amount) => {
        const newRequest: RefundRequest = {
          id: `refund-${Date.now()}`,
          bookingId,
          reason,
          status: 'Pending',
          amount,
          createdAt: new Date().toLocaleDateString(),
        }
        set({
          refundRequests: [newRequest, ...get().refundRequests],
        })
      },
    }),
    {
      name: 'kurlytails-user-data',
    }
  )
)
