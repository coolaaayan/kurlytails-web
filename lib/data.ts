// Services data
export const services = [
  {
    id: 'bath-brush',
    name: 'Bath & Brush',
    price: 45,
    description: 'A refreshing bath with premium shampoo and thorough brushing',
    features: ['Premium shampoo', 'Deep brushing', 'Ear cleaning', 'Blow dry'],
    duration: '45 min',
    icon: 'bath',
  },
  {
    id: 'full-groom',
    name: 'Full Groom',
    price: 75,
    description: 'Complete grooming package for a fresh new look',
    features: ['Bath & brush', 'Haircut & styling', 'Nail trim', 'Ear cleaning', 'Teeth brushing'],
    duration: '90 min',
    icon: 'scissors',
  },
  {
    id: 'spa-day',
    name: 'Spa Day',
    price: 95,
    description: 'Ultimate pampering experience for your furry friend',
    features: ['Full groom', 'Aromatherapy bath', 'Paw massage', 'Face mask', 'Bandana'],
    duration: '2 hrs',
    icon: 'sparkles',
  },
  {
    id: 'puppy-package',
    name: 'Puppy Package',
    price: 55,
    description: 'Gentle introduction to grooming for puppies under 6 months',
    features: ['Gentle bath', 'Light trim', 'Nail clip', 'Socialization treats'],
    duration: '60 min',
    icon: 'heart',
  },
  {
    id: 'nail-trim',
    name: 'Nail Trim',
    price: 20,
    description: 'Quick and safe nail trimming service',
    features: ['Nail clipping', 'Filing', 'Paw check'],
    duration: '15 min',
    icon: 'nail',
  },
  {
    id: 'teeth-brushing',
    name: 'Teeth Brushing',
    price: 15,
    description: 'Keep those pearly whites clean and healthy',
    features: ['Teeth brushing', 'Breath freshener', 'Dental check'],
    duration: '10 min',
    icon: 'tooth',
  },
]

export const addOns = [
  { id: 'flea-treatment', name: 'Flea Treatment', price: 15 },
  { id: 'de-shedding', name: 'De-shedding Treatment', price: 25 },
  { id: 'teeth-cleaning', name: 'Teeth Cleaning', price: 15 },
  { id: 'nail-polish', name: 'Nail Polish', price: 10 },
  { id: 'aromatherapy', name: 'Aromatherapy', price: 12 },
  { id: 'paw-balm', name: 'Paw Balm Treatment', price: 8 },
]

export const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
]

export const dogSizes = ['Small (under 20 lbs)', 'Medium (20-50 lbs)', 'Large (50-80 lbs)', 'Extra Large (80+ lbs)']

export const dogAges = ['Puppy (under 1 year)', 'Adult (1-7 years)', 'Senior (7+ years)']

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    pet: 'Max (Golden Retriever)',
    rating: 5,
    text: 'KurlyTails transformed my Max into the most handsome pup on the block! The staff is incredibly gentle and professional.',
    image: '/testimonials/sarah.jpg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    pet: 'Bella (Poodle)',
    rating: 5,
    text: 'Best grooming experience ever! Bella always comes home happy and looking fabulous. The spa day package is worth every penny.',
    image: '/testimonials/michael.jpg',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    pet: 'Cooper (Shih Tzu)',
    rating: 5,
    text: 'The puppy package was perfect for our nervous little Cooper. They took their time and now he loves going to the groomer!',
    image: '/testimonials/emily.jpg',
  },
]

export const galleryImages = [
  { id: 1, label: 'Happy Golden Retriever', category: 'Before & After' },
  { id: 2, label: 'Poodle Spa Day', category: 'Spa Services' },
  { id: 3, label: 'Puppy First Groom', category: 'Puppies' },
  { id: 4, label: 'Fluffy Samoyed', category: 'Full Groom' },
  { id: 5, label: 'Dapper Dachshund', category: 'Bath & Brush' },
  { id: 6, label: 'Pampered Pomeranian', category: 'Spa Services' },
]

export const rewardTiers = [
  { name: 'Puppy Pal', minPoints: 0, maxPoints: 499, perks: ['5% off all services', 'Birthday treat'] },
  { name: 'Gold Paw', minPoints: 500, maxPoints: 999, perks: ['10% off all services', 'Free nail trim monthly', 'Priority booking'] },
  { name: 'Platinum Tail', minPoints: 1000, maxPoints: Infinity, perks: ['15% off all services', 'Free add-on monthly', 'VIP appointments', 'Exclusive events'] },
]

export const businessHours = [
  { day: 'Monday', open: '9:00 AM', close: '5:00 PM' },
  { day: 'Tuesday', open: '9:00 AM', close: '5:00 PM' },
  { day: 'Wednesday', open: '9:00 AM', close: '5:00 PM' },
  { day: 'Thursday', open: '9:00 AM', close: '5:00 PM' },
  { day: 'Friday', open: '9:00 AM', close: '5:00 PM' },
  { day: 'Saturday', open: '9:00 AM', close: '3:00 PM' },
  { day: 'Sunday', open: '10:00 AM', close: '2:00 PM' },
]

export const employeeRoles = [
  { 
    id: 'owner', 
    name: 'Owner', 
    permissions: ['all'],
    description: 'Full access to all features'
  },
  { 
    id: 'admin', 
    name: 'Admin', 
    permissions: ['appointments', 'employees', 'services', 'refunds', 'revenue', 'settings'],
    description: 'Manage operations and staff'
  },
  { 
    id: 'senior-groomer', 
    name: 'Senior Groomer', 
    permissions: ['appointments', 'my-schedule', 'services'],
    description: 'Experienced groomer with service management'
  },
  { 
    id: 'groomer', 
    name: 'Groomer', 
    permissions: ['appointments', 'my-schedule'],
    description: 'Handle appointments and grooming'
  },
  { 
    id: 'receptionist', 
    name: 'Receptionist', 
    permissions: ['appointments', 'refunds'],
    description: 'Manage bookings and customer service'
  },
]

export const allPermissions = [
  'appointments',
  'employees', 
  'services',
  'refunds',
  'revenue',
  'settings',
  'my-schedule',
  'roles',
]
