import { useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { useGetProfileExists } from '../profile/use-get-profile';

export default function useGetMyBookmarkedPosts(page?: number, size?: number) {
  const { data: profileExists, isSuccess } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.myBookmarkedPosts],
    queryFn: () => postApi.getMyBookmarkedPosts(page, size),
    enabled: isSuccess && profileExists.exists === true,
  });
}
