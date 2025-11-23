'use client';

import { use, useEffect } from 'react';
import ChatList from '@/app/chat/_components/chat-list';
import ChatRoom from '@/app/chat/_components/chat-room';
import useChat from '@/hooks/chat/use-chat';
import useCreateChatRoom from '@/hooks/chat/use-create-chat-room';

export default function ChatPage({
  params,
}: {
  params: Promise<{ postId?: string[] }>;
}) {
  const { postId } = use(params);
  const postIdValue = postId?.[0];
  const { sendMessage, messages, selectedChat, setSelectedChat, isMyMessage } =
    useChat({
      postId: postIdValue,
    });
  const { mutateAsync: createRoom } = useCreateChatRoom({
    onSuccess: (res) => {
      setSelectedChat({
        ...res,
        roomName: '',
        unReadCount: 0,
        lastMessage: '',
        lastMessageAt: new Date(),
      });
    },
  });

  useEffect(() => {
    if (!postIdValue) {
      return;
    }

    createRoom(BigInt(postIdValue));
  }, [postIdValue, createRoom]);

  return (
    <>
      <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
      <ChatRoom
        onSendMessage={sendMessage}
        messages={messages}
        isMyMessage={isMyMessage}
      />
    </>
  );
}
