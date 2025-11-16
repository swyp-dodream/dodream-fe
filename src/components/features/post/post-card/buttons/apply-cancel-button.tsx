'use client';

import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import ApplyCancelModal from '@/components/features/mypage/participations/modals/apply-cancel-modal';
import { useGetProfileExists } from '@/hooks/profile/use-get-profile';
import useToast from '@/hooks/use-toast';

interface ApplyCancelButtonProps {
  postId: bigint;
  applicationId: bigint;
  ownerNickname: string;
  variant?: 'default' | 'brand' | 'solid' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * 지원 취소 버튼
 * @param postId - 모집글 id
 * @param ownerNickname - 모집글 작성자 닉네임
 */
export default function ApplyCancelButton({
  postId,
  applicationId,
  ownerNickname,
  variant,
  size,
  className = '',
}: ApplyCancelButtonProps) {
  const { data: profileExists } = useGetProfileExists();
  const toast = useToast();

  const handleOpenApplyCancelModal = () => {
    if (!profileExists?.exists) {
      toast({ title: '로그인이 필요합니다' });
      return;
    }

    overlay.open(({ isOpen, close }) => (
      <ApplyCancelModal
        postId={postId}
        applicationId={BigInt(applicationId)}
        isOpen={isOpen}
        onClose={close}
        nickname={ownerNickname}
      />
    ));
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleOpenApplyCancelModal}
    >
      지원 취소
    </Button>
  );
}
