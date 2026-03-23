'use client'

import { useState } from 'react'
import { PawPrint, Plus, Edit2, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useUserDataStore, Pet } from '@/lib/user-data-store'
import { dogSizes, dogAges } from '@/lib/data'
import { toast } from 'sonner'

export default function PetsPage() {
  const { pets, addPet, updatePet, removePet } = useUserDataStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPet, setEditingPet] = useState<Pet | null>(null)
  const [deletingPet, setDeletingPet] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    size: '',
    age: '',
    notes: '',
  })

  const resetForm = () => {
    setFormData({ name: '', breed: '', size: '', age: '', notes: '' })
    setEditingPet(null)
  }

  const handleOpenModal = (pet?: Pet) => {
    if (pet) {
      setEditingPet(pet)
      setFormData({
        name: pet.name,
        breed: pet.breed,
        size: pet.size,
        age: pet.age,
        notes: pet.notes || '',
      })
    } else {
      resetForm()
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.breed || !formData.size || !formData.age) {
      toast.error('Please fill in all required fields')
      return
    }

    if (editingPet) {
      updatePet(editingPet.id, formData)
      toast.success('Pet updated successfully')
    } else {
      addPet(formData)
      toast.success('Pet added successfully')
    }
    
    handleCloseModal()
  }

  const handleDelete = () => {
    if (deletingPet) {
      removePet(deletingPet)
      toast.success('Pet removed successfully')
      setDeletingPet(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">My Pets</h1>
          <p className="text-muted-foreground">Manage your furry family members</p>
        </div>
        <Button 
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Pet
        </Button>
      </div>

      {pets.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-16 text-center">
            <PawPrint className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-card-foreground mb-2">
              No pets yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Add your first pet to make booking appointments easier
            </p>
            <Button 
              onClick={() => handleOpenModal()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Pet
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <Card key={pet.id} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <PawPrint className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleOpenModal(pet)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeletingPet(pet.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <h3 className="font-serif text-xl font-bold text-card-foreground mb-1">
                  {pet.name}
                </h3>
                <p className="text-muted-foreground mb-4">{pet.breed}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size</span>
                    <span className="text-foreground">{pet.size.split(' ')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age</span>
                    <span className="text-foreground">{pet.age.split(' ')[0]}</span>
                  </div>
                </div>
                
                {pet.notes && (
                  <p className="mt-4 text-sm text-muted-foreground border-t border-border pt-4">
                    {pet.notes}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Pet Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-card-foreground">
              {editingPet ? 'Edit Pet' : 'Add New Pet'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pet-name">Name *</Label>
              <Input
                id="pet-name"
                placeholder="Pet's name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pet-breed">Breed *</Label>
              <Input
                id="pet-breed"
                placeholder="e.g., Golden Retriever"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pet-size">Size *</Label>
              <Select
                value={formData.size}
                onValueChange={(value) => setFormData({ ...formData, size: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {dogSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pet-age">Age *</Label>
              <Select
                value={formData.age}
                onValueChange={(value) => setFormData({ ...formData, age: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  {dogAges.map((age) => (
                    <SelectItem key={age} value={age}>
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pet-notes">Notes (optional)</Label>
              <Textarea
                id="pet-notes"
                placeholder="Any allergies, behavioral notes, etc."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {editingPet ? 'Save Changes' : 'Add Pet'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingPet} onOpenChange={() => setDeletingPet(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Pet?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this pet? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
