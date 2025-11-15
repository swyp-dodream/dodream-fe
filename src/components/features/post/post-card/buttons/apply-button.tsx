'use client';

import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import ApplyModal from '@/components/features/mypage/participations/modals/apply-modal';

export default function ApplyButton() {
  const handleOpenApplyModal = () => {
    overlay.open(({ isOpen, close }) => (
      // TODO: postId 수정
      <ApplyModal postId={1} isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <Button variant="solid" size="md" onClick={handleOpenApplyModal}>
      지원하기
    </Button>
  );
}
