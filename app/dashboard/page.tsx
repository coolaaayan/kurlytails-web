'use client'

import Link from 'next/link'
import { Calendar, Gift, PawPrint, Clock, ChevronRight, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useUser } from '@clerk/nextjs'
import { useUserDataStore } from '@/lib/user-data-store'
import { rewardTiers } from '@/lib/data'

export default function DashboardOverview() {
  const { user } = useUser()
  const { rewardPoints, tier, bookings, pets } = useUserDataStore()

  if (!user) return null

  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending')
  const currentTier = rewardTiers.find(t => rewardPoints >= t.minPoints && rewardPoints <= t.maxPoints)
  const nextTier = rewardTiers.find(t => t.minPoints > rewardPoints)
  const progressToNextTier = nextTier 
    ? ((rewardPoints - (currentTier?.minPoints || 0)) / (nextTier.minPoints - (currentTier?.minPoints || 0))) * 100
    : 100

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-accent/10 text-accent'
      case 'Pending': return 'bg-amber-500/10 text-amber-600'
      case 'Completed': return 'bg-muted text-muted-foreground'
      case 'Cancelled': return 'bg-destructive/10 text-destructive'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
          Welcome back, {user.firstName || 'there'}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your account.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Bookings</p>
                <p className="font-serif text-2xl font-bold text-card-foreground">
                  {upcomingBookings.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Gift className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reward Points</p>
                <p className="font-serif text-2xl font-bold text-card-foreground">
                  {rewardPoints}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Registered Pets</p>
                <p className="font-serif text-2xl font-bold text-card-foreground">
                  {pets.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rewards Progress */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-serif text-xl text-card-foreground">Rewards Progress</CardTitle>
          <Link href="/dashboard/rewards">
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="font-medium text-foreground">{tier}</span>
            </div>
            {nextTier && (
              <span className="text-sm text-muted-foreground">
                {nextTier.minPoints - rewardPoints} points to {nextTier.name}
              </span>
            )}
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${Math.min(100, progressToNextTier)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{currentTier?.minPoints || 0}</span>
            <span>{nextTier?.minPoints || 'Max'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Bookings */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-serif text-xl text-card-foreground">Upcoming Appointments</CardTitle>
          <Link href="/dashboard/bookings">
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No upcoming appointments</p>
              <Link href="/#booking">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Book Now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.slice(0, 3).map((booking) => (
                <div 
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <PawPrint className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{booking.serviceName}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.date} at {booking.time} - {booking.petName}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Pets */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-serif text-xl text-card-foreground">My Pets</CardTitle>
          <Link href="/dashboard/pets">
            <Button variant="ghost" size="sm" className="gap-1">
              Manage <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {pets.length === 0 ? (
            <div className="text-center py-8">
              <PawPrint className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No pets added yet</p>
              <Link href="/dashboard/pets">
                <Button variant="outline">Add Your First Pet</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {pets.map((pet) => (
                <div 
                  key={pet.id}
                  className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <PawPrint className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{pet.name}</p>
                    <p className="text-sm text-muted-foreground">{pet.breed}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
