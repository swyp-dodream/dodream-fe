import Button from '@/components/commons/buttons/button';
import useCancelOfferMutation from '@/hooks/post/use-cancel-offer-mutation';
import useToast from '@/hooks/use-toast';

interface OffercancelButtonProps {
  postId: bigint;
  suggestionId: bigint;
}

export default function OfferCancelButton({
  postId,
  suggestionId,
}: OffercancelButtonProps) {
  const toast = useToast();
  const { mutate: cancelOffer } = useCancelOfferMutation(postId);

  const handleCancelOffer = async () => {
    cancelOffer(suggestionId, {
      onSuccess: () => {
        toast({ title: '제안이 취소되었습니다' });
      },
      onError: () => {
        toast({
          title: '제안을 취소하지 못했습니다. 잠시 후 다시 시도해 주세요.',
        });
      },
    });
  };

  return (
    <Button variant="outline" size="xs" onClick={handleCancelOffer}>
      제안 취소
    </Button>
  );
}
