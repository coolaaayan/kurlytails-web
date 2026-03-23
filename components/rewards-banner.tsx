'use client'

import { motion } from 'framer-motion'
import { Gift, Star, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function RewardsBanner() {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Crown className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Join KurlyTails Rewards
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Earn points with every visit and unlock exclusive perks! Start as a Puppy Pal, 
            level up to Gold Paw, and reach Platinum Tail status for maximum savings.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-primary-foreground">1 Point</p>
              <p className="text-primary-foreground/80 text-sm">per $1 spent</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-primary-foreground">50 Points</p>
              <p className="text-primary-foreground/80 text-sm">signup bonus</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-primary-foreground">Up to 15%</p>
              <p className="text-primary-foreground/80 text-sm">off all services</p>
            </div>
          </div>
          
          <a href="#booking">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Start Earning Today
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
