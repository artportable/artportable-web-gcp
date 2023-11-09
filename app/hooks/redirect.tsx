import { NextResponse } from "next/server";

const signUpRedirect = process.env.REDIRECT_TO_SIGN_UP;

export async function middleware(req, ev) {
  const { pathname } = req.nextUrl;
  if (pathname == "/") {
    return NextResponse.redirect(signUpRedirect);
  }
  return NextResponse.next();
}
