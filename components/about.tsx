'use client'

import { motion } from 'framer-motion'
import { Users, Award, Heart, Clock } from 'lucide-react'

const teamStats = [
  { icon: Users, value: '12', label: 'Expert Groomers' },
  { icon: Award, value: '50+', label: 'Awards Won' },
  { icon: Heart, value: '15K+', label: 'Happy Customers' },
  { icon: Clock, value: '8', label: 'Years Serving' },
]

export function About() {
  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Team Photo</p>
                </div>
              </div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-6 shadow-lg border border-border">
              <p className="font-accent text-lg text-accent">Since 2017</p>
              <p className="font-serif text-2xl font-bold text-card-foreground">Trusted by Pet Parents</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-accent text-xl text-accent mb-2">Our Story</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Passion for Pups, Excellence in Care
            </h2>
            <p className="text-muted-foreground mb-6">
              KurlyTails was founded with a simple mission: to provide the highest quality 
              grooming services in a stress-free environment. Our team of certified groomers 
              treats every dog like family, ensuring they leave looking and feeling their best.
            </p>
            <p className="text-muted-foreground mb-8">
              We use only premium, pet-safe products and stay up-to-date with the latest 
              grooming techniques. Whether your pup needs a quick trim or a full spa day, 
              we&apos;re here to make them shine.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {teamStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <p className="font-serif text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
