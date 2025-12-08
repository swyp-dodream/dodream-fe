import type {
  CreateChatRoomResponseType,
  GetChatHistoryResponseType,
  GetChatListResponseType,
} from '@/types/chat.type';
import { api } from './fetcher/api';

const chatApi = {
  /** 채팅방 개설 또는 기존 roomId 조회 */
  createChatRoom: (postId: bigint) => {
    return api.post<CreateChatRoomResponseType>(`/api/chat/room/create`, {
      postId: postId.toString(),
    });
  },

  /** 내 채팅방 목록 조회 */
  getChatList: (filter: 'ALL' | 'UNREAD') => {
    return api.get<GetChatListResponseType>(
      `/api/chat/my/rooms?filter=${filter}`,
    );
  },

  /** 채팅방 히스토리 조회 */
  getChatHistory: (roomId: string) => {
    return api.get<GetChatHistoryResponseType>(
      `/api/chat/rooms/${roomId}/history`,
    );
  },

  /** 메시지 읽음 처리 */
  markChatAsRead: (roomId: string) => {
    return api.post<{ readCount: number }>(`/api/chat/rooms/${roomId}/read`);
  },

  /** 채팅방 나가기 */
  leaveChatRoom: (roomId: string) => {
    return api.delete(`/api/chat/rooms/${roomId}/leave`);
  },
};

export default chatApi;
