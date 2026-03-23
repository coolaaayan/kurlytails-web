'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Dog, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useEmployeeStore } from '@/lib/employee-store'
import { toast } from 'sonner'

export default function EmployeeLoginPage() {
  const router = useRouter()
  const { login } = useEmployeeStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(email, password)) {
      toast.success('Welcome back!')
      router.push('/employee')
    } else {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to website
        </Link>
        
        <Card className="bg-card border-sidebar-border">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Dog className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="font-serif text-2xl text-card-foreground">Employee Portal</CardTitle>
            <CardDescription>Sign in to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@kurlytails.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Demo credentials:</p>
              <p className="text-xs text-muted-foreground font-mono">alex@kurlytails.com (Owner)</p>
              <p className="text-xs text-muted-foreground font-mono">sarah@kurlytails.com (Admin)</p>
              <p className="text-xs text-muted-foreground font-mono">mike@kurlytails.com (Groomer)</p>
              <p className="text-xs text-muted-foreground mt-1">Password: any value</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
