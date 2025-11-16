import { useMutation } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';

/** 지원 취소 */
export default function useCancelApply() {
  return useMutation({
    mutationFn: (applicationId: number) => postApi.cancelApply(applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.canApply, '115538170476498944'],
      });
    },
  });
}
