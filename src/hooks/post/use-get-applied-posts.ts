import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';

export default function useGetMyAppliedPosts(page?: number, size?: number) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myAppliedPosts, page],
    queryFn: () => clientApis.post.getMyAppliedPosts(page, size),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
