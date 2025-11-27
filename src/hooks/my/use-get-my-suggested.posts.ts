import { useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { tokenStorage } from '@/utils/auth.util';

export default function useGetMySuggestedPosts(page?: number, size?: number) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.mySuggestedPosts, page],
    queryFn: () => postApi.getMySuggestedPosts(page, size),
    enabled: tokenStorage.hasToken,
  });
}
