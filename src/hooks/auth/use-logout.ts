'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      await clientApis.user.logout();

      queryClient.removeQueries({ queryKey: [QUERY_KEY.user] });
      queryClient.removeQueries({ queryKey: [QUERY_KEY.auth] });

      router.refresh();
    } catch {
      console.error('로그아웃 실패');
    }
  };

  return { logout };
};
