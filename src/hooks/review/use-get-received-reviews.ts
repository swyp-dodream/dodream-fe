import { useQuery } from '@tanstack/react-query';
import { clientApis } from '@/services/client.api';

export default function useGetReceivedReviews() {
  return useQuery({
    queryKey: [],
    queryFn: () => clientApis.review.getMyReviews(),
  });
}
