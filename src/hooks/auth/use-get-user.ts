import { useQuery } from '@tanstack/react-query';
import { clientApis } from '@/apis/client.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

/** 유저 기본 정보 */
export default function useGetUser() {
  return useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: clientApis.user.getUser,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });
}
