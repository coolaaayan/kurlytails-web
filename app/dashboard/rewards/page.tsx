'use client'

import { Star, Gift, Crown, Check, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useUserDataStore } from '@/lib/user-data-store'
import { rewardTiers } from '@/lib/data'
import { toast } from 'sonner'

const redemptionOptions = [
  { points: 100, value: '$5 off', description: 'Any service' },
  { points: 200, value: '$12 off', description: 'Any service' },
  { points: 500, value: 'Free Nail Trim', description: 'Worth $20' },
  { points: 750, value: 'Free Teeth Brushing', description: 'Worth $15' },
  { points: 1000, value: 'Free Bath & Brush', description: 'Worth $45' },
]

export default function RewardsPage() {
  const { rewardPoints, tier, pointsHistory, redeemPoints } = useUserDataStore()

  const currentTier = rewardTiers.find(t => rewardPoints >= t.minPoints && rewardPoints <= t.maxPoints)
  const nextTier = rewardTiers.find(t => t.minPoints > rewardPoints)
  const progressToNextTier = nextTier 
    ? ((rewardPoints - (currentTier?.minPoints || 0)) / (nextTier.minPoints - (currentTier?.minPoints || 0))) * 100
    : 100

  const getTierIcon = (tierName: string) => {
    switch (tierName) {
      case 'Gold Paw': return <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
      case 'Platinum Tail': return <Crown className="w-5 h-5 text-slate-400" />
      default: return <Gift className="w-5 h-5 text-primary" />
    }
  }

  const getTierColor = (tierName: string) => {
    switch (tierName) {
      case 'Gold Paw': return 'border-amber-500 bg-amber-500/10'
      case 'Platinum Tail': return 'border-slate-400 bg-slate-400/10'
      default: return 'border-primary bg-primary/10'
    }
  }

  const handleRedeem = (option: typeof redemptionOptions[0]) => {
    if (rewardPoints >= option.points) {
      redeemPoints(option.points, `Redeemed for ${option.value}`)
      toast.success(`Successfully redeemed ${option.points} points for ${option.value}!`)
    } else {
      toast.error(`Not enough points. You need ${option.points - rewardPoints} more points.`)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Rewards</h1>
        <p className="text-muted-foreground">Earn points and unlock exclusive perks</p>
      </div>

      {/* Points Balance */}
      <Card className="bg-primary text-primary-foreground border-0">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-primary-foreground/80 mb-2">Your Points Balance</p>
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 fill-current" />
                <span className="font-serif text-5xl font-bold">{rewardPoints}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-2">
                {getTierIcon(tier)}
                <span className="font-serif text-xl font-bold">{tier}</span>
              </div>
              {nextTier && (
                <p className="text-primary-foreground/80 text-sm">
                  {nextTier.minPoints - rewardPoints} points to {nextTier.name}
                </p>
              )}
            </div>
          </div>
          
          {nextTier && (
            <div className="mt-6">
              <div className="h-3 bg-primary-foreground/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-foreground rounded-full transition-all"
                  style={{ width: `${Math.min(100, progressToNextTier)}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-primary-foreground/80">
                <span>{currentTier?.minPoints || 0}</span>
                <span>{nextTier.minPoints}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tier Benefits */}
      <div>
        <h2 className="font-serif text-xl font-bold text-foreground mb-4">Membership Tiers</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {rewardTiers.map((t) => {
            const isCurrentTier = t.name === tier
            return (
              <Card 
                key={t.name} 
                className={`border-2 ${isCurrentTier ? getTierColor(t.name) : 'border-border bg-card'}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTierIcon(t.name)}
                      <CardTitle className="font-serif text-lg text-card-foreground">
                        {t.name}
                      </CardTitle>
                    </div>
                    {isCurrentTier && (
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t.minPoints}+ points
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {t.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Redemption Options */}
      <div>
        <h2 className="font-serif text-xl font-bold text-foreground mb-4">Redeem Points</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {redemptionOptions.map((option) => {
            const canRedeem = rewardPoints >= option.points
            return (
              <Card key={option.points} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-accent" />
                      <span className="font-bold text-foreground">{option.points}</span>
                    </div>
                    <span className="font-serif text-lg font-bold text-card-foreground">
                      {option.value}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                  <Button 
                    className={`w-full ${canRedeem ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}`}
                    variant={canRedeem ? 'default' : 'outline'}
                    disabled={!canRedeem}
                    onClick={() => handleRedeem(option)}
                  >
                    {canRedeem ? 'Redeem Now' : `Need ${option.points - rewardPoints} more`}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Points History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-serif text-xl text-card-foreground">Points History</CardTitle>
        </CardHeader>
        <CardContent>
          {pointsHistory.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No points history yet</p>
          ) : (
            <div className="space-y-4">
              {pointsHistory.map((entry, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    {entry.points > 0 ? (
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-accent" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <TrendingDown className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-foreground">{entry.description}</p>
                      <p className="text-sm text-muted-foreground">{entry.date}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${entry.points > 0 ? 'text-accent' : 'text-muted-foreground'}`}>
                    {entry.points > 0 ? '+' : ''}{entry.points}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
