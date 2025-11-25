import { useMutation } from '@tanstack/react-query';
import chatApi from '@/apis/chat.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';

export default function useMarkAsRead() {
  return useMutation({
    mutationFn: (roomId: string) => chatApi.markChatAsRead(roomId),
    onSuccess: (_, roomId) => {
      // 채팅방 리스트에서 해당 방의 unread count를 0으로 반영한다.
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.chatList],
        exact: false,
      });
      // 히스토리 캐시도 갱신한다.
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.chatHistory, roomId],
      });
    },
  });
}
