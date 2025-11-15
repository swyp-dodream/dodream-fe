import { useQuery } from '@tanstack/react-query';
import userApi from '@/apis/user.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import useGetUser from '../auth/use-get-user';

/** 유저의 프로필 데이터 */
export function useGetProfile() {
  const { data: profileExists } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.profile],
    queryFn: userApi.getProfile,
    enabled: profileExists?.exists === true,
    retry: false, // 프로필 없으면 재시도 X
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

/** 유저의 프로필 존재 여부 */
export function useGetProfileExists() {
  const { data: user } = useGetUser();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.profileExists],
    queryFn: userApi.getProfileExists,
    enabled: !!user,
    staleTime: 12 * 60 * 60 * 1000,
    gcTime: 12 * 60 * 60 * 1000,
  });
}
