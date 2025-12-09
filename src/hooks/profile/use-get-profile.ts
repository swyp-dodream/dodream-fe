import { queryOptions, useQuery } from '@tanstack/react-query';
import { clientApis } from '@/apis/client.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

export const profileQueryOptions = queryOptions({
  queryKey: [QUERY_KEY.auth, QUERY_KEY.profile],
  queryFn: clientApis.user.getProfile,
});

/** 유저의 프로필 데이터 */
export function useGetProfile() {
  const { data: profileExists, isSuccess } = useGetProfileExists();

  return useQuery({
    ...profileQueryOptions,
    enabled: isSuccess && profileExists?.exists === true,
  });
}

/** 유저의 프로필 존재 여부 */
export function useGetProfileExists() {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.profileExists],
    queryFn: clientApis.user.getProfileExists,
  });
}
