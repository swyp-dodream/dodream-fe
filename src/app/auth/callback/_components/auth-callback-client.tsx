'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import userApi from '@/apis/user.api';
import LoadingSpinner from '@/components/commons/loading-spinner';
import { QUERY_KEY } from '@/constants/query-key.constant';
import useToast from '@/hooks/use-toast';
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
  const toast = useToast();
  const { accessToken, refreshToken } = searchParams;

  useEffect(() => {
    const handleNewLogin = async () => {
      try {
        // 이미 로그인된 사용자는 접근 비허용
        const existingToken = tokenStorage.getToken();
        if (existingToken) {
          router.replace('/');
          return;
        }

        // 토큰 없을 경우 홈으로 리다이렉트
        if (!accessToken || !refreshToken) {
          router.replace('/');
          toast({ title: '로그인에 실패했습니다.' });
          return;
        }

        // 토큰 저장
        tokenStorage.setToken(accessToken);
        tokenStorage.setRefreshToken(refreshToken);

        // 토큰 정보 파라미터 삭제
        window.history.replaceState({}, '', '/auth/callback');

        const { exists } = await userApi.getProfileExists();

        // 프로필 쿼리 무효화
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.user],
        });
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.auth],
        });

        router.replace(`${exists ? '/' : '/create-profile'}`);
      } catch (err) {
        console.error(err);
        tokenStorage.clearAll();
        toast({ title: '로그인에 실패했습니다.' });
        router.replace('/');
      }
    };

    handleNewLogin();
  }, [router, accessToken, refreshToken, toast]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoadingSpinner variant="lg" />
    </div>
  );
}
