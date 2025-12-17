import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import type { PostUpdateFormData } from '@/schemas/post.schema';
import postApi from '@/services/apis/post.api';

export default function useUpdatePost() {
  return useMutation({
    mutationFn: ({
      postId,
      form,
    }: {
      postId: bigint;
      form: PostUpdateFormData;
    }) => postApi.updatePost(postId, form),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.posts],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.auth,
          QUERY_KEY.postDetail,
          variables.postId.toString(),
        ],
      });
    },
  });
}
