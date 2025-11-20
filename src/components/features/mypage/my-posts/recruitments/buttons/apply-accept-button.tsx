'use client';

import type { ComponentPropsWithoutRef } from 'react';
import Button from '@/components/commons/buttons/button';
import useMatch from '@/hooks/my/use-match';
import useToast from '@/hooks/use-toast';

interface ApplyAcceptButtonProps
  extends Omit<
    ComponentPropsWithoutRef<typeof Button>,
    'onClick' | 'children'
  > {
  postId: bigint;
  applicationId: bigint;
  isRecruitCompleted?: boolean;
  isRoleFull?: boolean;
}

export default function ApplyAcceptButton({
  postId,
  applicationId,
  isRecruitCompleted,
  isRoleFull,
  ...props
}: ApplyAcceptButtonProps) {
  const toast = useToast();
  const { mutate: acceptApplication } = useMatch();

  // 버튼 상태에 따른 라벨
  const getButtonText = () => {
    if (isRecruitCompleted) return '모집 마감';
    if (isRoleFull) return '모집 완료';
    return '지원 수락';
  };

  /** 지원 수락 */
  const handleAcceptApplication = () => {
    acceptApplication(
      { postId, applicationId },
      {
        onSuccess: () => {
          toast({
            title: '지원 수락이 완료되었습니다',
          });
        },
        onError: () => {
          toast({
            title:
              '지원 수락을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.',
          });
        },
      },
    );
  };

  return (
    <Button
      variant="outline"
      size="xs"
      disabled={isRecruitCompleted || isRoleFull}
      onClick={handleAcceptApplication}
      {...props}
    >
      {getButtonText()}
    </Button>
  );
}
