import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import postApi from '@/services/apis/post.api';

export default function useGetMySuggestedPosts(page?: number, size?: number) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.mySuggestedPosts, page],
    queryFn: () => postApi.getMySuggestedPosts(page, size),
  });
}
