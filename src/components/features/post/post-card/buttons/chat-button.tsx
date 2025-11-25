'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/commons/buttons/button';

interface ChatButtonProps {
  postId: bigint;
}

export default function ChatButton({ postId }: ChatButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/chat/${BigInt(postId)}`);
  };

  return (
    <Button variant="outline" size="md" className="py-4" onClick={handleClick}>
      채팅하기
    </Button>
  );
}
