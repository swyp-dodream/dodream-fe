import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import ViewReviewModal from '@/components/features/reviews/view-review-modal';

interface ViewReviewButtonProps {
  disabled: boolean;
  postId: bigint;
}

export default function ViewReviewButton({
  disabled,
  postId,
}: ViewReviewButtonProps) {
  const handleOpenModal = () => {
    overlay.open(({ isOpen, close }) => (
      <ViewReviewModal isOpen={isOpen} onClose={close} postId={postId} />
    ));
  };

  return (
    <Button
      disabled={disabled}
      variant="outline"
      size="md"
      onClick={handleOpenModal}
    >
      후기 확인
    </Button>
  );
}
