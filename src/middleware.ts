import { NextRequest, NextResponse } from 'next/server'
import { getUser } from "./lib/auth"

// 1. Specify protected and public routes
const protectedRoutes = ['/role']
const publicRoutes = ['/login']

export async function middleware(req: NextRequest) {

  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path)

  const access = req.cookies.get("access_token")?.value;

  if (access) {

    try {
      const auth = await getUser();

      if (auth && isPublicRoute) {
        return NextResponse.redirect(new URL('/role', req.url));
      }

    } catch (error) {
      if (isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
      throw error
    }
  } else {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // 3. If the route is protected and the user is not authenticated, redirect to the login page

  return NextResponse.next();
}


// export async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;

//   // Check if the current route is protected or public
//   const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
//   const isPublicRoute = publicRoutes.includes(path);

//   const accessToken = req.cookies.get("access_token")?.value;
//   const refreshToken = req.cookies.get("refresh_token")?.value;

//   if (accessToken) {
//     try {
//       // Validate the access token
//       const authResponse = await fetch(`${process.env.SERVER_DOMAIN}/api/v1/user`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`
//         }
//       });

//       if (authResponse.status === 401 && refreshToken) {

//         console.log("here token", refreshToken)
//         // Attempt to refresh the token
//         const refreshResponse = await fetch(`${process.env.SERVER_DOMAIN}/api/token/refresh/`, {
//           method: "POST",
//           credentials: "include",
//           body: JSON.stringify({ 'refresh_token': refreshToken }),
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });

//         if (refreshResponse.ok) {
//           const { access_token: newAccessToken, refresh_token: newRefreshToken } = await refreshResponse.json();

//           console.log(newRefreshToken)

//           // Set the refreshed tokens as cookies
//           const cookieResponse = NextResponse.next();
//           cookieResponse.cookies.set("access_token", newAccessToken, { path: "/", httpOnly: true });
//           cookieResponse.cookies.set("refresh_token", newRefreshToken, { path: "/", httpOnly: true });

//           return cookieResponse;
//         } else {

//           console.log("error refresh Token 400") 
//           // Failed to refresh tokens; redirect to login
//           const redirectResponse = NextResponse.redirect(new URL('/login', req.url));
//           redirectResponse.cookies.delete("access_token");
//           redirectResponse.cookies.delete("refresh_token");
//           return redirectResponse;
//         }
//       }

//       // If authenticated and on a public route, redirect to a protected route
//       if (authResponse.ok && isPublicRoute) {
//         return NextResponse.redirect(new URL('/role', req.url));
//       }
//     } catch (error) {
//       console.error("Authentication error:", error);
//       if (isProtectedRoute) {
//         return NextResponse.redirect(new URL('/login', req.url));
//       }
//     }
//   } else if (isProtectedRoute) {
//     // If no access token and on a protected route, redirect to login
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   // Allow the request to proceed if no special conditions are met
//   return NextResponse.next();
// }

// export async function middleware(req: NextRequest) {



//   // 2. Check if the current route is protected or public
//   const path = req.nextUrl.pathname
//   const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
//   const isPublicRoute = publicRoutes.includes(path)

//   const access = req.cookies.get("access_token")?.value;

//   if (access && isPublicRoute) {
//     return NextResponse.redirect(new URL('/role', req.url));
//   }

//   if (!access && isProtectedRoute) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
//   // 3. If the route is protected and the user is not authenticated, redirect to the login page

//   return NextResponse.next();
// }


export const config = {
  matcher: ['/:path*'], // Protect all routes under /dashboard
};