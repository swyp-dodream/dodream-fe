'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/commons/buttons/button';
import { useGetProfileExists } from '@/hooks/profile/use-get-profile';
import useToast from '@/hooks/use-toast';

interface ChatButtonProps {
  postId: bigint;
}

export default function ChatButton({ postId }: ChatButtonProps) {
  const router = useRouter();
  const toast = useToast();
  const { data: profileExists } = useGetProfileExists();

  const handleClick = () => {
    if (!profileExists || !profileExists.exists) {
      toast({ title: '로그인이 필요합니다.' });
      return;
    }
    router.push(`/chat/${BigInt(postId)}`);
  };

  return (
    <Button variant="outline" size="md" className="py-4" onClick={handleClick}>
      채팅하기
    </Button>
  );
}
