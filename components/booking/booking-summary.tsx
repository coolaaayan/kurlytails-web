'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useBookingStore } from '@/lib/booking-store'
import { services, addOns } from '@/lib/data'
import { Calendar, Clock, Dog, Tag, Gift } from 'lucide-react'

interface BookingSummaryProps {
  currentStep: number
}

export function BookingSummary({ currentStep }: BookingSummaryProps) {
  const {
    selectedService, selectedAddOns, selectedDate, selectedTime,
    petName, promoDiscount, useRewardPoints, rewardPointsDiscount
  } = useBookingStore()

  const service = services.find(s => s.id === selectedService)
  const selectedAddOnItems = addOns.filter(a => selectedAddOns.includes(a.id))

  const subtotal = (service?.price || 0) + selectedAddOnItems.reduce((sum, a) => sum + a.price, 0)
  const promoAmount = promoDiscount > 0 ? subtotal * (promoDiscount / 100) : 0
  const total = Math.max(0, subtotal - promoAmount - (useRewardPoints ? rewardPointsDiscount : 0))

  const formatDate = (date: Date | null) => {
    if (!date) return null
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <Card className="sticky top-24 bg-card border-border">
      <CardHeader>
        <CardTitle className="font-serif text-xl text-card-foreground">
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Service */}
        {service ? (
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-card-foreground">{service.name}</p>
              <p className="text-sm text-muted-foreground">{service.duration}</p>
            </div>
            <p className="font-medium text-foreground">${service.price}</p>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No service selected</p>
        )}

        {/* Add-ons */}
        {selectedAddOnItems.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium text-card-foreground">Add-ons:</p>
              {selectedAddOnItems.map(addon => (
                <div key={addon.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{addon.name}</span>
                  <span className="text-foreground">+${addon.price}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Date & Time */}
        {(selectedDate || selectedTime) && (
          <>
            <Separator />
            <div className="space-y-2">
              {selectedDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{formatDate(selectedDate)}</span>
                </div>
              )}
              {selectedTime && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{selectedTime}</span>
                </div>
              )}
            </div>
          </>
        )}

        {/* Pet Name */}
        {petName && (
          <>
            <Separator />
            <div className="flex items-center gap-2 text-sm">
              <Dog className="w-4 h-4 text-primary" />
              <span className="text-foreground">{petName}</span>
            </div>
          </>
        )}

        {/* Discounts */}
        {(promoDiscount > 0 || useRewardPoints) && (
          <>
            <Separator />
            <div className="space-y-2">
              {promoDiscount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-accent">
                    <Tag className="w-4 h-4" />
                    <span>KURLY10 ({promoDiscount}% off)</span>
                  </div>
                  <span className="text-accent">-${promoAmount.toFixed(2)}</span>
                </div>
              )}
              {useRewardPoints && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-accent">
                    <Gift className="w-4 h-4" />
                    <span>Reward Points</span>
                  </div>
                  <span className="text-accent">-${rewardPointsDiscount}</span>
                </div>
              )}
            </div>
          </>
        )}

        {/* Total */}
        <Separator />
        <div className="flex justify-between items-center">
          <span className="font-serif text-lg font-bold text-card-foreground">Total</span>
          <span className="font-serif text-2xl font-bold text-foreground">
            ${total.toFixed(2)}
          </span>
        </div>

        {currentStep < 5 && (
          <p className="text-xs text-muted-foreground text-center">
            Payment processed securely at checkout
          </p>
        )}
      </CardContent>
    </Card>
  )
}
