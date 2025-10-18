import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // AUTHENTICATION DISABLED - Uncomment below to re-enable authentication
  // const token = request.cookies.get("token");
  // if (!token) {
  //   const returnTo = request.nextUrl.pathname;

  //   const redirectUrl = new URL("/", request.url);
  //   redirectUrl.searchParams.set("auth", "required");
  //   redirectUrl.searchParams.set("returnTo", returnTo);

  //   return NextResponse.redirect(redirectUrl);
  // }

  // No authentication required - allow all requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: ["/GenerateTickets", "/HostEvent"],
};
