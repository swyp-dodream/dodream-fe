import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';
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
    queryFn: () =>
      clientApis.bookmarks.getMyBookmarkedPosts(projectType, page, size),
    enabled: isSuccess && profileExists.exists === true,
  });
}
