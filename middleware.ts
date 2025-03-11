import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log(">>>>> middleware <<<");
  const token = req.cookies.get("refreshToken");
  console.log("<<< token >>>", token, "<<<<<<");

  if (req.nextUrl.pathname.startsWith("/login") && token) {
    const previousPage = req.headers.get("referer") || new URL("/", req.url);
    return NextResponse.redirect(new URL(previousPage, req.url));
  }
  if (!req.nextUrl.pathname.startsWith("/login") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login"],
};
