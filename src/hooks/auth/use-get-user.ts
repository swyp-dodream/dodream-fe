import { useQuery } from '@tanstack/react-query';
import authApi from '@/apis/auth.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { tokenStorage } from '@/utils/auth.util';

export default function useGetUser() {
  return useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: authApi.getUser,
    // TODO: enabled 삭제
    enabled: tokenStorage.hasToken,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
