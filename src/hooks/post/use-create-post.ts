import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import type { PostCreateFormData } from '@/schemas/post.schema';
import { clientApis } from '@/services/client.api';

export default function useCreatePost() {
  return useMutation({
    mutationFn: (form: PostCreateFormData) => clientApis.post.createPost(form),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.posts],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.myPosts],
      });
    },
    onError: (error) => {
      console.error('모집글 생성 실패:', error);
    },
  });
}
