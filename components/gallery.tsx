'use client'

import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { galleryImages } from '@/lib/data'

export function Gallery() {
  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-accent text-xl text-accent mb-2">Our Work</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Pup Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See the beautiful transformations we create every day!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group cursor-pointer ${
                index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`${
                index === 0 || index === 5 ? 'aspect-square' : 'aspect-square'
              } rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-primary/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{image.label}</p>
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {image.category}
                    </span>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-primary-foreground font-medium">{image.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
