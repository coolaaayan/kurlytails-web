'use client'

import { useState } from 'react'
import { Tag, Gift, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useBookingStore } from '@/lib/booking-store'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import StripeCheckout from '@/components/stripe-checkout'

interface BookingStep4Props {
  onPaymentComplete?: () => void
}

export function BookingStep4({ onPaymentComplete }: BookingStep4Props) {
  const {
    selectedService,
    selectedAddOns,
    selectedDate,
    selectedTime,
    petName,
    promoCode, 
    promoDiscount, 
    applyPromoCode, 
    setPromoCode,
    useRewardPoints, 
    setUseRewardPoints,
  } = useBookingStore()
  
  const { user, isSignedIn } = useUser()
  const [promoInput, setPromoInput] = useState(promoCode)
  const [promoStatus, setPromoStatus] = useState<'idle' | 'valid' | 'invalid'>('idle')
  const [showCheckout, setShowCheckout] = useState(false)

  const handleApplyPromo = () => {
    const success = applyPromoCode(promoInput)
    if (success) {
      setPromoStatus('valid')
      toast.success('Promo code applied! 10% off your order.')
    } else {
      setPromoStatus('invalid')
      toast.error('Invalid promo code')
    }
  }

  const handleRemovePromo = () => {
    setPromoInput('')
    setPromoCode('')
    setPromoStatus('idle')
  }

  const handleProceedToPayment = () => {
    setShowCheckout(true)
  }

  // Mock reward points (in a real app, this would come from your database)
  const userRewardPoints = isSignedIn ? 250 : 0

  if (!selectedService) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Please select a service first.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2">
          Payment Details
        </h3>
        <p className="text-muted-foreground">
          Complete your booking with secure payment via Stripe
        </p>
      </div>

      {!showCheckout ? (
        <>
          {/* Promo Code */}
          <div className="space-y-4 p-4 bg-secondary/50 rounded-xl">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              <h4 className="font-serif text-lg font-bold text-card-foreground">
                Promo Code
              </h4>
            </div>
            
            {promoStatus === 'valid' ? (
              <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  <span className="font-medium text-foreground">KURLY10</span>
                  <span className="text-sm text-muted-foreground">- 10% off applied</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleRemovePromo}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value.toUpperCase())
                    setPromoStatus('idle')
                  }}
                  className={promoStatus === 'invalid' ? 'border-destructive' : ''}
                />
                <Button onClick={handleApplyPromo} variant="outline">
                  Apply
                </Button>
              </div>
            )}
            {promoStatus === 'invalid' && (
              <p className="text-sm text-destructive">Invalid promo code. Try KURLY10!</p>
            )}
          </div>

          {/* Reward Points */}
          {isSignedIn && userRewardPoints >= 100 && (
            <div className="space-y-4 p-4 bg-secondary/50 rounded-xl">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" />
                <h4 className="font-serif text-lg font-bold text-card-foreground">
                  Reward Points
                </h4>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground">Use 100 points for $5 off</p>
                  <p className="text-sm text-muted-foreground">
                    You have {userRewardPoints} points available
                  </p>
                </div>
                <Switch
                  checked={useRewardPoints}
                  onCheckedChange={setUseRewardPoints}
                />
              </div>
            </div>
          )}

          {/* Proceed to Payment Button */}
          <Button 
            onClick={handleProceedToPayment} 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            Proceed to Secure Payment
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            Your payment is processed securely by Stripe. We never store your card details.
          </p>
        </>
      ) : (
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => setShowCheckout(false)}
            className="mb-4"
          >
            Back to Discounts
          </Button>
          
          <StripeCheckout
            serviceId={selectedService}
            addOnIds={selectedAddOns}
            promoCode={promoStatus === 'valid' ? promoCode : undefined}
            appointmentDate={selectedDate?.toISOString()}
            appointmentTime={selectedTime || undefined}
            petName={petName}
            onComplete={onPaymentComplete}
          />
        </div>
      )}
    </div>
  )
}
