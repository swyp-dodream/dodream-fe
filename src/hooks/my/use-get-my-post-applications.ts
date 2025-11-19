import { useQuery } from '@tanstack/react-query';
import myApi from '@/apis/my.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { useGetProfileExists } from '../profile/use-get-profile';

/** 내 모집글 지원자 목록 */
export default function useGetMyPostApplications(postId: bigint) {
  const { data: profileExists } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myPostApplications, postId.toString()],
    queryFn: () => myApi.getMyPostApplications(BigInt(postId)),
    enabled: !!postId && profileExists?.exists,
  });
}
