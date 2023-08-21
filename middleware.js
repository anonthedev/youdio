import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data } = await supabase.auth.refreshSession();
  // if user is signed in and the current path is / redirect the user to /account
  if (
    (data.user && req.nextUrl.pathname === "/") ||
    req.nextUrl.pathname === "/signIn"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!data.user && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/signIn", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/dashboard", "/signIn"],
};
