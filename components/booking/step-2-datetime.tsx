'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBookingStore } from '@/lib/booking-store'
import { timeSlots } from '@/lib/data'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December']

export function BookingStep2() {
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } = useBookingStore()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days: (Date | null)[] = []

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const days = getDaysInMonth(currentMonth)

  const isPastDate = (date: Date) => {
    return date < today
  }

  const isSelectedDate = (date: Date) => {
    if (!selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateSelect = (date: Date) => {
    if (!isPastDate(date)) {
      setSelectedDate(date)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2">
          Choose Date & Time
        </h3>
        <p className="text-muted-foreground">
          Select a convenient date and time for your appointment
        </p>
      </div>

      {/* Calendar */}
      <div className="bg-secondary/50 rounded-xl p-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevMonth}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h4 className="font-serif text-lg font-bold text-foreground">
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h4>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextMonth}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />
            }

            const past = isPastDate(date)
            const selected = isSelectedDate(date)

            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateSelect(date)}
                disabled={past}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                  past
                    ? 'text-muted-foreground/30 cursor-not-allowed'
                    : selected
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-primary/10 text-foreground'
                }`}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h4 className="font-serif text-lg font-bold text-card-foreground">
            Available Time Slots
          </h4>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                selectedTime === time
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80 text-foreground'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
