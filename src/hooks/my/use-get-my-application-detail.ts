import { useQuery } from '@tanstack/react-query';
import myApi from '@/apis/my.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { useGetProfile } from '../profile/use-get-profile';

interface UseGetMyApplicationDetailOptions {
  enabled?: boolean;
}

export default function useGetMyApplicationDetail(
  applicationId: bigint,
  options?: UseGetMyApplicationDetailOptions,
) {
  const { data: profile } = useGetProfile();

  return useQuery({
    queryKey: [
      QUERY_KEY.auth,
      QUERY_KEY.myApplicationDetail,
      applicationId.toString(),
    ],
    queryFn: () => myApi.getMyApplicationDetail(applicationId),
    enabled: profile && (options?.enabled ?? true),
  });
}
