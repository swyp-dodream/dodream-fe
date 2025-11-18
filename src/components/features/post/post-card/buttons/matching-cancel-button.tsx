'use client';

import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import MatchingCancelModal from '@/components/features/mypage/my-posts/recruitments/modals/matching-cancel-modal';

interface MatchingCancelButtonProps {
  nickname: string;
  postId: bigint;
  matchingId: bigint;
}

export default function MathcingCancelButton({
  nickname,
  postId,
  matchingId,
}: MatchingCancelButtonProps) {
  const handleOpenMatchingCancelModal = () => {
    overlay.open(({ isOpen, close }) => (
      <MatchingCancelModal
        isOpen={isOpen}
        onClose={close}
        nickname={nickname}
        postId={postId}
        matchingId={matchingId}
      />
    ));
  };

  return (
    <Button variant="outline" size="md" onClick={handleOpenMatchingCancelModal}>
      매칭 취소
    </Button>
  );
}
