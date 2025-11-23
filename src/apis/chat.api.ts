import { authApi } from '@/apis/fetcher/api';
import type {
  CreateChatRoomResponseType,
  GetChatHistoryResponseType,
  GetChatListResponseType,
} from '@/types/chat.type';

const chatApi = {
  /** 채팅방 개설 또는 기존 roomId 조회 */
  createChatRoom: (postId: bigint) => {
    return authApi.post<CreateChatRoomResponseType>(`/api/chat/room/create`, {
      postId: postId.toString(),
    });
  },

  /** 내 채팅방 목록 조회 */
  getChatList: (filter: 'ALL' | 'UNREAD') => {
    return authApi.get<GetChatListResponseType>(
      `/api/chat/my/rooms?filter=${filter}`,
    );
  },

  /** 채팅방 히스토리 조회 */
  getChatHistory: (roomId: string) => {
    return authApi.get<GetChatHistoryResponseType>(
      `/api/chat/rooms/${roomId}/history`,
    );
  },

  /** 메시지 읽음 처리 */
  markChatAsRead: (roomId: string) => {
    return authApi.post<{ readCount: number }>(
      `/api/chat/rooms/${roomId}/read`,
    );
  },

  /** 채팅방 나가기 */
  leaveChatRoom: (roomId: string) => {
    return authApi.delete(`/api/chat/rooms/${roomId}/leave`);
  },
};

export default chatApi;
