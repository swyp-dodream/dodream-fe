import { useQuery } from '@tanstack/react-query';
import myApi from '@/apis/my.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { useGetProfile } from '../profile/use-get-profile';

interface UseGetMyPostApplicantDetailOptions {
  enabled?: boolean;
}

/** 내 모집글 지원자 상세 타입 */
export default function useGetMyPostApplicantDetail(
  postId: bigint,
  applicationId: bigint,
  options?: UseGetMyPostApplicantDetailOptions,
) {
  const { data: profile } = useGetProfile();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myPostApplicantDetail],
    queryFn: () => myApi.getMyPostApplicantDetail(postId, applicationId),
    enabled: profile && (options?.enabled ?? true),
  });
}
