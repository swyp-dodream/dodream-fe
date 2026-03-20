'use client';

import { useEffect, useRef, useState } from 'react';
import useCreateChatRoom from '@/hooks/chat/use-create-chat-room';
import useToast from '@/hooks/use-toast';
import type { ChatListItemType } from '@/types/chat.type';
import type { ErrorType } from '@/types/error.type';

interface UseChatRoomManagerParams {
  postId?: string;
  chatList?: ChatListItemType[];
}

export default function useChatRoomManager({
  postId,
  chatList,
}: UseChatRoomManagerParams) {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatListItemType | null>(
    null,
  );
  const toast = useToast();
  const { mutateAsync: createChatRoom } = useCreateChatRoom();
  const chatListRef = useRef<ChatListItemType[] | undefined>(undefined);
  const hasCreatedRoomRef = useRef(false);

  // 최신 채팅방 목록 ref 저장하기.
  useEffect(() => {
    chatListRef.current = chatList;
  }, [chatList]);

  // 모집글 상세에서 채팅하기 버튼을 눌러서 진입했을 경우 채팅방을 만든다.
  useEffect(() => {
    if (!postId || hasCreatedRoomRef.current) {
      return;
    }
    hasCreatedRoomRef.current = true;

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
          leaderProfileImageCode: created.leaderProfileImageCode,
          memberProfileImageCode: created.memberProfileImageCode,
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
        hasCreatedRoomRef.current = false;
        const err = error as ErrorType;
        if (err.code === 403) {
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
    setRoomId,
    selectedChat,
    setSelectedChat,
  };
}
