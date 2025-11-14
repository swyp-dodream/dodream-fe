import { useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

export default function useGetPosts() {
  return useQuery({
    queryKey: [QUERY_KEY.posts],
    queryFn: postApi.getPosts,
    staleTime: 30 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
