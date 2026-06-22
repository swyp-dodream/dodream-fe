'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import ChatList from '@/app/(header-only)/chat/_components/chat-list';
import ChatRoom from '@/app/(header-only)/chat/_components/chat-room';
import PostDetail from '@/app/(header-only)/chat/_components/post-detail';
import useChat from '@/hooks/chat/use-chat';
import type { ChatListItemType } from '@/types/chat.type';

export default function ChatPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId') ?? undefined;
  const selectedRoomId = searchParams.get('roomId') ?? undefined;
  const {
    sendMessage,
    messages,
    selectedChat,
    handleSelectChat,
    isMyMessage,
    handleLeaveRoom,
  } = useChat({
    postId,
    selectedRoomId,
  });

  const handleSelectChatFromList = useCallback(
    (chat: ChatListItemType) => {
      handleSelectChat(chat);

      const params = new URLSearchParams(searchParams.toString());
      params.delete('postId');
      params.set('roomId', chat.roomId);
      const queryString = params.toString();

      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [handleSelectChat, pathname, router, searchParams],
  );

  const handleLeave = useCallback(async () => {
    const leaveSuccess = await handleLeaveRoom();

    if (!leaveSuccess) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete('roomId');
    params.delete('postId');

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [handleLeaveRoom, pathname, router, searchParams]);

  return (
    <>
      <ChatList
        onSelectChat={handleSelectChatFromList}
        selectedChat={selectedChat}
      />
      {selectedChat && (
        <ChatRoom
          selectedChat={selectedChat}
          onSendMessage={sendMessage}
          messages={messages}
          isMyMessage={isMyMessage}
          onLeave={handleLeave}
        />
      )}
      {selectedChat && <PostDetail postId={selectedChat.postId} />}
    </>
  );
}
