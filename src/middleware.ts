import { NextRequest, NextResponse } from 'next/server'
import { getUser } from "./lib/auth"
import { CookiesRemover, refreshAccessToken } from './lib/cookies'
import { UserRole } from './lib/tools/roles/userRole'
import { ChefRole } from './lib/tools/roles/chef.role'

// 1. Specify protected and public routes
const protectedRoutes = ['/role']
const publicRoutes = ['/login', '/forget', '/reset-password']

export async function middleware(req: NextRequest) {


  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path)

  const access = req.cookies.get("access_token")?.value;
  const refresh = req.cookies.get("refresh_token")?.value;

  if (access || refresh) {

    try {
      const auth = await getUser();
      let role = null;
      // auth.role
      if (auth.role == "chef_bureau") {
        role = new ChefRole();
      }

      // let urls = role!.getUrl();
      // console.log("urls are", urls)
      // console.log("path is", path)
      // console.log("critera is", urls.includes(path))

      // Redirect logic
      if (auth) {
        if (isPublicRoute) {
          // Redirect to a default route if the user doesn't have access
          return NextResponse.redirect(new URL('/role', req.url));
        }
      }

    } catch (error) {
      if ((error as Error).message.includes("401")) {
        console.log("Token expired or invalid, attempting to refresh...");

        try {
          // Attempt to refresh the token
          const newTokens = await refreshAccessToken();

          if (newTokens) {
            // Assuming refreshAccessToken returns an object with new access and refresh tokens
            const { access: newAccessToken, refresh: newRefreshToken } = newTokens;

            // Set the new tokens in cookies
            const res = NextResponse.next();
            res.cookies.set('access_token', newAccessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 24 * 60 * 60,
              sameSite: "strict"
            });
            res.cookies.set('refresh_token', newRefreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 7 * 24 * 60 * 60,
              sameSite: "strict"
            });

            if (isPublicRoute) {
              return NextResponse.redirect(new URL('/role', req.url));
            }

            // Optionally, revalidate the current path to make sure we have fresh data
            return res;
          } else {
            // If no refresh token or invalid refresh, clear cookies and redirect to login
            console.log('Invalid refresh token or unable to refresh token');
            CookiesRemover();
            return NextResponse.redirect(new URL('/login', req.url));
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          // On failure, clear cookies and redirect to login
          CookiesRemover();
          return NextResponse.redirect(new URL('/login', req.url));
        }
      } else if (isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      throw error;
    }
  } else {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/((?!api|_next|fonts|icons|images|login).*)', '/role', '/login', '/forget', '/reset-password', '/', '/role/:path*'],
};