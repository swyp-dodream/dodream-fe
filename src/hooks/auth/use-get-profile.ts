import { useQuery } from '@tanstack/react-query';
import userApi from '@/apis/user.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import useGetUser from './use-get-user';

export function useGetProfile() {
  const { data: profileExists } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.profile],
    queryFn: userApi.getProfile,
    enabled: profileExists?.exists === true,
    retry: false, // 프로필 없으면 재시도 X
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useGetProfileExists() {
  const { data: user } = useGetUser();

  return useQuery({
    queryKey: [QUERY_KEY.profileExists],
    queryFn: userApi.getProfileExists,
    enabled: !!user,
    staleTime: 0,
    gcTime: 0,
  });
}
