'use client'

import { useCallback, useState } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { startCheckoutSession } from '@/app/actions/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripeCheckoutProps {
  serviceId: string
  addOnIds?: string[]
  promoCode?: string
  appointmentDate?: string
  appointmentTime?: string
  petName?: string
  onComplete?: () => void
}

export default function StripeCheckout({
  serviceId,
  addOnIds = [],
  promoCode,
  appointmentDate,
  appointmentTime,
  petName,
  onComplete,
}: StripeCheckoutProps) {
  const [isComplete, setIsComplete] = useState(false)

  const fetchClientSecret = useCallback(
    () => startCheckoutSession(serviceId, addOnIds, promoCode, appointmentDate, appointmentTime, petName),
    [serviceId, addOnIds, promoCode, appointmentDate, appointmentTime, petName]
  )

  const handleComplete = useCallback(() => {
    setIsComplete(true)
    onComplete?.()
  }, [onComplete])

  if (isComplete) {
    return null
  }

  return (
    <div id="checkout" className="w-full">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ 
          fetchClientSecret,
          onComplete: handleComplete,
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
