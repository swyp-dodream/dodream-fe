import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';

export default function useGetChatHistory(roomId?: string) {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.chatHistory, roomId],
    queryFn: () => {
      if (!roomId) throw new Error('roomId is required');
      return clientApis.chat.getChatHistory(roomId);
    },
    enabled: !!roomId,
  });
}
