'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Calendar, Clock, Dog, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBookingStore } from '@/lib/booking-store'
import { services } from '@/lib/data'
import Link from 'next/link'

interface BookingStep5Props {
  onReset: () => void
}

export function BookingStep5({ onReset }: BookingStep5Props) {
  const { selectedService, selectedDate, selectedTime, petName, ownerName } = useBookingStore()
  const service = services.find(s => s.id === selectedService)

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-accent/20 mx-auto mb-6 flex items-center justify-center"
      >
        <CheckCircle className="w-12 h-12 text-accent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-serif text-3xl font-bold text-card-foreground mb-2">
          Booking Confirmed!
        </h3>
        <p className="text-muted-foreground mb-8">
          Thank you, {ownerName.split(' ')[0]}! We can&apos;t wait to see {petName}!
        </p>

        <div className="bg-secondary/50 rounded-xl p-6 text-left space-y-4 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Service</p>
              <p className="font-medium text-foreground">{service?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium text-foreground">{formatDate(selectedDate)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium text-foreground">{selectedTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Dog className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Pet</p>
              <p className="font-medium text-foreground">{petName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium text-foreground">123 Pawsome Street, SF</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-6 mb-8">
          A confirmation email has been sent to your inbox.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onReset} variant="outline">
            Book Another Appointment
          </Button>
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              View My Bookings
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
