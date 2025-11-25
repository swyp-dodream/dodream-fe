'use client';

import { Client } from '@stomp/stompjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { QUERY_KEY } from '@/constants/query-key.constant';
import useCreateChatRoom from '@/hooks/chat/use-create-chat-room';
import useGetChatHistory from '@/hooks/chat/use-get-chat-history';
import useGetChatList from '@/hooks/chat/use-get-chat-list';
import useLeaveChatRoom from '@/hooks/chat/use-leave-chat-room';
import useMarkAsRead from '@/hooks/chat/use-mark-as-read';
import useToast from '@/hooks/use-toast';
import { queryClient } from '@/lib/query-client';
import type {
  ChatListItemType,
  ChatSubscribeMessageType,
} from '@/types/chat.type';
import { tokenStorage } from '@/utils/auth.util';

interface UseChatParams {
  postId?: string;
}

export default function useChat({ postId }: UseChatParams) {
  const [messages, setMessages] = useState<ChatSubscribeMessageType[]>([]);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatListItemType | null>(
    null,
  );
  const toast = useToast();
  const { data: chatList } = useGetChatList('ALL');
  const { data: chatHistory } = useGetChatHistory(selectedChat?.roomId);
  const { mutate: markChatAsRead } = useMarkAsRead();
  const { mutateAsync: createChatRoom } = useCreateChatRoom();
  const { mutateAsync: leaveChatRoom } = useLeaveChatRoom();
  const stompClientRef = useRef<Client | null>(null);
  const chatListRef = useRef<ChatListItemType[] | undefined>(undefined);

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
          setMessages((prev) => [...prev, res]);

          if (!selectedChat.roomId) {
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
  }, [selectedChat, markChatAsRead]);

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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.auth, QUERY_KEY.chatList, 'UNREAD'],
      });
    }
  };

  /** 채팅방 나가는 함수 */
  const handleLeaveRoom = useCallback(async () => {
    if (!selectedChat?.roomId) return;
    try {
      disconnect();
      await leaveChatRoom(selectedChat.roomId);
      toast({ title: '채팅방을 나왔습니다' });
      setSelectedChat(null);
      setMessages([]);
      setRoomId(null);
    } catch {
      toast({
        title: '채팅방에서 나오지 못했습니다. 잠시 후 다시 시도해 주세요.',
      });
    }
  }, [leaveChatRoom, selectedChat?.roomId, toast, disconnect]);

  /** 내 ID를 얻는 함수 */
  const getMyId = () => {
    return selectedChat?.myRole === 'MEMBER'
      ? selectedChat.memberId
      : selectedChat?.leaderId;
  };

  /** 메시지가 내가 작성한 메시지인지 판별하는 함수 */
  const isMyMessage = (id: string) => {
    return getMyId() === id;
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
    connectWebSoket();
  }, [selectedChat, connectWebSoket, disconnect]);

  // 채팅 히스토리가 있다면, 메시지 상태에 넣는다.
  useEffect(() => {
    if (!chatHistory) {
      return;
    }

    setMessages([...chatHistory]);
  }, [chatHistory]);

  // 채팅방을 선택하면, 읽음 상태로 처리한다.
  useEffect(() => {
    if (!selectedChat?.roomId) {
      return;
    }

    markChatAsRead(selectedChat.roomId);
  }, [markChatAsRead, selectedChat?.roomId]);

  // 최신 채팅방 목록 ref 저장하기.
  useEffect(() => {
    chatListRef.current = chatList;
  }, [chatList]);

  // 모집글 상세에서 채팅하기 버튼을 눌러서 진입했을 경우 채팅방을 만든다.
  useEffect(() => {
    if (!postId) {
      return;
    }

    const createRoom = async () => {
      try {
        const created = await createChatRoom(BigInt(postId));
        const lastHistory = created.history.at(-1);
        const baseChat: ChatListItemType = {
          roomId: created.roomId,
          topicId: created.topicId,
          leaderId: created.leaderId,
          memberId: created.memberId,
          myRole: created.myRole,
          postId: BigInt(postId),
          roomName: '메시지를 보내면 새로운 채팅이 시작됩니다.',
          unReadCount: 0,
          lastMessage: lastHistory?.body ?? '',
          lastMessageAt: new Date(lastHistory?.createdAt ?? Date.now()),
        };

        if (created.roomId) {
          const existingChat = chatListRef.current?.find(
            (chat) => chat.roomId === created.roomId,
          );
          setSelectedChat(existingChat ?? baseChat);
          setRoomId(created.roomId);
          return;
        }

        setSelectedChat(baseChat);
      } catch (error) {
        const err = error as Error;
        if (
          err.message ===
          '서버 내부 오류가 발생했습니다: 이미 나간 채팅방입니다. 재입장할 수 없습니다.'
        ) {
          toast({ title: '이미 나간 채팅방입니다. 재입장할 수 없습니다.' });
        } else {
          toast({
            title: '채팅방을 생성할 수 없습니다. 잠시 후 다시 이용해주세요.',
          });
        }
      }
    };

    createRoom();
  }, [postId, createChatRoom, toast]);

  // 헤더의 채팅 아이콘을 통해 진입했고,
  // 진행했던 채팅이 있을 경우, 가장 최신의 채팅을 선택한다.
  useEffect(() => {
    if (postId || selectedChat || !chatList?.length) {
      return;
    }

    setSelectedChat(chatList[0]);
  }, [postId, selectedChat, chatList]);

  // 모집글 상세에서 채팅하기 버튼을 눌러서 진입했을 경우,
  // 이미 진행했던 채팅이 있을경우, 해당 채팅을 선택한다.
  useEffect(() => {
    if (!selectedChat?.roomId || !chatList?.length) {
      return;
    }

    const matched = chatList.find(
      (chat) => chat.roomId === selectedChat.roomId,
    );

    if (matched && matched !== selectedChat) {
      setSelectedChat(matched);
    }
  }, [chatList, selectedChat]);

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
    setRoomId,
    handleLeaveRoom,
  };
}
