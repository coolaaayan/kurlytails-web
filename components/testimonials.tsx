'use client'

import { motion } from 'framer-motion'
import { Star, Quote, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { testimonials } from '@/lib/data'

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-accent text-xl text-accent mb-2">Happy Customers</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Pet Parents Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied customers!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card border-border">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-accent/30 mb-4" />
                  
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.pet}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
