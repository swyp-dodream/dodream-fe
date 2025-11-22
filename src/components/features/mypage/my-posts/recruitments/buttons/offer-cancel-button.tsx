import Button from '@/components/commons/buttons/button';
import useCancelOfferMutation from '@/hooks/post/use-cancel-offer-mutation';
import useToast from '@/hooks/use-toast';

interface OffercancelButtonProps {
  suggestionId: bigint;
}

export default function OfferCancelButton({
  suggestionId,
}: OffercancelButtonProps) {
  const toast = useToast();
  const { mutateAsync: cancelOffer } = useCancelOfferMutation();

  const handleCancelOffer = async () => {
    try {
      await cancelOffer(suggestionId);
      toast({ title: '제안이 취소되었습니다' });
    } catch (_error) {
      toast({
        title: '제안을 취소하지 못했습니다. 잠시 후 다시 시도해 주세요.',
      });
    }
  };

  return (
    <Button variant="outline" size="xs" onClick={handleCancelOffer}>
      제안 취소
    </Button>
  );
}
