import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import { clientApis } from '@/services/client.api';

export default function useReadNotifications() {
  return useMutation({
    mutationFn: (id: bigint) => clientApis.notification.readNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.notifications],
      });
    },
  });
}
