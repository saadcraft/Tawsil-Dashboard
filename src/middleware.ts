import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtDecode } from "jwt-decode";
import { notFound } from 'next/navigation'

// 1. Specify protected and public routes
const protectedRoutes = ['/role']
const publicRoutes = ['/login']

export async function middleware(req: NextRequest) {

  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path)
  
  const cookie = (await cookies()).get('access_token')?.value

  if (!cookie && isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
  }
  if(cookie && isPublicRoute){
      return NextResponse.redirect(new URL('/role', req.url));
  }



  // 3. If the route is protected and the user is not authenticated, redirect to the login page


  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'], // Protect all routes under /dashboard
};