'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, PawPrint, X, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useUserDataStore } from '@/lib/user-data-store'
import { toast } from 'sonner'

export default function BookingsPage() {
  const { bookings, cancelBooking } = useUserDataStore()
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending')
  const pastBookings = bookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-accent/10 text-accent border-accent/20'
      case 'Pending': return 'bg-amber-500/10 text-amber-600 border-amber-500/20'
      case 'Completed': return 'bg-muted text-muted-foreground border-muted'
      case 'Cancelled': return 'bg-destructive/10 text-destructive border-destructive/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const handleCancelBooking = () => {
    if (cancellingId) {
      cancelBooking(cancellingId)
      toast.success('Booking cancelled successfully')
      setCancellingId(null)
    }
  }

  const BookingCard = ({ booking }: { booking: typeof bookings[0] }) => (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <PawPrint className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-serif text-lg font-bold text-card-foreground">
                  {booking.serviceName}
                </h3>
                <Badge variant="outline" className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PawPrint className="w-4 h-4" />
                  <span>{booking.petName}</span>
                </div>
              </div>
              {booking.addOns.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    Add-ons: {booking.addOns.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <p className="font-serif text-xl font-bold text-foreground">
              ${booking.total.toFixed(2)}
            </p>
            {(booking.status === 'Confirmed' || booking.status === 'Pending') && (
              <Button 
                variant="outline" 
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => setCancellingId(booking.id)}
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            )}
            {booking.status === 'Completed' && (
              <Link href="/dashboard/refunds">
                <Button variant="outline" size="sm">
                  Request Refund
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your appointments</p>
        </div>
        <Link href="/#booking">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Book New Appointment
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingBookings.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                <Link href="/#booking">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastBookings.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <Clock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No past appointments</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={!!cancellingId} onOpenChange={() => setCancellingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Cancel Booking?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
              You may be eligible for a refund depending on our cancellation policy.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancelBooking}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
