'use client';

import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import ApplyCancelModal from '@/components/features/mypage/participations/modals/apply-cancel-modal';

export default function ApplyCancelButton() {
  const handleOpenApplyCancelModal = () => {
    overlay.open(({ isOpen, close }) => (
      <ApplyCancelModal isOpen={isOpen} onClose={close} nickname="닉네임" />
    ));
  };

  return (
    <Button variant="outline" size="md" onClick={handleOpenApplyCancelModal}>
      지원 취소
    </Button>
  );
}
