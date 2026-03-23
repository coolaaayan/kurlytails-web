'use client'

import { motion } from 'framer-motion'
import { Bath, Scissors, Sparkles, Heart, CircleDot, SmilePlus, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { services } from '@/lib/data'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bath: Bath,
  scissors: Scissors,
  sparkles: Sparkles,
  heart: Heart,
  nail: CircleDot,
  tooth: SmilePlus,
}

export function Services() {
  return (
    <section id="services" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-accent text-xl text-accent mb-2">What We Offer</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Grooming Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From quick nail trims to luxurious spa days, we have the perfect service 
            for every pup and every budget.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Sparkles
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card hover:shadow-lg transition-shadow border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{service.duration}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-card-foreground">{service.name}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-foreground">
                      ${service.price}
                    </span>
                    <a href="#booking">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Book Now
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
