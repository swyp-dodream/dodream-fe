import { useQuery } from '@tanstack/react-query';
import userApi from '@/apis/user.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { tokenStorage } from '@/utils/auth.util';

export default function useGetUser() {
  return useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: userApi.getUser,
    enabled: tokenStorage.hasToken,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
