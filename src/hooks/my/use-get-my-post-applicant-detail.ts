import { useQuery } from '@tanstack/react-query';
import myApi from '@/apis/my.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

/** 내 모집글 지원자 상세 타입 */
export default function useGetMyPostApplicantDetail(
  postId: bigint,
  applicationId: bigint,
) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myPostApplicantDetail],
    queryFn: () => myApi.getMyPostApplicantDetail(postId, applicationId),
  });
}
