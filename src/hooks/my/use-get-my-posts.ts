import { useQuery } from '@tanstack/react-query';
import myApi from '@/apis/my.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

/** 내가 쓴 글 */
export default function useGetMyPosts() {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myPosts],
    queryFn: myApi.getMyPosts,
  });
}
