import { type NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/constants/auth.constant';

/** 리프레시 토큰으로 토큰 재발급 */
export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.headers.get('Refresh-Token');

    if (!refreshToken) {
      return NextResponse.json(
        { error: '리프레시 토큰 필요' },
        { status: 400 },
      );
    }

    // 백엔드로 요청 프록시
    const response = await fetch(`${BASE_URL}/api/auth/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Refresh-Token': refreshToken,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('토큰 재발급 에러:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
