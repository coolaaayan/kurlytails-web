import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
])

const isEmployeeRoute = createRouteMatcher([
  '/employee(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Protect dashboard routes - require authentication
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
  
  // Employee routes have their own login - don't require Clerk auth
  // Employee authentication is handled separately
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
