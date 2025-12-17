import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';
import { useGetProfileExists } from '../profile/use-get-profile';

/** 내 모집글 지원자 목록 */
export default function useGetMyPostApplications(postId: bigint) {
  const { data: profileExists } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myPostApplications, postId.toString()],
    queryFn: () => clientApis.posts.getMyPostApplications(BigInt(postId)),
    enabled: !!postId && profileExists?.exists,
  });
}
