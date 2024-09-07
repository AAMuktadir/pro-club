import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Only protect the /manage-club route
  if (path === "/manage-club") {
    const token = cookies().get("token")?.value || "";

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  // For other routes, do nothing
  return NextResponse.next();
}

export const config = {
  matcher: ["/manage-club"], // Only apply middleware to /manage-club
};
