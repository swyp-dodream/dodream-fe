'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import authApi from '@/apis/auth.api';
import { tokenStorage } from '@/utils/auth.util';

export default function AuthCallBackPage() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    // 이미 로그인된 사용자는 접근 비허용
    const existingToken = tokenStorage.getToken();
    if (!params.get('accessToken') && !existingToken) {
      router.replace('/');
      return;
    }

    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const error = params.get('error');

    if (error) {
      console.error('로그인 실패', error);
      // TODO: 로그인 실패 시 처리
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
  }, [router, params]);

  return <div>로그인 중</div>;
}
