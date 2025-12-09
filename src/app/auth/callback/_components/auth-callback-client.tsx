'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { clientApis } from '@/apis/client.api';
import LoadingSpinner from '@/components/commons/loading-spinner';
import { QUERY_KEY } from '@/constants/query-key.constant';
import useToast from '@/hooks/use-toast';
import { queryClient } from '@/lib/query-client';

interface AuthCallBackClientProps {
  searchParams: {
    userId?: string;
    email?: string;
    name?: string;
  };
}

export default function AuthCallBackClient({
  searchParams,
}: AuthCallBackClientProps) {
  const router = useRouter();
  const toast = useToast();
  const { userId, email, name } = searchParams;

  useEffect(() => {
    const handleNewLogin = async () => {
      try {
        // 사용자 정보가 없으면 홈으로 리다이렉트
        if (!userId || !email || !name) {
          router.replace('/');
          toast({ title: '로그인에 실패했습니다.' });
          return;
        }

        const { exists } = await clientApis.user.getProfileExists();

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
        toast({ title: '로그인에 실패했습니다.' });
        router.replace('/');
      }
    };

    handleNewLogin();
  }, [router, userId, email, name, toast]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoadingSpinner variant="lg" />
    </div>
  );
}
