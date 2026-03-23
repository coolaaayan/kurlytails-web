'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { businessHours } from '@/lib/data'

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-accent text-xl text-accent mb-2">Get In Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Visit Us Today
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We&apos;d love to meet you and your furry friend!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-1">Address</h3>
                <p className="text-muted-foreground">123 Pawsome Street</p>
                <p className="text-muted-foreground">San Francisco, CA 94102</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-1">Phone</h3>
                <p className="text-muted-foreground">(555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-1">Email</h3>
                <p className="text-muted-foreground">hello@kurlytails.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">Hours</h3>
                <div className="space-y-1">
                  {businessHours.map((day) => (
                    <div key={day.day} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{day.day}</span>
                      <span className="text-foreground">{day.open} - {day.close}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Google Maps Embed</p>
                  <p className="text-sm text-muted-foreground/70">123 Pawsome Street, SF</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
