export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

// Grooming services as Stripe products
export const PRODUCTS: Product[] = [
  {
    id: 'bath-brush',
    name: 'Bath & Brush',
    description: 'A refreshing bath with premium shampoo and thorough brushing',
    priceInCents: 4500, // $45.00
  },
  {
    id: 'full-groom',
    name: 'Full Groom',
    description: 'Complete grooming package for a fresh new look',
    priceInCents: 7500, // $75.00
  },
  {
    id: 'spa-day',
    name: 'Spa Day',
    description: 'Ultimate pampering experience for your furry friend',
    priceInCents: 9500, // $95.00
  },
  {
    id: 'puppy-package',
    name: 'Puppy Package',
    description: 'Gentle introduction to grooming for puppies under 6 months',
    priceInCents: 5500, // $55.00
  },
  {
    id: 'nail-trim',
    name: 'Nail Trim',
    description: 'Quick and safe nail trimming service',
    priceInCents: 2000, // $20.00
  },
  {
    id: 'teeth-brushing',
    name: 'Teeth Brushing',
    description: 'Keep those pearly whites clean and healthy',
    priceInCents: 1500, // $15.00
  },
]

// Add-ons as products
export const ADD_ON_PRODUCTS: Product[] = [
  { id: 'flea-treatment', name: 'Flea Treatment', description: 'Flea treatment add-on', priceInCents: 1500 },
  { id: 'de-shedding', name: 'De-shedding Treatment', description: 'De-shedding treatment add-on', priceInCents: 2500 },
  { id: 'teeth-cleaning', name: 'Teeth Cleaning', description: 'Teeth cleaning add-on', priceInCents: 1500 },
  { id: 'nail-polish', name: 'Nail Polish', description: 'Nail polish add-on', priceInCents: 1000 },
  { id: 'aromatherapy', name: 'Aromatherapy', description: 'Aromatherapy add-on', priceInCents: 1200 },
  { id: 'paw-balm', name: 'Paw Balm Treatment', description: 'Paw balm treatment add-on', priceInCents: 800 },
]

export function getProductById(id: string): Product | undefined {
  return [...PRODUCTS, ...ADD_ON_PRODUCTS].find(p => p.id === id)
}
