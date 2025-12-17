import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';

export default function useGetMatchedPosts(page?: number, size?: number) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myMatchedPosts, page],
    queryFn: () => clientApis.post.getMyMatchedPosts(page, size),
  });
}
