import { useQuery } from '@tanstack/react-query';
import myApi from '@/apis/my.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

/** 내 모집글 지원자 목록 */
export default function useGetMyPostApplications(postId: bigint) {
  return useQuery({
    queryKey: [QUERY_KEY.myPostApplications],
    queryFn: () => myApi.getMyPostApplications(BigInt(postId)),
    enabled: !!postId,
  });
}
