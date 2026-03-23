'use client'

import { useState } from 'react'
import { RotateCcw, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useUserDataStore } from '@/lib/user-data-store'
import { toast } from 'sonner'

const refundReasons = [
  'Service not as expected',
  'Pet was uncomfortable',
  'Scheduling issue',
  'Quality concerns',
  'Other',
]

export default function RefundsPage() {
  const { bookings, refundRequests, requestRefund } = useUserDataStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState('')
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')

  const completedBookings = bookings.filter(
    b => b.status === 'Completed' && !refundRequests.find(r => r.bookingId === b.id)
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />
      case 'Approved': return <CheckCircle className="w-4 h-4" />
      case 'Partial': return <AlertCircle className="w-4 h-4" />
      case 'Denied': return <XCircle className="w-4 h-4" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-500/10 text-amber-600 border-amber-500/20'
      case 'Approved': return 'bg-accent/10 text-accent border-accent/20'
      case 'Partial': return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'Denied': return 'bg-destructive/10 text-destructive border-destructive/20'
      default: return ''
    }
  }

  const handleSubmit = () => {
    if (!selectedBookingId || !reason) {
      toast.error('Please fill in all required fields')
      return
    }

    const booking = bookings.find(b => b.id === selectedBookingId)
    if (booking) {
      requestRefund(selectedBookingId, `${reason}: ${details}`, booking.total)
      toast.success('Refund request submitted successfully')
      setIsModalOpen(false)
      setSelectedBookingId('')
      setReason('')
      setDetails('')
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Refund Requests</h1>
          <p className="text-muted-foreground">Request and track refunds for completed services</p>
        </div>
        {completedBookings.length > 0 && (
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            New Request
          </Button>
        )}
      </div>

      {/* Pending Refunds */}
      {refundRequests.length > 0 && (
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">Your Requests</h2>
          <div className="space-y-4">
            {refundRequests.map((request) => {
              const booking = bookings.find(b => b.id === request.bookingId)
              return (
                <Card key={request.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <RotateCcw className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-card-foreground">
                              {booking?.serviceName || 'Service'}
                            </h3>
                            <Badge variant="outline" className={getStatusColor(request.status)}>
                              {getStatusIcon(request.status)}
                              <span className="ml-1">{request.status}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Requested on {request.createdAt}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Reason: {request.reason}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-serif text-xl font-bold text-foreground">
                          ${request.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">Requested amount</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Eligible Bookings */}
      {completedBookings.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-card-foreground">
              Eligible for Refund
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-foreground">{booking.serviceName}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.date} - {booking.petName}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-foreground">${booking.total.toFixed(2)}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedBookingId(booking.id)
                        setIsModalOpen(true)
                      }}
                    >
                      Request Refund
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {refundRequests.length === 0 && completedBookings.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="py-16 text-center">
            <RotateCcw className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-card-foreground mb-2">
              No refund requests
            </h3>
            <p className="text-muted-foreground">
              You don&apos;t have any completed bookings eligible for refund
            </p>
          </CardContent>
        </Card>
      )}

      {/* Request Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-card-foreground">
              Request Refund
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {!selectedBookingId && (
              <div className="space-y-2">
                <Label>Select Booking *</Label>
                <Select
                  value={selectedBookingId}
                  onValueChange={setSelectedBookingId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a booking" />
                  </SelectTrigger>
                  <SelectContent>
                    {completedBookings.map((booking) => (
                      <SelectItem key={booking.id} value={booking.id}>
                        {booking.serviceName} - {booking.date} (${booking.total})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label>Reason *</Label>
              <Select
                value={reason}
                onValueChange={setReason}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  {refundReasons.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Additional Details</Label>
              <Textarea
                placeholder="Please provide more details about your refund request..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
