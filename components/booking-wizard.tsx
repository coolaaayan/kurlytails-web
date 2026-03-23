'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useBookingStore } from '@/lib/booking-store'
import { useUserDataStore } from '@/lib/user-data-store'
import { services, addOns } from '@/lib/data'
import { BookingStep1 } from '@/components/booking/step-1-service'
import { BookingStep2 } from '@/components/booking/step-2-datetime'
import { BookingStep3 } from '@/components/booking/step-3-details'
import { BookingStep4 } from '@/components/booking/step-4-payment'
import { BookingStep5 } from '@/components/booking/step-5-confirmation'
import { BookingSummary } from '@/components/booking/booking-summary'

const steps = [
  { id: 1, name: 'Service', description: 'Choose your service' },
  { id: 2, name: 'Date & Time', description: 'Pick a slot' },
  { id: 3, name: 'Details', description: 'Pet & owner info' },
  { id: 4, name: 'Payment', description: 'Complete booking' },
  { id: 5, name: 'Confirmation', description: 'All done!' },
]

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isBooked, setIsBooked] = useState(false)
  const booking = useBookingStore()
  const { addBooking } = useUserDataStore()

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return booking.selectedService !== null
      case 2:
        return booking.selectedDate !== null && booking.selectedTime !== null
      case 3:
        return booking.ownerName && booking.ownerEmail && booking.ownerPhone && 
               booking.petName && booking.petBreed && booking.petSize && booking.petAge
      case 4:
        return booking.paymentComplete
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < 5 && canProceed()) {
      if (currentStep === 4) {
        // Process booking
        const service = services.find(s => s.id === booking.selectedService)
        if (service) {
          const addOnTotal = booking.selectedAddOns.reduce((sum, id) => {
            const addon = addOns.find(a => a.id === id)
            return sum + (addon?.price || 0)
          }, 0)
          
          let total = service.price + addOnTotal
          if (booking.promoDiscount > 0) {
            total = total * (1 - booking.promoDiscount / 100)
          }
          if (booking.useRewardPoints) {
            total = total - booking.rewardPointsDiscount
          }

          addBooking({
            serviceId: service.id,
            serviceName: service.name,
            addOns: booking.selectedAddOns,
            date: booking.selectedDate?.toISOString().split('T')[0] || '',
            time: booking.selectedTime || '',
            petName: booking.petName,
            status: 'Confirmed',
            total: Math.max(0, total),
            groomer: 'Assigned at check-in'
          })
        }
        setIsBooked(true)
      }
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    booking.reset()
    setCurrentStep(1)
    setIsBooked(false)
  }

  return (
    <section id="booking" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-accent text-xl text-accent mb-2">Book Now</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Schedule Your Appointment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Book your pup&apos;s grooming session in just a few easy steps!
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentStep > step.id
                        ? 'bg-accent text-accent-foreground'
                        : currentStep === step.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className="hidden md:block text-xs mt-1 text-muted-foreground">
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 md:w-20 h-1 mx-2 rounded transition-colors ${
                      currentStep > step.id ? 'bg-accent' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card border-border">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 1 && <BookingStep1 />}
                  {currentStep === 2 && <BookingStep2 />}
                  {currentStep === 3 && <BookingStep3 />}
                  {currentStep === 4 && <BookingStep4 />}
                  {currentStep === 5 && <BookingStep5 onReset={handleReset} />}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {currentStep < 5 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {currentStep === 4 ? 'Complete Booking' : 'Next'}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <BookingSummary currentStep={currentStep} />
          </div>
        </div>
      </div>
    </section>
  )
}
