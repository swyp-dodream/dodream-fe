'use client';

import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import ApplyDetailModal from '@/components/features/mypage/my-posts/recruitments/modals/apply-detail-modal';

interface ApplyDetailButtonProps {
  applicationId: bigint;
}

export default function ApplyDetailButton({
  applicationId,
}: ApplyDetailButtonProps) {
  const handleOpenApplyDetailModal = () => {
    overlay.open(({ isOpen, close }) => (
      <ApplyDetailModal
        isOpen={isOpen}
        onClose={close}
        applicationId={applicationId}
      />
    ));
  };

  return (
    <Button variant="solid" size="md" onClick={handleOpenApplyDetailModal}>
      지원 상세
    </Button>
  );
}
