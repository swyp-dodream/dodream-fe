'use client';

import { useCallback } from 'react';
import useChatRoomManager from '@/hooks/chat/use-chat-room-manager';
import useChatSocket from '@/hooks/chat/use-chat-socket';
import useGetChatHistory from '@/hooks/chat/use-get-chat-history';
import useGetChatList from '@/hooks/chat/use-get-chat-list';
import useLeaveChatRoom from '@/hooks/chat/use-leave-chat-room';
import useMarkAsRead from '@/hooks/chat/use-mark-as-read';
import useToast from '@/hooks/use-toast';
import type { ChatListItemType } from '@/types/chat.type';

interface UseChatParams {
  postId?: string;
}

export default function useChat({ postId }: UseChatParams) {
  const toast = useToast();
  const { data: chatList } = useGetChatList('ALL');

  const { roomId, setRoomId, selectedChat, setSelectedChat } =
    useChatRoomManager({
      postId,
      chatList,
    });

  const { data: chatHistory } = useGetChatHistory(selectedChat?.roomId);
  const { mutate: markChatAsRead } = useMarkAsRead();
  const { mutateAsync: leaveChatRoom } = useLeaveChatRoom();

  const { connectWebSocket, disconnect, sendMessage } = useChatSocket({
    postId,
    selectedChat,
    chatList,
    setSelectedChat,
    setRoomId,
  });

  /** 채팅방을 선택하는 함수 — 선택과 동시에 읽음 처리 */
  const handleSelectChat = useCallback(
    (chat: ChatListItemType) => {
      setSelectedChat(chat);
      if (chat.roomId) {
        markChatAsRead(chat.roomId);
      }
    },
    [markChatAsRead, setSelectedChat],
  );

  /** 내 ID를 얻는 함수 */
  const getMyId = useCallback(() => {
    return selectedChat?.myRole === 'MEMBER'
      ? selectedChat.memberId
      : selectedChat?.leaderId;
  }, [selectedChat]);

  /** 메시지가 내가 작성한 메시지인지 판별하는 함수 */
  const isMyMessage = useCallback(
    (id: string) => {
      return getMyId() === id;
    },
    [getMyId],
  );

  /** 채팅방 나가는 함수 */
  const handleLeaveRoom = useCallback(async () => {
    if (!selectedChat?.roomId) return;
    try {
      disconnect();
      await leaveChatRoom(selectedChat.roomId);
      toast({ title: '채팅방을 나왔습니다' });
      setSelectedChat(null);
      setRoomId(null);
    } catch {
      toast({
        title: '채팅방에서 나오지 못했습니다. 잠시 후 다시 시도해 주세요.',
      });
    }
  }, [
    leaveChatRoom,
    selectedChat?.roomId,
    toast,
    disconnect,
    setSelectedChat,
    setRoomId,
  ]);

  // Tanstack Query가 관리하는 chatHistory 캐시가 전체 메시지가 된다.
  const messages = chatHistory ?? [];

  return {
    roomId,
    disconnect,
    connectWebSocket,
    sendMessage,
    messages,
    selectedChat,
    setSelectedChat,
    handleSelectChat,
    getMyId,
    isMyMessage,
    setRoomId,
    handleLeaveRoom,
  };
}
