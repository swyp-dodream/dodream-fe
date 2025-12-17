import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import myApi from '@/services/my.api';
import { useGetProfileExists } from '../profile/use-get-profile';

interface UseGetMyApplicationDetailOptions {
  enabled?: boolean;
}

export default function useGetMyApplicationDetail(
  applicationId: bigint,
  options?: UseGetMyApplicationDetailOptions,
) {
  const { data: profileExists } = useGetProfileExists();

  return useQuery({
    queryKey: [
      QUERY_KEY.auth,
      QUERY_KEY.myApplicationDetail,
      applicationId.toString(),
    ],
    queryFn: () => myApi.getMyApplicationDetail(applicationId),
    enabled: profileExists?.exists && (options?.enabled ?? true),
  });
}
