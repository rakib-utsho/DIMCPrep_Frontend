import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const publicRoutes = [
    "/",
    "/signIn",
    "/signUp",
    "/contact-us",
    "/verification",
    "/forgetPassword",
    "/reset-password",
    "/success",
    "/cancel",
    "/disclaimer",
    "/privacy",
    "/faq",
    "/robots.txt", // ✅ allow search engines
    "/sitemap.xml",
  ];

  const path = request.nextUrl.pathname;

  // Allow public routes
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // Get the token from cookies (match your sign-in page)
  const token = request.cookies.get("token")?.value;
  console.log("Middleware token:", token); // Debug output

  // If token not found, redirect
  if (!token) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  try {
    const decoded = jwtDecode(token) as { exp: number; role?: string };
    console.log("Decoded token:", decoded);

    if (decoded.exp * 1000 < Date.now()) {
      console.log("Token expired.");
      return NextResponse.redirect(new URL("/signIn", request.url));
    }

    return NextResponse.next(); // Token is valid
  } catch (error) {
    console.log("Token decode failed:", error);
    return NextResponse.redirect(new URL("/signIn", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
