'use client';

import { Client } from '@stomp/stompjs';
import { useCallback, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { QUERY_KEY } from '@/constants/query-key.constant';
import useMarkAsRead from '@/hooks/chat/use-mark-as-read';
import { queryClient } from '@/lib/query-client';
import type {
  ChatListItemType,
  ChatSubscribeMessageType,
} from '@/types/chat.type';

interface UseChatSocketParams {
  postId?: string;
  selectedChat: ChatListItemType | null;
  chatList?: ChatListItemType[];
  setSelectedChat: React.Dispatch<
    React.SetStateAction<ChatListItemType | null>
  >;
  setRoomId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function useChatSocket({
  postId,
  selectedChat,
  chatList,
  setSelectedChat,
  setRoomId,
}: UseChatSocketParams) {
  const stompClientRef = useRef<Client | null>(null);
  const selectedChatRef = useRef<ChatListItemType | null>(null);
  const chatListRef = useRef<ChatListItemType[] | undefined>(undefined);
  const { mutate: markChatAsRead } = useMarkAsRead();

  // 선택된 채팅방 최신 상태를 ref로 동기화 (렌더마다 실행)
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // 최신 채팅방 목록 ref 저장하기.
  useEffect(() => {
    chatListRef.current = chatList;
  }, [chatList]);

  /** 연결하는 함수 */
  const connectWebSocket = useCallback(() => {
    // 이미 연결되어있으면 연결하지 않는다.
    if (stompClientRef.current?.connected) {
      return;
    }

    const socketUrl = `${process.env.NEXT_PUBLIC_API_URL ?? ''}/connect`;
    const socket = new SockJS(socketUrl);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        const currentChat = selectedChatRef.current;

        // 만약 선택한 채팅방이 없으면 sub 하지 않는다.
        if (!currentChat?.topicId) {
          return;
        }

        // 선택한 채팅방이 있다면, sub 한다.
        client.subscribe(currentChat.topicId, (message) => {
          const res = JSON.parse(message.body);
          queryClient.setQueryData<ChatSubscribeMessageType[]>(
            [QUERY_KEY.auth, QUERY_KEY.chatHistory, res.roomId],
            (old) => {
              if (!old) return [res];
              // 중복 데이터면 추가하지 않는다.
              if (old.some((msg) => msg.id === res.id)) return old;
              return [...old, res];
            },
          );

          if (!currentChat.roomId) {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY.auth, QUERY_KEY.chatList, 'ALL'],
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY.auth, QUERY_KEY.chatList, 'UNREAD'],
            });

            setSelectedChat((prev) => {
              const matched = chatListRef.current?.find(
                (chat) => chat.roomId === res.roomId,
              );
              if (matched) return matched;
              if (!prev) return prev;

              return {
                ...prev,
                roomId: res.roomId,
              };
            });

            setRoomId(res.roomId);
          }

          markChatAsRead(res.roomId);
        });
      },
    });

    client.activate();
    stompClientRef.current = client;
  }, [markChatAsRead, setSelectedChat, setRoomId]);

  /** 연결 끊는 함수 */
  const disconnect = useCallback(() => {
    stompClientRef.current?.deactivate();
    stompClientRef.current = null;
  }, []);

  /** 메시지 보내는 함수 */
  const sendMessage = (message: string) => {
    if (!stompClientRef.current?.connected || message.trim().length === 0) {
      return;
    }

    const isFirst = !selectedChat?.roomId;
    const payload = {
      body: message,
      messageType: 'TALK',
      roomId: selectedChat?.roomId ?? null,
      postId: isFirst ? postId : null,
      receiverId: isFirst ? selectedChat?.leaderId : null,
    };

    stompClientRef.current.publish({
      destination: '/publish/chat/message',
      body: JSON.stringify(payload),
    });

    if (isFirst) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.chatList, 'ALL'],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.chatList, 'UNREAD'],
      });
    }
  };

  // 페이지를 벗어날시 연결된 소켓을 정리한다.
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  // 선택한 채팅의 topicId로 소켓을 연결한다.
  useEffect(() => {
    if (!selectedChat?.topicId) {
      return;
    }

    disconnect();
    connectWebSocket();
  }, [selectedChat?.topicId, connectWebSocket, disconnect]);

  return { disconnect, connectWebSocket, sendMessage };
}
