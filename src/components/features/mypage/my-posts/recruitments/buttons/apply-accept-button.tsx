'use client';

import type { ComponentPropsWithoutRef } from 'react';
import Button from '@/components/commons/buttons/button';
import useToast from '@/hooks/use-toast';

interface ApplyAcceptButtonProps
  extends Omit<
    ComponentPropsWithoutRef<typeof Button>,
    'onClick' | 'children'
  > {
  applicationId: bigint;
  isRecruitCompleted?: boolean;
  isRoleFull?: boolean;
}

export default function ApplyAcceptButton({
  applicationId,
  isRecruitCompleted,
  isRoleFull,
  ...props
}: ApplyAcceptButtonProps) {
  const toast = useToast();

  // 버튼 상태에 따른 라벨
  const getButtonText = () => {
    if (isRecruitCompleted) return '모집 마감';
    if (isRoleFull) return '모집 완료';
    return '지원 수락';
  };

  return (
    <Button
      variant="outline"
      size="xs"
      disabled={isRecruitCompleted || isRoleFull}
      onClick={() =>
        toast({
          // title: '지원 수락이 완료되었습니다',
          title: '준비중입니다.',
        })
      }
      {...props}
    >
      {getButtonText()}
    </Button>
  );
}
