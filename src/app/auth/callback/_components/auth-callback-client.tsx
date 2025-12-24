'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/commons/loading-spinner';
import { QUERY_KEY } from '@/constants/query-key.constant';
import useToast from '@/hooks/use-toast';
import { queryClient } from '@/lib/query-client';
import { clientApis } from '@/services/client.api';

interface AuthCallBackClientProps {
  redirectPath?: string | null;
}

export default function AuthCallBackClient({
  redirectPath = '/',
}: AuthCallBackClientProps) {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const handleNewLogin = async () => {
      try {
        const { exists } = await clientApis.profile.getProfileExists();

        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user] });
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.auth] });

        if (exists) {
          router.replace(redirectPath || '/');
        } else {
          // 프로필 생성 페이지 이동 시에도 redirect 경로 저장
          const createProfileUrl = redirectPath
            ? `/create-profile?redirect=${encodeURIComponent(redirectPath)}`
            : '/create-profile';
          router.replace(createProfileUrl);
        }
      } catch (err) {
        console.error(err);
        toast({ title: '로그인에 실패했습니다.' });
        router.replace('/');
      }
    };

    handleNewLogin();
  }, [router, redirectPath, toast]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoadingSpinner variant="lg" />
    </div>
  );
}
