import { useQuery } from '@tanstack/react-query';
import myApi from '@/apis/my.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { tokenStorage } from '@/utils/auth.util';

export default function useGetMyApplicationDetail(applicationId: bigint) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myApplicationDetail, applicationId],
    queryFn: () => myApi.getMyApplicationDetail(applicationId),
    enabled: tokenStorage.hasToken,
  });
}
