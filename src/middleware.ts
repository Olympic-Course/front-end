// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  return NextResponse.next();
}


// import { NextRequest, NextResponse } from "next/server";

// const PROTECTED_PREFIXES = [
//   "/courses/create",
//   "/courses/edit",
//   "/map/navigation",
//   "/user/likes",
//   "/user/posts",
// ];

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // HttpOnly refresh token (서버만 접근 가능)
//   const refreshToken = req.cookies.get("refresh-token")?.value;
//   const isLoggedIn = Boolean(refreshToken);

//   // 로그인 사용자가 "/" 접근 → /home
//   if (pathname === "/" && isLoggedIn) {
//     return NextResponse.redirect(new URL("/home", req.url));
//   }

//   // 비회원 보호 경로 접근 차단
//   const isProtected = PROTECTED_PREFIXES.some((prefix) =>
//     pathname.startsWith(prefix)
//   );

//   if (!isLoggedIn && isProtected) {
//     return NextResponse.redirect(new URL("/user", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/courses/:path*",
//     "/map/navigation/:path*",
//     "/user/:path*",
//   ],
// };
