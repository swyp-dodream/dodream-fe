import { useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

export default function useGetMatchedPosts(page?: number, size?: number) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myMatchedPosts, page],
    queryFn: () => postApi.getMyMatchedPosts(page, size),
  });
}
