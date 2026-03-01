import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import ViewReviewModal from '@/components/features/reviews/view-review-modal';

export default function ViewReviewButton() {
  const handleOpenModal = () => {
    overlay.open(({ isOpen, close }) => (
      <ViewReviewModal isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <Button variant="outline" size="md" onClick={handleOpenModal}>
      후기 확인
    </Button>
  );
}
