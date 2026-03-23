'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Dog, LayoutDashboard, Calendar, Users, Shield, Wrench, 
  RotateCcw, DollarSign, Settings, CalendarClock, LogOut, Menu, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useEmployeeStore } from '@/lib/employee-store'
import { Toaster } from '@/components/ui/sonner'

const navItems = [
  { href: '/employee', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { href: '/employee/appointments', label: 'Appointments', icon: Calendar, badge: null },
  { href: '/employee/employees', label: 'Employees', icon: Users, badge: null },
  { href: '/employee/roles', label: 'Roles & Permissions', icon: Shield, badge: null },
  { href: '/employee/services', label: 'Services', icon: Wrench, badge: null },
  { href: '/employee/refunds', label: 'Refunds', icon: RotateCcw, badge: 'refunds' },
  { href: '/employee/revenue', label: 'Revenue', icon: DollarSign, badge: null },
  { href: '/employee/settings', label: 'Settings', icon: Settings, badge: null },
  { href: '/employee/schedule', label: 'My Schedule', icon: CalendarClock, badge: null },
]

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { currentEmployee, logout, refundRequests } = useEmployeeStore()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const pendingRefunds = refundRequests.filter(r => r.status === 'Pending').length

  useEffect(() => {
    if (!currentEmployee) {
      router.push('/employee/login')
    }
  }, [currentEmployee, router])

  if (!currentEmployee) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/employee/login')
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? '' : 'p-6'}`}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center">
          <Dog className="w-6 h-6 text-sidebar-primary-foreground" />
        </div>
        <div>
          <span className="font-serif text-xl font-bold text-sidebar-foreground">KurlyTails</span>
          <p className="text-xs text-sidebar-foreground/60">Employee Portal</p>
        </div>
      </Link>

      {/* User Info */}
      <div className="flex items-center gap-3 mb-8 p-3 bg-sidebar-accent rounded-xl">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground font-serif text-sm">
            {currentEmployee.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sidebar-foreground text-sm truncate">{currentEmployee.name}</p>
          <p className="text-xs text-sidebar-foreground/60 capitalize">{currentEmployee.role.replace('-', ' ')}</p>
        </div>
        <span className={`w-2 h-2 rounded-full ${currentEmployee.status === 'online' ? 'bg-green-500' : 'bg-muted-foreground'}`} />
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            onClick={() => mobile && setIsMobileOpen(false)}
          >
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.badge === 'refunds' && pendingRefunds > 0 && (
                <Badge className="ml-auto bg-destructive text-destructive-foreground text-xs">
                  {pendingRefunds}
                </Badge>
              )}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <Button
        variant="ghost"
        className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent mt-auto"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border hidden lg:block">
        <Sidebar />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar border-b border-sidebar-border px-4 flex items-center justify-between z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center">
            <Dog className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <span className="font-serif text-lg font-bold text-sidebar-foreground">KurlyTails</span>
        </Link>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-sidebar border-sidebar-border p-6">
            <Sidebar mobile />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
      
      <Toaster />
    </div>
  )
}
