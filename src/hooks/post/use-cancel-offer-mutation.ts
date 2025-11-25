'use client';

import { useMutation } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';

export default function useCancelOfferMutation(postId: bigint) {
  return useMutation({
    mutationFn: (suggestionId: bigint) => postApi.cancelOffer(suggestionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.myPostOffers, postId.toString()],
      });
    },
  });
}
