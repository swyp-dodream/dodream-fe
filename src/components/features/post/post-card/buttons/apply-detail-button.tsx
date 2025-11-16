'use client';

import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import ApplyDetailModal from '@/components/features/mypage/my-posts/recruitments/modals/apply-detail-modal';
import useGetMyApplicationDetail from '@/hooks/my/use-get-my-application-detail';

interface ApplyDetailButtonProps {
  applicationId: bigint;
}

export default function ApplyDetailButton({
  applicationId,
}: ApplyDetailButtonProps) {
  const { data: myApplicationDetail } =
    useGetMyApplicationDetail(applicationId);

  const handleOpenApplyDetailModal = () => {
    overlay.open(({ isOpen, close }) => (
      <ApplyDetailModal
        isOpen={isOpen}
        onClose={close}
        roleName={myApplicationDetail?.roleName ?? ''}
        message={myApplicationDetail?.message ?? ''}
      />
    ));
  };

  return (
    <Button variant="solid" size="md" onClick={handleOpenApplyDetailModal}>
      지원 상세
    </Button>
  );
}
