'use server'

import { stripe } from '@/lib/stripe'
import { PRODUCTS, ADD_ON_PRODUCTS, getProductById } from '@/lib/products'

interface BookingLineItem {
  id: string
  quantity?: number
}

export async function startCheckoutSession(
  serviceId: string,
  addOnIds: string[] = [],
  promoCode?: string,
  appointmentDate?: string,
  appointmentTime?: string,
  petName?: string
) {
  const service = PRODUCTS.find((p) => p.id === serviceId)
  if (!service) {
    throw new Error(`Service with id "${serviceId}" not found`)
  }

  // Build line items
  const lineItems: {
    price_data: {
      currency: string
      product_data: {
        name: string
        description?: string
      }
      unit_amount: number
    }
    quantity: number
  }[] = [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: service.name,
          description: service.description,
        },
        unit_amount: service.priceInCents,
      },
      quantity: 1,
    },
  ]

  // Add add-ons
  for (const addOnId of addOnIds) {
    const addOn = ADD_ON_PRODUCTS.find((p) => p.id === addOnId)
    if (addOn) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: addOn.name,
            description: addOn.description,
          },
          unit_amount: addOn.priceInCents,
        },
        quantity: 1,
      })
    }
  }

  // Calculate discount
  let discounts: { coupon: string }[] = []
  if (promoCode?.toUpperCase() === 'KURLY10') {
    // Create a one-time coupon for 10% off
    const coupon = await stripe.coupons.create({
      percent_off: 10,
      duration: 'once',
      name: 'KURLY10 - 10% Off',
    })
    discounts = [{ coupon: coupon.id }]
  }

  // Create metadata for the appointment
  const metadata: Record<string, string> = {}
  if (appointmentDate) metadata.appointment_date = appointmentDate
  if (appointmentTime) metadata.appointment_time = appointmentTime
  if (petName) metadata.pet_name = petName

  // Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    line_items: lineItems,
    mode: 'payment',
    discounts: discounts.length > 0 ? discounts : undefined,
    metadata,
  })

  return session.client_secret
}

export async function getCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return {
    status: session.status,
    paymentStatus: session.payment_status,
    amountTotal: session.amount_total,
  }
}
