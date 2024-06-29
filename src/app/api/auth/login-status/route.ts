import { NextRequest, NextResponse } from 'next/server';

const MAX_ATTEMPTS = 5;

export async function POST(req: NextRequest) {
  const { identifier } = await req.json();

  if (!identifier) {
    return NextResponse.json(
      { message: 'Identifier is required' },
      { status: 400 }
    );
  }

  // DB에서 로그인 시도 횟수 GET 로직으로 사용 할 것
  // const response = await fetch(`Database`, {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })

  const loginAttempts = 0

  return NextResponse.json({ 
    attemptsRemaining: Math.max(0, MAX_ATTEMPTS - loginAttempts)
  });
}