import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import { clientApis } from '@/services/client.api';

/** 매칭 (지원 수락) */
export default function useMatch() {
  return useMutation({
    mutationFn: ({
      postId,
      applicationId,
    }: {
      postId: bigint;
      applicationId: bigint;
    }) => clientApis.my.match(postId, applicationId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.auth,
          QUERY_KEY.myPostApplications,
          BigInt(variables.postId).toString(),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.postMembers, BigInt(variables.postId).toString()],
      });
    },
  });
}
