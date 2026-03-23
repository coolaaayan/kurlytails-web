'use client'

import { User, Dog } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useBookingStore } from '@/lib/booking-store'
import { dogSizes, dogAges } from '@/lib/data'

export function BookingStep3() {
  const {
    ownerName, ownerEmail, ownerPhone,
    petName, petBreed, petSize, petAge, notes,
    setOwnerDetails, setPetDetails
  } = useBookingStore()

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2">
          Pet & Owner Details
        </h3>
        <p className="text-muted-foreground">
          Tell us about yourself and your furry friend
        </p>
      </div>

      {/* Owner Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-primary" />
          <h4 className="font-serif text-lg font-bold text-card-foreground">
            Your Information
          </h4>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ownerName">Full Name *</Label>
            <Input
              id="ownerName"
              placeholder="Your full name"
              value={ownerName}
              onChange={(e) => setOwnerDetails({ ownerName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ownerEmail">Email *</Label>
            <Input
              id="ownerEmail"
              type="email"
              placeholder="you@example.com"
              value={ownerEmail}
              onChange={(e) => setOwnerDetails({ ownerEmail: e.target.value })}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ownerPhone">Phone Number *</Label>
          <Input
            id="ownerPhone"
            type="tel"
            placeholder="(555) 123-4567"
            value={ownerPhone}
            onChange={(e) => setOwnerDetails({ ownerPhone: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Pet Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Dog className="w-5 h-5 text-primary" />
          <h4 className="font-serif text-lg font-bold text-card-foreground">
            Pet Information
          </h4>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="petName">Pet Name *</Label>
            <Input
              id="petName"
              placeholder="Your pet's name"
              value={petName}
              onChange={(e) => setPetDetails({ petName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="petBreed">Breed *</Label>
            <Input
              id="petBreed"
              placeholder="e.g., Golden Retriever"
              value={petBreed}
              onChange={(e) => setPetDetails({ petBreed: e.target.value })}
              required
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="petSize">Size *</Label>
            <Select
              value={petSize}
              onValueChange={(value) => setPetDetails({ petSize: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {dogSizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="petAge">Age *</Label>
            <Select
              value={petAge}
              onValueChange={(value) => setPetDetails({ petAge: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent>
                {dogAges.map((age) => (
                  <SelectItem key={age} value={age}>
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Special Notes (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Any allergies, behavioral notes, or special requests..."
            value={notes}
            onChange={(e) => setPetDetails({ notes: e.target.value })}
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
