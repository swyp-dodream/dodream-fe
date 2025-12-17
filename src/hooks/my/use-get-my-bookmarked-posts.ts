import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import postApi from '@/services/post.api';
import type { ProjectType } from '@/types/post.type';
import { useGetProfileExists } from '../profile/use-get-profile';

export default function useGetMyBookmarkedPosts(
  projectType: ProjectType,
  page: number,
  size?: number,
) {
  const { data: profileExists, isSuccess } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myBookmarkedPosts, projectType, page],
    queryFn: () => postApi.getMyBookmarkedPosts(projectType, page, size),
    enabled: isSuccess && profileExists.exists === true,
  });
}
