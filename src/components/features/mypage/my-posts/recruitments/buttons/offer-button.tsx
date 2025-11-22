import type { ComponentPropsWithoutRef } from 'react';
import Button from '@/components/commons/buttons/button';
import useOffer from '@/hooks/post/use-offer';
import useToast from '@/hooks/use-toast';

interface OfferButtonProps
  extends Omit<
    ComponentPropsWithoutRef<typeof Button>,
    'onClick' | 'children'
  > {
  postId: bigint;
  userId: bigint;
}

/** 제안하기 버튼 */
export default function OfferButton({
  postId,
  userId,
  ...props
}: OfferButtonProps) {
  const { mutate: offer } = useOffer();
  const toast = useToast();

  const handleOffer = () => {
    offer(
      { postId, userId },
      {
        onSuccess: () => {
          toast({ title: '제안을 완료했습니다' });
        },
        onError: () => {
          toast({
            title: '제안을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.',
          });
        },
      },
    );
  };

  return (
    <Button onClick={handleOffer} {...props} variant="outline" size="sm">
      제안하기
    </Button>
  );
}
