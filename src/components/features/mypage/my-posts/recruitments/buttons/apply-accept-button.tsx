'use client';

import Button from '@/components/commons/buttons/button';
import useToast from '@/hooks/use-toast';

export default function ApplyAcceptButton() {
  const toast = useToast();

  return (
    <Button
      variant="outline"
      size="xs"
      onClick={() =>
        toast({
          title: '지원 수락이 완료되었습니다',
        })
      }
    >
      지원 수락
    </Button>
  );
}
