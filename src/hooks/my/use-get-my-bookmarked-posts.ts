import { useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { tokenStorage } from '@/utils/auth.util';

export default function useGetMyBookmarkedPosts(page?: number, size?: number) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myBookmarkedPosts],
    queryFn: () => postApi.getMyBookmarkedPosts(page, size),
    enabled: tokenStorage.hasToken,
  });
}
