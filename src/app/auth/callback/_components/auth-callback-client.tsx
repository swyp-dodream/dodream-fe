'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import userApi from '@/apis/user.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
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
    if (!accessToken || !refreshToken) {
      router.replace('/');
      return;
    }

    if (accessToken) tokenStorage.setToken(accessToken);
    if (refreshToken) tokenStorage.setRefreshToken(refreshToken);

    // 토큰 저장 후 토큰 정보 파라미터 삭제
    window.history.replaceState({}, '', '/auth/callback');

    const verifyLogin = async () => {
      try {
        const { exists } = await userApi.getProfileExists();

        // 프로필 쿼리 무효화
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.user],
        });

        router.replace(`${exists ? '/' : '/create-profile'}`);
      } catch (err) {
        console.error(err);
        // TODO: 로그인 실패 시 처리
        router.replace('/');
      }
    };

    verifyLogin();
  }, [router, accessToken, refreshToken]);

  return null;
}
