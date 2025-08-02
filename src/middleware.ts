/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { adminRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT, facultyRoutes, studentRoutes, superAdminRoutes } from "../route";


const roleBasedRoutes: Record<string, string[]> = {
  superAdmin: superAdminRoutes,
  admin: adminRoutes,
  student: studentRoutes,
  faculty: facultyRoutes,
};

export const middleware = async (request: NextRequest) => {
  
  const { nextUrl, cookies } = request;

  const token = cookies.get("accessToken")?.value;
  let user: any = null;
  let isLoggedIn = false;
  let userRole: string | undefined;
  let needsPasswordChange = false;

  const isChangePasswordRoute = nextUrl.pathname === "/change-password";

  if (token) {
    try {
      user = jwtDecode(token);
      isLoggedIn = true;
      userRole = user?.role;
      needsPasswordChange = user?.needsPasswordChange;
    } catch (error) {
      console.log(error)
      isLoggedIn = false;
    }
  }

  if (isChangePasswordRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && needsPasswordChange && !isChangePasswordRoute) {
    return NextResponse.redirect(new URL("/change-password", request.url));
  }

  const isAuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (isAuthRoute && isLoggedIn && !isChangePasswordRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
  }

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && !isChangePasswordRoute) {
    const allowedRoutes = roleBasedRoutes[userRole || ""] || [];
    const isAllowed = allowedRoutes.includes(nextUrl.pathname);

    if (!isAllowed && !isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();

};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)).*)",
  ],
};
