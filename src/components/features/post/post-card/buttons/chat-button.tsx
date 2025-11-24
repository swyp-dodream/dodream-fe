'use client';

import Link from 'next/link';
import Button from '@/components/commons/buttons/button';

interface ChatButtonProps {
  postId: bigint;
}

export default function ChatButton({ postId }: ChatButtonProps) {
  return (
    <Link href={`/chat/${BigInt(postId)}`}>
      <Button variant="outline" size="md" className="py-4">
        채팅하기
      </Button>
    </Link>
  );
}
