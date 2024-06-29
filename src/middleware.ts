import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 인증이 필요하지 않은 경로 목록
const publicPaths = ['/authentication', '/register', '/about', '/contact', '/api/auth'];

export async function middleware(request: NextRequest) {
  
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // 현재 경로가 public path인지 확인
  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path) || pathname === '/'
  );
  
  // API 라우트에 대해서는 항상 NextResponse.next() 반환
  if (pathname.startsWith('/api/')) {
    console.log(pathname)
    return NextResponse.next();
  }
  
  // 인증이 필요없는 경로라면 그대로 진행
  if (isPublicPath) {
    return NextResponse.next();
  }

  // 인증이 필요한 경로인데 토큰이 없다면 로그인 페이지로 리다이렉트
  if (!token) {
    return NextResponse.redirect(new URL('/authentication', request.url));
  }
  
  // 인증된 사용자라면 요청된 페이지로 진행
  return NextResponse.next();
}

// 모든 경로에 대해 middleware를 적용
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};