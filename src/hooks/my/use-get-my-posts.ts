import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';
import { useGetProfileExists } from '../profile/use-get-profile';

/** 내가 쓴 글 */
export default function useGetMyPosts(
  type: string,
  page: number,
  size?: number,
) {
  const { data: profileExists } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myPosts, type, page],
    queryFn: () => clientApis.posts.getMyPosts(type, page, size),
    enabled: profileExists?.exists,
  });
}
