'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import authApi from '@/apis/auth.api';
import { tokenStorage } from '@/utils/auth.util';

interface AuthCallBackClientProps {
  searchParams: {
    accessToken?: string;
    refreshToken?: string;
  };
}

export default function AuthCallBackClient({
  searchParams,
}: AuthCallBackClientProps) {
  const router = useRouter();
  const { accessToken, refreshToken } = searchParams;

  useEffect(() => {
    // TODO: 이미 로그인된 사용자는 접근 비허용 - 코드 수정
    // 토큰 없을 경우 리다이렉트 처리
    if (tokenStorage.getToken() || !accessToken || !refreshToken) {
      router.replace('/');
      return;
    }

    if (accessToken) tokenStorage.setToken(accessToken);
    if (refreshToken) tokenStorage.setRefreshToken(refreshToken);

    // 토큰 저장 후 토큰 정보 파라미터 삭제
    window.history.replaceState({}, '', '/auth/callback');

    const verifyLogin = async () => {
      try {
        const user = await authApi.getUser();

        // 초기 발급받은 토큰으로 받은 유저 정보 출력 테스트
        console.log('유저:', user);

        // TODO: 유저 상태에 따른 리다이렉트 처리
        // router.replace(`${user ? '/' : '/create-profile'}`);
        router.replace('/');
      } catch (err) {
        console.error(err);
        // TODO: 로그인 실패 시 처리
        router.replace('/');
      }
    };

    verifyLogin();
  }, [router, accessToken, refreshToken]);

  return <div>로그인 중</div>;
}
