'use client';

import { use } from 'react';
import ChatList from '@/app/chat/_components/chat-list';
import ChatRoom from '@/app/chat/_components/chat-room';
import PostDetail from '@/app/chat/_components/post-detail';
import useChat from '@/hooks/chat/use-chat';

export default function ChatPage({
  params,
}: {
  params: Promise<{ postId?: string[] }>;
}) {
  const { postId } = use(params);
  const postIdValue = postId?.[0];
  const {
    sendMessage,
    messages,
    selectedChat,
    setSelectedChat,
    isMyMessage,
    handleLeaveRoom,
  } = useChat({
    postId: postIdValue,
  });

  return (
    <>
      <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
      {selectedChat && (
        <ChatRoom
          selectedChat={selectedChat}
          onSendMessage={sendMessage}
          messages={messages}
          isMyMessage={isMyMessage}
          onLeave={handleLeaveRoom}
        />
      )}
      {selectedChat && <PostDetail postId={selectedChat.postId} />}
    </>
  );
}
