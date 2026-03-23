'use client'

import { create } from 'zustand'

export interface Employee {
  id: string
  name: string
  email: string
  role: string
  status: 'online' | 'offline'
  avatar?: string
}

export interface Appointment {
  id: string
  customerName: string
  customerEmail: string
  petName: string
  petBreed: string
  service: string
  date: string
  time: string
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'
  groomer: string | null
  total: number
}

export interface RefundRequest {
  id: string
  customerName: string
  bookingId: string
  service: string
  amount: number
  reason: string
  status: 'Pending' | 'Approved' | 'Partial' | 'Denied'
  date: string
}

export interface Service {
  id: string
  name: string
  price: number
  available: boolean
}

interface EmployeeStore {
  currentEmployee: Employee | null
  employees: Employee[]
  appointments: Appointment[]
  refundRequests: RefundRequest[]
  services: Service[]
  
  // Auth
  login: (email: string, password: string) => boolean
  logout: () => void
  
  // Appointments
  claimAppointment: (appointmentId: string) => void
  updateAppointmentStatus: (appointmentId: string, status: Appointment['status']) => void
  
  // Employees
  updateEmployeeRole: (employeeId: string, role: string) => void
  toggleEmployeeStatus: (employeeId: string) => void
  deactivateEmployee: (employeeId: string) => void
  
  // Refunds
  approveRefund: (refundId: string, type: 'full' | 'partial') => void
  denyRefund: (refundId: string) => void
  
  // Services
  toggleServiceAvailability: (serviceId: string) => void
}

const mockEmployees: Employee[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@kurlytails.com', role: 'owner', status: 'online' },
  { id: '2', name: 'Sarah Williams', email: 'sarah@kurlytails.com', role: 'admin', status: 'online' },
  { id: '3', name: 'Mike Chen', email: 'mike@kurlytails.com', role: 'senior-groomer', status: 'online' },
  { id: '4', name: 'Emily Davis', email: 'emily@kurlytails.com', role: 'groomer', status: 'offline' },
  { id: '5', name: 'James Wilson', email: 'james@kurlytails.com', role: 'receptionist', status: 'online' },
]

const mockAppointments: Appointment[] = [
  { id: '1', customerName: 'John Smith', customerEmail: 'john@email.com', petName: 'Max', petBreed: 'Golden Retriever', service: 'Full Groom', date: '2026-03-23', time: '9:00 AM', status: 'Confirmed', groomer: null, total: 75 },
  { id: '2', customerName: 'Lisa Brown', customerEmail: 'lisa@email.com', petName: 'Bella', petBreed: 'Poodle', service: 'Spa Day', date: '2026-03-23', time: '10:30 AM', status: 'Confirmed', groomer: 'Mike Chen', total: 95 },
  { id: '3', customerName: 'David Lee', customerEmail: 'david@email.com', petName: 'Rocky', petBreed: 'Bulldog', service: 'Bath & Brush', date: '2026-03-23', time: '1:00 PM', status: 'Pending', groomer: null, total: 45 },
  { id: '4', customerName: 'Amanda White', customerEmail: 'amanda@email.com', petName: 'Luna', petBreed: 'Shih Tzu', service: 'Full Groom', date: '2026-03-23', time: '2:30 PM', status: 'Confirmed', groomer: 'Emily Davis', total: 75 },
  { id: '5', customerName: 'Chris Taylor', customerEmail: 'chris@email.com', petName: 'Charlie', petBreed: 'Labrador', service: 'Nail Trim', date: '2026-03-23', time: '4:00 PM', status: 'Confirmed', groomer: null, total: 20 },
  { id: '6', customerName: 'Sarah Johnson', customerEmail: 'sarah.j@email.com', petName: 'Buddy', petBreed: 'Beagle', service: 'Full Groom', date: '2026-03-24', time: '9:30 AM', status: 'Confirmed', groomer: null, total: 75 },
  { id: '7', customerName: 'Michael Chen', customerEmail: 'michael@email.com', petName: 'Cooper', petBreed: 'Corgi', service: 'Spa Day', date: '2026-03-24', time: '11:00 AM', status: 'Pending', groomer: null, total: 95 },
]

const mockRefundRequests: RefundRequest[] = [
  { id: '1', customerName: 'Robert Garcia', bookingId: 'B123', service: 'Full Groom', amount: 75, reason: 'Pet was uncomfortable during service', status: 'Pending', date: '2026-03-20' },
  { id: '2', customerName: 'Jennifer Martinez', bookingId: 'B124', service: 'Spa Day', amount: 95, reason: 'Service not as expected', status: 'Pending', date: '2026-03-21' },
  { id: '3', customerName: 'Thomas Anderson', bookingId: 'B125', service: 'Bath & Brush', amount: 45, reason: 'Scheduling conflict', status: 'Approved', date: '2026-03-19' },
]

const mockServices: Service[] = [
  { id: 'bath-brush', name: 'Bath & Brush', price: 45, available: true },
  { id: 'full-groom', name: 'Full Groom', price: 75, available: true },
  { id: 'spa-day', name: 'Spa Day', price: 95, available: true },
  { id: 'puppy-package', name: 'Puppy Package', price: 55, available: true },
  { id: 'nail-trim', name: 'Nail Trim', price: 20, available: true },
  { id: 'teeth-brushing', name: 'Teeth Brushing', price: 15, available: false },
]

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  currentEmployee: null,
  employees: mockEmployees,
  appointments: mockAppointments,
  refundRequests: mockRefundRequests,
  services: mockServices,
  
  login: (email, password) => {
    const employee = mockEmployees.find(e => e.email === email)
    if (employee && password) {
      set({ currentEmployee: employee })
      return true
    }
    return false
  },
  
  logout: () => {
    set({ currentEmployee: null })
  },
  
  claimAppointment: (appointmentId) => {
    const { currentEmployee, appointments } = get()
    if (!currentEmployee) return
    
    set({
      appointments: appointments.map(apt =>
        apt.id === appointmentId
          ? { ...apt, groomer: currentEmployee.name }
          : apt
      )
    })
  },
  
  updateAppointmentStatus: (appointmentId, status) => {
    set({
      appointments: get().appointments.map(apt =>
        apt.id === appointmentId ? { ...apt, status } : apt
      )
    })
  },
  
  updateEmployeeRole: (employeeId, role) => {
    set({
      employees: get().employees.map(emp =>
        emp.id === employeeId ? { ...emp, role } : emp
      )
    })
  },
  
  toggleEmployeeStatus: (employeeId) => {
    set({
      employees: get().employees.map(emp =>
        emp.id === employeeId
          ? { ...emp, status: emp.status === 'online' ? 'offline' : 'online' }
          : emp
      )
    })
  },
  
  deactivateEmployee: (employeeId) => {
    set({
      employees: get().employees.filter(emp => emp.id !== employeeId)
    })
  },
  
  approveRefund: (refundId, type) => {
    set({
      refundRequests: get().refundRequests.map(req =>
        req.id === refundId
          ? { ...req, status: type === 'full' ? 'Approved' : 'Partial' }
          : req
      )
    })
  },
  
  denyRefund: (refundId) => {
    set({
      refundRequests: get().refundRequests.map(req =>
        req.id === refundId ? { ...req, status: 'Denied' } : req
      )
    })
  },
  
  toggleServiceAvailability: (serviceId) => {
    set({
      services: get().services.map(svc =>
        svc.id === serviceId ? { ...svc, available: !svc.available } : svc
      )
    })
  },
}))
