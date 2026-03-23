'use client'

import { useState } from 'react'
import { CreditCard, Tag, Gift, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useBookingStore } from '@/lib/booking-store'
import { useAuthStore } from '@/lib/auth-store'
import { toast } from 'sonner'

export function BookingStep4() {
  const {
    promoCode, promoDiscount, applyPromoCode, setPromoCode,
    useRewardPoints, setUseRewardPoints,
    cardNumber, cardExpiry, cardCvc, setCardDetails
  } = useBookingStore()
  
  const { user, isAuthenticated } = useAuthStore()
  const [promoInput, setPromoInput] = useState(promoCode)
  const [promoStatus, setPromoStatus] = useState<'idle' | 'valid' | 'invalid'>('idle')

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

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2">
          Payment Details
        </h3>
        <p className="text-muted-foreground">
          Complete your booking with secure payment
        </p>
      </div>

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
      {isAuthenticated && user && user.rewardPoints >= 100 && (
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
                You have {user.rewardPoints} points available
              </p>
            </div>
            <Switch
              checked={useRewardPoints}
              onCheckedChange={setUseRewardPoints}
            />
          </div>
        </div>
      )}

      {/* Card Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-primary" />
          <h4 className="font-serif text-lg font-bold text-card-foreground">
            Card Information
          </h4>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number *</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardDetails({ cardNumber: formatCardNumber(e.target.value) })}
            maxLength={19}
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cardExpiry">Expiry Date *</Label>
            <Input
              id="cardExpiry"
              placeholder="MM/YY"
              value={cardExpiry}
              onChange={(e) => setCardDetails({ cardExpiry: formatExpiry(e.target.value) })}
              maxLength={5}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardCvc">CVC *</Label>
            <Input
              id="cardCvc"
              placeholder="123"
              value={cardCvc}
              onChange={(e) => setCardDetails({ cardCvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
              maxLength={4}
              required
            />
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4">
          Your payment information is secure and encrypted. We never store your full card details.
        </p>
      </div>
    </div>
  )
}
