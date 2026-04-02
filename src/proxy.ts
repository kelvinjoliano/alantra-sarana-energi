import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // /admin/* hanya untuk ADMIN
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // /dashboard/* untuk semua yang login (ADMIN & PESERTA)
    // sudah dihandle withAuth di bawah

    return NextResponse.next();
  },
  {
    callbacks: {
      // Hanya lanjut ke middleware function jika sudah login
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
