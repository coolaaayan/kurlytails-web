'use client'

import { motion } from 'framer-motion'
import { CalendarCheck, MapPin, Sparkles, PartyPopper } from 'lucide-react'

const steps = [
  {
    icon: CalendarCheck,
    title: 'Book Online',
    description: 'Choose your service, pick a date and time that works for you.',
  },
  {
    icon: MapPin,
    title: 'Drop Off',
    description: 'Bring your pup to our cozy salon. We handle the rest!',
  },
  {
    icon: Sparkles,
    title: 'Pamper Time',
    description: 'Your furry friend enjoys a spa-like grooming experience.',
  },
  {
    icon: PartyPopper,
    title: 'Pick Up',
    description: 'Collect your fresh, fluffy, and fabulous pup!',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-accent text-xl text-accent mb-2">Simple Process</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting your pup pampered is as easy as 1-2-3-4!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              
              {/* Step number */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
