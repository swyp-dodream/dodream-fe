import ChatList from '@/app/chat/_components/chat-list';
import ChatRoom from '@/app/chat/_components/chat-room';

export default async function ChatPage({
  params,
}: {
  params: Promise<{ postId?: string }>;
}) {
  const { postId } = await params;

  return (
    <>
      <ChatList postId={BigInt(postId)} />
      <ChatRoom />
    </>
  );
}
