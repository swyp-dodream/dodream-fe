import { useMutation, useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import { useGetProfileExists } from '../profile/use-get-profile';

/** 지원 */
export function useApply() {
  return useMutation({
    mutationFn: ({
      postId,
      roleId,
      message = '',
    }: {
      postId: bigint;
      roleId: number;
      message?: string;
    }) => postApi.apply(postId, { roleId, message }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.auth,
          QUERY_KEY.canApply,
          variables.postId.toString(),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.auth,
          QUERY_KEY.postDetail,
          variables.postId.toString(),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.myAppliedPosts],
      });
    },
  });
}

/** 지원 가능 여부 판단 */
export function useGetApplyAvailable(postId: bigint) {
  const { data: profileExists } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.canApply, postId.toString()],
    queryFn: () => postApi.getApplyAvailable(postId),
    enabled: profileExists?.exists === true, // 프로필 있을 때만 판단
    staleTime: 0,
    gcTime: 1 * 60 * 1000,
  });
}
