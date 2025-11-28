import { useMutation } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';

export default function useDeletePost(postId: bigint) {
  return useMutation({
    mutationFn: () => postApi.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.posts],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.myPosts],
      });
      queryClient.removeQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.postDetail, postId.toString()],
      });
    },
  });
}
