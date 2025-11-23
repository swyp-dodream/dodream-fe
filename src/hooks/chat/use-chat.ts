'use client';

import { Client } from '@stomp/stompjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import type {
  ChatListItemType,
  ChatSubscribeMessageType,
} from '@/types/chat.type';
import { tokenStorage } from '@/utils/auth.util';

interface UseChatParams {
  postId?: string;
  // onMessage?: (message: IMessage) => void;
}

export default function useChat({ postId }: UseChatParams) {
  const [messages, setMessages] = useState<ChatSubscribeMessageType[]>([]);
  const [roomId, _setRoomId] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatListItemType | null>(
    null,
  );
  const stompClientRef = useRef<Client | null>(null);

  /** 연결하는 함수 */
  const connectWebSoket = useCallback(() => {
    // 이미 연결되어있으면 연결하지 않는다.
    if (stompClientRef.current?.connected) {
      return;
    }

    const socketUrl = `${process.env.NEXT_PUBLIC_API_URL}/connect`;
    const socket = new SockJS(socketUrl ?? '');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${tokenStorage.getToken()}` },
      reconnectDelay: 5000,
      onConnect: () => {
        // 만약 선택한 채팅방이 없으면 sub 하지 않는다.
        if (!selectedChat?.topicId) {
          return;
        }

        // 선택한 채팅방이 있다면, sub 한다.
        client.subscribe(selectedChat?.topicId, (message) => {
          const res = JSON.parse(message.body);
          console.log(res);
          setMessages((prev) => [...prev, res]);
        });
      },
    });

    client.activate();
    stompClientRef.current = client;
  }, [selectedChat]);

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
      headers: { Authorization: `Bearer ${tokenStorage.getToken()}` },
    });

    if (isFirst) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.chatList, 'ALL'],
      });
    }
  };

  const getMyId = () => {
    return selectedChat?.myRole === 'MEMBER'
      ? selectedChat.memberId
      : selectedChat?.leaderId;
  };

  const isMyMessage = (id: string) => {
    return getMyId() === id;
  };

  // clean up
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  useEffect(() => {
    if (!selectedChat?.topicId) {
      return;
    }

    connectWebSoket();
  }, [connectWebSoket, selectedChat]);

  useEffect(() => {
    if (!selectedChat?.topicId) {
      return;
    }

    disconnect();
    connectWebSoket();
  }, [selectedChat, connectWebSoket, disconnect]);

  return {
    roomId,
    disconnect,
    connectWebSoket,
    sendMessage,
    messages,
    selectedChat,
    setSelectedChat,
    getMyId,
    isMyMessage,
  };
}
