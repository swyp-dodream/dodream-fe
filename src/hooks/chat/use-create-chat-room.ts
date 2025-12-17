import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import chatApi from '@/services/chat.api';
import type { CreateChatRoomResponseType } from '@/types/chat.type';

export default function useCreateChatRoom(
  options?: UseMutationOptions<CreateChatRoomResponseType, Error, bigint>,
) {
  return useMutation<CreateChatRoomResponseType, Error, bigint>({
    mutationFn: (postId: bigint) => chatApi.createChatRoom(postId),
    ...options,
  });
}
