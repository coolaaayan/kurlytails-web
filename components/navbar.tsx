'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Dog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'

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
  const { isSignedIn, user } = useUser()

  return (
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
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-sm">
                  Hi, {user?.firstName || 'there'}
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="outline" className="text-sm">
                  Register
                </Button>
              </SignUpButton>
            </div>
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
              {isSignedIn ? (
                <div className="flex flex-col gap-4">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      My Account
                    </Button>
                  </Link>
                  <div className="flex justify-center">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button variant="secondary" className="w-full">
                      Register
                    </Button>
                  </SignUpButton>
                </div>
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
  )
}
