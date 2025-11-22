'use client';

import { overlay } from 'overlay-kit';
import type { ComponentPropsWithoutRef } from 'react';
import Button from '@/components/commons/buttons/button';
import MatchingCancelModal from '@/components/features/mypage/my-posts/recruitments/modals/matching-cancel-modal';

interface MatchingCancelButtonProps
  extends Omit<
    ComponentPropsWithoutRef<typeof Button>,
    'onClick' | 'children'
  > {
  nickname: string;
  postId: bigint;
  matchingId: bigint;
  matchedAt: Date;
}

export default function MathcingCancelButton({
  nickname,
  postId,
  matchingId,
  matchedAt,
  ...props
}: MatchingCancelButtonProps) {
  const handleOpenMatchingCancelModal = () => {
    overlay.open(({ isOpen, close }) => (
      <MatchingCancelModal
        isOpen={isOpen}
        onClose={close}
        nickname={nickname}
        postId={postId}
        matchingId={matchingId}
        matchedAt={matchedAt}
      />
    ));
  };

  return (
    <Button {...props} onClick={handleOpenMatchingCancelModal}>
      매칭 취소
    </Button>
  );
}
