import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const authRoutes = ["/signin", "/signup"];
const protectedRoutes = [
  "/createTranscript",
  "/courseEntry",
  "/gradeScale",
  "/transcript",
  "/profile",
  "/dashboard/:path*",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieHeader = request.headers.get("cookie") || "";
  const tokenMatch = cookieHeader.match(/token=([^;]*)/);
  const token = tokenMatch ? tokenMatch[1] : null;

  // Check if current route is auth route (login/signup)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some((route) => {
    if (route.includes(":path*")) {
      const baseRoute = route.replace("/:path*", "");
      return pathname.startsWith(baseRoute);
    }
    return pathname === route;
  });

  // No token case
  if (!token) {
    if (isAuthRoute) {
      return NextResponse.next();
    }
    // Redirect to login with return URL for protected routes
    if (isProtectedRoute) {
      return NextResponse.redirect(
        new URL(`/signin?redirect=${encodeURIComponent(pathname)}`, request.url)
      );
    }
    // Allow non-protected routes
    return NextResponse.next();
  }

  // Token exists - handle auth routes
  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Decode token
  let userInfo: { role?: string; isSubscribed?: boolean } = {};
  try {
    userInfo = jwtDecode(token) as { role?: string; isSubscribed?: boolean };
  } catch (error) {
    console.error("Failed to decode token", error);
    // Clear invalid token and redirect to login
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.delete("token");
    return response;
  }

  // Check admin routes
  if (
    pathname.startsWith("/dashboard") &&
    userInfo?.role !== "SUPER_ADMIN" &&
    userInfo?.role !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // // Check subscription
  if (isProtectedRoute) {
    let isSubscribed = userInfo.isSubscribed;

    // Only fetch user data if token doesn't indicate subscription
    if (isSubscribed !== true) {
      try {
        const apiUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/user/get-me`);
        const userResponse = await fetch(apiUrl.toString(), {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        if (userResponse.ok) {
          const data = await userResponse.json();
          isSubscribed = data?.data?.isSubscribed;
          // console.log(isSubscribed, data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      if (!isSubscribed) {
        return NextResponse.redirect(new URL("/pricing", request.url));
      }
    }
  }

  // Allow the request to proceed for all other cases
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/createTranscript",
    "/courseEntry",
    "/gradeScale",
    "/transcript",
    "/profile",
    "/dashboard/:path*",
  ],
};
