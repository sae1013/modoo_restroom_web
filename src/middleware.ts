import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // 정적 자산 (CSS, JS, 이미지 등)에 대한 요청은 예외 처리
  if (req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  //!TODO  쿠키에 토큰을 읽고, 토큰이 없다면 강제로 로그인 페이지로 보냄.
  // 토큰에 대한 검증은 app에서 처리 할 것.
  // if (!req.nextUrl.pathname.startsWith('/auth/login')) {
  //   return NextResponse.redirect(new URL('/auth/login', req.url));
  // }

  return NextResponse.next();
}