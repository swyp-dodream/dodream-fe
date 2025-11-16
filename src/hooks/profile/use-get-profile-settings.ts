import { useQuery } from '@tanstack/react-query';
import profileApi from '@/apis/profile.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import type { GetProfileSettingsResponseType } from '@/types/profile.type';
import { tokenStorage } from '@/utils/auth.util';

export default function useGetProfileSettings() {
  return useQuery<GetProfileSettingsResponseType>({
    queryKey: [QUERY_KEY.profileSettings],
    queryFn: profileApi.getProfileSettings,
    enabled: tokenStorage.hasToken,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
