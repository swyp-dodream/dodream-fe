'use client';

import Button from '@/components/commons/buttons/button';
import useToast from '@/hooks/use-toast';

export default function ChatButton() {
  const toast = useToast();

  const handleClick = () => {
    toast({ title: '준비중입니다' });
  };

  return (
    <Button variant="outline" size="md" onClick={handleClick}>
      채팅하기
    </Button>
  );
}
