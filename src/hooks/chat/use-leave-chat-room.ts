import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import chatApi from '@/services/apis/chat.api';

type LeaveChatRoomOptions = UseMutationOptions<unknown, Error, string, unknown>;

export default function useLeaveChatRoom(options?: LeaveChatRoomOptions) {
  return useMutation<unknown, Error, string, unknown>({
    mutationFn: (roomId: string) => chatApi.leaveChatRoom(roomId),
    ...options,
    onSuccess: (data, roomId, context, mutation) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.chatList],
        exact: false,
      });
      queryClient.removeQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.chatHistory, roomId],
      });

      options?.onSuccess?.(data, roomId, context, mutation);
    },
  });
}
