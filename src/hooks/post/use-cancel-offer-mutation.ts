'use client';

import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import { clientApis } from '@/services/client.api';

export default function useCancelOfferMutation(postId: bigint) {
  return useMutation({
    mutationFn: (suggestionId: bigint) =>
      clientApis.my.cancelOffer(suggestionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.myPostOffers, postId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.auth,
          QUERY_KEY.myPostRecommendedUsers,
          postId.toString(),
        ],
      });
    },
  });
}
