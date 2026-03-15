'use client';

import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import CreateReviewModal from '@/components/features/reviews/create-review-modal';
import useToast from '@/hooks/use-toast';
import { clientApis } from '@/services/client.api';

interface CreateReviewButtonProps {
  postId: bigint;
}

export default function CreateReviewButton({
  postId,
}: CreateReviewButtonProps) {
  const toast = useToast();

  // 리뷰 작성 전일 경우에만 모달 노출
  const handleOpenModal = async () => {
    const reviews = await clientApis.review.getMyReviewsByPost(postId);

    if (reviews?.length > 0) {
      toast({ title: '이미 리뷰를 작성했습니다.' });
    } else {
      overlay.open(({ isOpen, close }) => (
        <CreateReviewModal isOpen={isOpen} onClose={close} postId={postId} />
      ));
    }
  };

  return (
    <Button variant="solid" size="md" onClick={handleOpenModal}>
      후기 남기기
    </Button>
  );
}
