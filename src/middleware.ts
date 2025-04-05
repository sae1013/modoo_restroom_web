import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

export async function middleware(req: NextRequest) {
  // 정적 자산 (CSS, JS, 이미지 등)에 대한 요청은 예외 처리
  if (req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }
  // const { cookies, nextUrl } = req;
  // const path = nextUrl.pathname;
  // const accessToken = cookies.get('access_token')?.value;
  // const authUrls = ['/auth/login', '/auth/signup'];
  // if (authUrls.includes(path)) {
  //   // 이미 로그인된 경우 메인으로 이동
  //   if (accessToken) {
  //     return NextResponse.redirect(new URL('/search', req.url));
  //   } else {
  //     return NextResponse.next();
  //   }
  // }
  // if (!accessToken) {
  //   return NextResponse.redirect(new URL('/auth/login', req.url));
  // }


  return NextResponse.next();


}

export const config = {
  // matcher: ['/search/:path*', '/my/:page*', '/auth/login', '/auth/signup'],
};