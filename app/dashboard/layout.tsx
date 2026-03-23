'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Dog, Home, Calendar, Gift, PawPrint, RotateCcw, Settings, LogOut, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStore } from '@/lib/auth-store'
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
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

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
            <AvatarFallback className="bg-primary text-primary-foreground font-serif">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-card-foreground truncate">{user.name}</p>
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${getTierColor(user.tier)}`} />
              <span className="text-xs text-muted-foreground">{user.tier}</span>
            </div>
          </div>
        </div>

        {/* Points Badge */}
        <div className="mb-8 p-4 bg-accent/10 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-5 h-5 text-accent fill-accent" />
            <span className="font-serif text-2xl font-bold text-foreground">{user.rewardPoints}</span>
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

        {/* Logout */}
        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
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
            <span className="text-sm font-medium text-foreground">{user.rewardPoints}</span>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
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
