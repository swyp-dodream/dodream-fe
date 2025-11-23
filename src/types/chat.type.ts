export type ChatMessageType = 'TALK' | 'LEAVE';

/** 채팅 히스토리 타입 */
export type ChatHistoryType = {
  id: string;
  roomId: string;
  postId: string;
  senderId: string;
  receiverId: string;
  body: string;
  createdAt: Date;
  messageType: ChatMessageType;
};

/** 채팅방 개설 또는 기존 roomId 조회 응답 타입 */
export type CreateChatRoomResponseType = {
  roomId: string;
  topicId: string;
  leaderId: string;
  memberId: string;
  myRole: string;
  history: ChatHistoryType[];
};

/** 채팅 목록 아이템 타입 */
export type ChatListItemType = {
  roomId: string;
  roomName: string;
  unReadCount: number;
  topicId: string;
  leaderId: string;
  memberId: string;
  myRole: string;
  lastMessage: string;
  lastMessageAt: Date;
};

/** 내 채팅방 목록 조회 응답 타입 */
export type GetChatListResponseType = ChatListItemType[];

/** 구독한 채팅방 메시지 응답 타입 */
export type ChatSubscribeMessageType = {
  body: string;
  createdAt: string;
  id: string;
  messageType: string;
  postId: string;
  receiverId: string;
  roomId: string;
  senderId: string;
};

/** 채팅방에서 사용할 메시지 타입 */
export type GroupedChatType = ChatSubscribeMessageType & {
  isMyMessage: boolean;
};

/** 채팅방 히스토리 조회 응답 타입 */
export type GetChatHistoryResponseType = ChatSubscribeMessageType[];
