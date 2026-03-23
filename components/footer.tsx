'use client'

import Link from 'next/link'
import { Dog, Facebook, Instagram, Twitter } from 'lucide-react'

const serviceLinks = [
  { href: '#services', label: 'Bath & Brush' },
  { href: '#services', label: 'Full Groom' },
  { href: '#services', label: 'Spa Day' },
  { href: '#services', label: 'Puppy Package' },
  { href: '#services', label: 'Nail Trim' },
]

const quickLinks = [
  { href: '#booking', label: 'Book Appointment' },
  { href: '#about', label: 'About Us' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

const helpLinks = [
  { href: '#', label: 'FAQ' },
  { href: '#', label: 'Cancellation Policy' },
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Dog className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-bold">KurlyTails</span>
            </div>
            <p className="text-background/70 mb-6 max-w-sm">
              Premium dog grooming services with love. Where every pup gets the royal treatment.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Help</h3>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/50 text-sm">
          <p>&copy; {new Date().getFullYear()} KurlyTails. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
