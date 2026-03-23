'use client'

import { motion } from 'framer-motion'
import { Star, Award, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  { icon: Calendar, value: '15,000+', label: 'Pups Groomed' },
  { icon: Star, value: '4.9', label: 'Star Rating' },
  { icon: Award, value: '8+', label: 'Years Experience' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen pt-16 overflow-hidden">
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <span className="font-medium">New customer? Use code </span>
        <span className="font-bold font-mono">KURLY10</span>
        <span className="font-medium"> for 10% off your first visit!</span>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <p className="font-accent text-2xl text-accent mb-4">Welcome to</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
              Where Every Pup Gets the{' '}
              <span className="text-primary">Royal Treatment</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Professional dog grooming services with love. From bath & brush to full spa days, 
              we pamper your furry family members like royalty.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a href="#booking">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6">
                  Book Now
                </Button>
              </a>
              <a href="#services">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  View Services
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <p className="font-serif text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary to-muted overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.5 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm15 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-4.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm9 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM12 21c-2.5 0-4.5-2-4.5-4.5 0-1.5.7-2.8 1.8-3.7.5-.4 1.2-.3 1.5.2.3.5.2 1.2-.3 1.5-.6.5-1 1.2-1 2 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5c0-.8-.4-1.5-1-2-.5-.4-.6-1-.3-1.5.3-.5 1-.6 1.5-.2 1.1.9 1.8 2.2 1.8 3.7 0 2.5-2 4.5-4.5 4.5Z"/>
                    </svg>
                  </div>
                  <p className="text-muted-foreground">Happy Dog Photo</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
