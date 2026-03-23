import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { HowItWorks } from '@/components/how-it-works'
import { About } from '@/components/about'
import { Gallery } from '@/components/gallery'
import { RewardsBanner } from '@/components/rewards-banner'
import { Testimonials } from '@/components/testimonials'
import { BookingWizard } from '@/components/booking-wizard'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <About />
      <Gallery />
      <RewardsBanner />
      <Testimonials />
      <BookingWizard />
      <Contact />
      <Footer />
    </main>
  )
}
