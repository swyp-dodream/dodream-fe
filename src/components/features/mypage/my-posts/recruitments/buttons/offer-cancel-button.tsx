import Button from '@/components/commons/buttons/button';

interface OffercancelButtonProps {
  onCancel: () => void;
}

export default function OfferCancelButton({
  onCancel,
}: OffercancelButtonProps) {
  return (
    <Button variant="outline" size="xs" onClick={onCancel}>
      제안 취소
    </Button>
  );
}
