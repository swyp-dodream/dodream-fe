import { useMutation } from '@tanstack/react-query';
import chatApi from '@/apis/chat.api';

export default function useCreateChatRoom() {
  return useMutation({
    mutationFn: (postId: bigint) => chatApi.createChatRoom(postId),
  });
}
