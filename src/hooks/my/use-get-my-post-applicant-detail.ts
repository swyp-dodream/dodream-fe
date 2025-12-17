import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import myApi from '@/services/apis/my.api';
import { useGetProfileExists } from '../profile/use-get-profile';

interface UseGetMyPostApplicantDetailOptions {
  enabled?: boolean;
}

/** 내 모집글 지원자 상세 타입 */
export default function useGetMyPostApplicantDetail(
  postId: bigint,
  applicationId: bigint,
  options?: UseGetMyPostApplicantDetailOptions,
) {
  const { data: profileExists } = useGetProfileExists();

  return useQuery({
    queryKey: [
      QUERY_KEY.auth,
      QUERY_KEY.myPostApplicantDetail,
      postId.toString(),
      applicationId.toString(),
    ],
    queryFn: () => myApi.getMyPostApplicantDetail(postId, applicationId),
    enabled: profileExists?.exists && (options?.enabled ?? true),
  });
}
