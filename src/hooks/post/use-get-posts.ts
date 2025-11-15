import { useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import type { HomeProjectType } from '@/types/post.type';
import { useGetProfileExists } from '../profile/use-get-profile';

/** 게시물 목록 */
export function useGetPosts(projectType: HomeProjectType) {
  return useQuery({
    queryKey: [QUERY_KEY.posts, projectType],
    queryFn: () => postApi.getPosts(projectType),
    staleTime: 30 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/** 게시물 상세 정보 */
export function useGetPostDetail(postId: number) {
  const { data: profileExists } = useGetProfileExists();

  return useQuery({
    queryKey: [],
    queryFn: () => {
      if (profileExists?.exists) return postApi.getPostDetailAuth(postId);
      return postApi.getPostDetail(postId);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
