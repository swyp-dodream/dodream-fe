import { useQuery } from '@tanstack/react-query';
import myApi from '@/apis/my.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { useGetProfileExists } from '../profile/use-get-profile';

/** 내가 쓴 글 */
export default function useGetMyPosts(type: string) {
  const { data: profileExists } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myPosts, type],
    queryFn: () => myApi.getMyPosts(type),
    enabled: profileExists?.exists,
  });
}
