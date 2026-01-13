import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';

export default function useGetMyNotifications() {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.notifications],
    queryFn: clientApis.notification.getNotifications,
  });
}
