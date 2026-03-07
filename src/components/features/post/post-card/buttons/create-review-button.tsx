'use client';

import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import CreateReviewModal from '@/components/features/reviews/create-review-modal';

export default function CreateReviewButton() {
  const handleOpenModal = () => {
    overlay.open(({ isOpen, close }) => (
      <CreateReviewModal isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <Button variant="solid" size="md" onClick={handleOpenModal}>
      후기 남기기
    </Button>
  );
}
