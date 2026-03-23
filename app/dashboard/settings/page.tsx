'use client'

import { useState } from 'react'
import { User, Bell, Lock, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/lib/auth-store'
import { toast } from 'sonner'

export default function SettingsPage() {
  const { user, updateProfile } = useAuthStore()
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })
  
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    promotions: true,
    reminders: true,
  })
  
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const handleSaveProfile = () => {
    updateProfile(profileData)
    toast.success('Profile updated successfully')
  }

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved')
  }

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error('Please fill in all password fields')
      return
    }
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match')
      return
    }
    if (passwords.new.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    toast.success('Password changed successfully')
    setPasswords({ current: '', new: '', confirm: '' })
  }

  if (!user) return null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <CardTitle className="font-serif text-xl text-card-foreground">Profile</CardTitle>
          </div>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            />
          </div>
          <Button 
            onClick={handleSaveProfile}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <CardTitle className="font-serif text-xl text-card-foreground">Notifications</CardTitle>
          </div>
          <CardDescription>Manage how we contact you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive booking confirmations and updates via email</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">Get text message reminders for appointments</p>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Promotional Emails</p>
              <p className="text-sm text-muted-foreground">Receive special offers and discounts</p>
            </div>
            <Switch
              checked={notifications.promotions}
              onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Appointment Reminders</p>
              <p className="text-sm text-muted-foreground">Get reminded 24 hours before your appointment</p>
            </div>
            <Switch
              checked={notifications.reminders}
              onCheckedChange={(checked) => setNotifications({ ...notifications, reminders: checked })}
            />
          </div>
          
          <Button 
            onClick={handleSaveNotifications}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            <CardTitle className="font-serif text-xl text-card-foreground">Password</CardTitle>
          </div>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              />
            </div>
          </div>
          <Button 
            onClick={handleChangePassword}
            variant="outline"
          >
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
