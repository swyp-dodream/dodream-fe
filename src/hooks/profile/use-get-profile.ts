import { useQuery } from '@tanstack/react-query';
import { clientApis } from '@/apis/client.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

/** 유저의 프로필 데이터 */
export function useGetProfile() {
  const { data: profileExists, isSuccess } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.profile],
    queryFn: clientApis.user.getProfile,
    enabled: isSuccess && profileExists?.exists === true,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/** 유저의 프로필 존재 여부 */
export function useGetProfileExists() {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.profileExists],
    queryFn: clientApis.user.getProfileExists,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
