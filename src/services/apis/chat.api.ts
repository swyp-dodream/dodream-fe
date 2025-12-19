import type {
  CreateChatRoomResponseType,
  GetChatHistoryResponseType,
  GetChatListResponseType,
} from '@/types/chat.type';
import type { createApiMethods } from '../fetcher/create-api';

export function createChatApi(apiClient: ReturnType<typeof createApiMethods>) {
  return {
    /** 채팅방 개설 또는 기존 roomId 조회 */
    createChatRoom: (postId: bigint) =>
      apiClient.post<CreateChatRoomResponseType>('/api/chat/room/create', {
        postId: postId.toString(),
      }),

    /** 내 채팅방 목록 조회 */
    getChatList: (filter: 'ALL' | 'UNREAD') =>
      apiClient.get<GetChatListResponseType>(
        `/api/chat/my/rooms?filter=${filter}`,
      ),

    /** 채팅방 히스토리 조회 */
    getChatHistory: (roomId: string) =>
      apiClient.get<GetChatHistoryResponseType>(
        `/api/chat/rooms/${roomId}/history`,
      ),

    /** 메시지 읽음 처리 */
    markChatAsRead: (roomId: string) =>
      apiClient.post<{ readCount: number }>(`/api/chat/rooms/${roomId}/read`),

    /** 채팅방 나가기 */
    leaveChatRoom: (roomId: string) =>
      apiClient.delete(`/api/chat/rooms/${roomId}/leave`),
  };
}
