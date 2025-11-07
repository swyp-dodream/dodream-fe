import { useMutation, useQueryClient } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

export default function useCancelOfferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (suggestionId: number) => postApi.cancelOffer(suggestionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.offers] });
    },
  });
}
