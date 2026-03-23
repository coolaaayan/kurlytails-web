'use client'

import { Bath, Scissors, Sparkles, Heart, CircleDot, SmilePlus, Check } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useBookingStore } from '@/lib/booking-store'
import { services, addOns } from '@/lib/data'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bath: Bath,
  scissors: Scissors,
  sparkles: Sparkles,
  heart: Heart,
  nail: CircleDot,
  tooth: SmilePlus,
}

export function BookingStep1() {
  const { selectedService, setSelectedService, selectedAddOns, toggleAddOn } = useBookingStore()

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2">
          Select a Service
        </h3>
        <p className="text-muted-foreground">
          Choose the perfect grooming package for your pup
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Sparkles
          const isSelected = selectedService === service.id

          return (
            <Card
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`p-4 cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-card-foreground">{service.name}</h4>
                    <span className="font-serif font-bold text-foreground">${service.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{service.duration}</p>
                  <ul className="space-y-1">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="w-3 h-3 text-accent" />
                        {feature}
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-xs text-muted-foreground">
                        +{service.features.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Add-ons */}
      <div>
        <h4 className="font-serif text-lg font-bold text-card-foreground mb-4">
          Optional Add-ons
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {addOns.map((addon) => (
            <div
              key={addon.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                selectedAddOns.includes(addon.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => toggleAddOn(addon.id)}
            >
              <Checkbox
                id={addon.id}
                checked={selectedAddOns.includes(addon.id)}
                onCheckedChange={() => toggleAddOn(addon.id)}
              />
              <Label
                htmlFor={addon.id}
                className="flex-1 flex items-center justify-between cursor-pointer"
              >
                <span className="text-card-foreground">{addon.name}</span>
                <span className="text-sm font-medium text-muted-foreground">+${addon.price}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
