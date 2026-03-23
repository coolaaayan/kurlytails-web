'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Dog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuthStore } from '@/lib/auth-store'
import { AuthModal } from '@/components/auth-modal'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { isAuthenticated, user } = useAuthStore()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Dog className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-bold text-foreground">KurlyTails</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="ghost" className="text-sm">
                  Hi, {user?.name.split(' ')[0]}
                </Button>
              </Link>
            ) : (
              <Button 
                variant="ghost" 
                className="text-sm"
                onClick={() => setShowAuthModal(true)}
              >
                Sign In
              </Button>
            )}
            <a href="#booking">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Book Appointment
              </Button>
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <hr className="border-border" />
                {isAuthenticated ? (
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      My Account
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false)
                      setShowAuthModal(true)
                    }}
                  >
                    Sign In
                  </Button>
                )}
                <a href="#booking" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Book Appointment
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </>
  )
}
