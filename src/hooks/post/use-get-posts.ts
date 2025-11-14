import { useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import type { HomeProjectType } from '@/types/post.type';

export default function useGetPosts(type: HomeProjectType) {
  return useQuery({
    queryKey: [QUERY_KEY.posts],
    queryFn: () => postApi.getPosts(type),
    staleTime: 30 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
