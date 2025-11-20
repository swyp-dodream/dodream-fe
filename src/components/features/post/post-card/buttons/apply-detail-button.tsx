'use client';

import { overlay } from 'overlay-kit';
import type { ComponentPropsWithoutRef } from 'react';
import Button from '@/components/commons/buttons/button';
import ApplyDetailModal from '@/components/features/mypage/my-posts/recruitments/modals/apply-detail-modal';

interface ApplyDetailButtonProps
  extends Omit<
    ComponentPropsWithoutRef<typeof Button>,
    'onClick' | 'children'
  > {
  applicationId: bigint;
  postId: bigint;
  applicationType?: 'my' | 'received';
}

export default function ApplyDetailButton({
  applicationId,
  postId,
  applicationType = 'my',
  ...props
}: ApplyDetailButtonProps) {
  const handleOpenApplyDetailModal = () => {
    overlay.open(({ isOpen, close }) => (
      <ApplyDetailModal
        isOpen={isOpen}
        onClose={close}
        postId={BigInt(postId)}
        applicationId={BigInt(applicationId)}
        type={applicationType}
      />
    ));
  };

  return (
    <Button {...props} onClick={handleOpenApplyDetailModal}>
      지원 상세
    </Button>
  );
}
