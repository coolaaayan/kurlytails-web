'use client'

import Link from 'next/link'
import { Dog, Home, Calendar, Gift, PawPrint, RotateCcw, Settings, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserButton, useUser, SignIn } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/bookings', label: 'My Bookings', icon: Calendar },
  { href: '/dashboard/rewards', label: 'Rewards', icon: Gift },
  { href: '/dashboard/pets', label: 'My Pets', icon: PawPrint },
  { href: '/dashboard/refunds', label: 'Refund Requests', icon: RotateCcw },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoaded, isSignedIn } = useUser()

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20" />
          <div className="h-4 w-32 bg-muted rounded" />
        </div>
      </div>
    )
  }

  // Redirect to sign in if not authenticated
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <SignIn routing="hash" />
      </div>
    )
  }

  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user?.firstName?.[0] || 'U'

  // Mock reward data - in production this would come from your database
  const rewardPoints = 450
  const tier = 'Gold Paw'

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Gold Paw': return 'bg-amber-500'
      case 'Platinum Tail': return 'bg-slate-400'
      default: return 'bg-primary'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6 hidden lg:block">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Dog className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-bold text-card-foreground">KurlyTails</span>
        </Link>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-8 p-3 bg-secondary/50 rounded-xl">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
            <AvatarFallback className="bg-primary text-primary-foreground font-serif">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-card-foreground truncate">{user?.fullName || user?.firstName}</p>
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${getTierColor(tier)}`} />
              <span className="text-xs text-muted-foreground">{tier}</span>
            </div>
          </div>
        </div>

        {/* Points Badge */}
        <div className="mb-8 p-4 bg-accent/10 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-5 h-5 text-accent fill-accent" />
            <span className="font-serif text-2xl font-bold text-foreground">{rewardPoints}</span>
          </div>
          <p className="text-sm text-muted-foreground">Reward Points</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* User Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
            <UserButton afterSignOutUrl="/" />
            <span className="text-sm text-muted-foreground">Manage Account</span>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border px-4 flex items-center justify-between z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Dog className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-lg font-bold text-card-foreground">KurlyTails</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-full">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm font-medium text-foreground">{rewardPoints}</span>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex items-center justify-around z-50">
        {navItems.slice(0, 5).map((item) => (
          <Link key={item.href} href={item.href}>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <item.icon className="w-5 h-5" />
              <span className="sr-only">{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0 min-h-screen">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
      
      <Toaster />
    </div>
  )
}
