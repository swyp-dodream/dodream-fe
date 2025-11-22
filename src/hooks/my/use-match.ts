import { useMutation } from '@tanstack/react-query';
import myApi from '@/apis/my.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';

/** 매칭 (지원 수락) */
export default function useMatch() {
  return useMutation({
    mutationFn: ({
      postId,
      applicationId,
    }: {
      postId: bigint;
      applicationId: bigint;
    }) => myApi.match(postId, applicationId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.auth,
          QUERY_KEY.myPostApplications,
          variables.postId.toString(),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.postMembers, variables.postId.toString()],
      });
    },
  });
}
