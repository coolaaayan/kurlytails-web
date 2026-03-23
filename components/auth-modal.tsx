'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthStore } from '@/lib/auth-store'
import { toast } from 'sonner'
import { Dog, Gift } from 'lucide-react'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')
  
  const { login, register } = useAuthStore()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(loginEmail, loginPassword)) {
      toast.success('Welcome back!')
      onOpenChange(false)
      setLoginEmail('')
      setLoginPassword('')
    } else {
      toast.error('Invalid credentials')
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerPassword !== registerConfirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (register(registerName, registerEmail, registerPassword)) {
      toast.success('Welcome to KurlyTails! You earned 50 bonus points!')
      onOpenChange(false)
      setRegisterName('')
      setRegisterEmail('')
      setRegisterPassword('')
      setRegisterConfirmPassword('')
    } else {
      toast.error('Registration failed')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card">
        <DialogHeader>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Dog className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <DialogTitle className="text-center font-serif text-2xl text-card-foreground">
            Welcome to KurlyTails
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign In
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 text-accent text-sm mb-4">
                <Gift className="w-5 h-5" />
                <span>Get 50 bonus points when you sign up!</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Your name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm">Confirm Password</Label>
                <Input
                  id="register-confirm"
                  type="password"
                  placeholder="Confirm your password"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
