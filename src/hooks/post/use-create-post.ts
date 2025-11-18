import { useMutation } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import type { PostCreateFormData } from '@/schemas/post.schema';

export default function useCreatePost() {
  return useMutation({
    mutationFn: (form: PostCreateFormData) => postApi.createPost(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.posts] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.myPosts],
      });
    },
    onError: (error) => {
      console.error('모집글 생성 실패:', error);
    },
  });
}
