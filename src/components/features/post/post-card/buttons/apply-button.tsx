'use client';

import { isPast } from 'date-fns';
import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import ApplyModal from '@/components/features/mypage/participations/modals/apply-modal';
import { useGetPostDetail } from '@/hooks/post/use-get-posts';
import { useGetProfileExists } from '@/hooks/profile/use-get-profile';
import useToast from '@/hooks/use-toast';

interface ApplyButtonProps {
  postId: bigint;
  variant?: 'default' | 'brand' | 'solid' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * 지원하기 버튼
 * @param postId - 지원할 모집글 id
 */
export default function ApplyButton({
  postId,
  variant,
  size,
  className,
  ...props
}: ApplyButtonProps) {
  const { data: profileExists } = useGetProfileExists();
  const { data: postData } = useGetPostDetail(postId);
  const toast = useToast();

  if (!postData) return null;

  /** 지원하기 */
  const handleOpenApplyModal = () => {
    // 로그인하지 않았을 경우 disabled가 아닌 토스트 메시지 띄우기
    if (!profileExists?.exists) {
      toast({ title: '로그인이 필요합니다' });
      return;
    }

    // 데드라인 날짜 이후일 경우 실패 처리
    if (
      isPast(new Date(postData.deadlineDate)) ||
      postData.status === 'COMPLETED'
    ) {
      toast({ title: '마감된 공고입니다.' });
      return;
    }

    overlay.open(({ isOpen, close }) => (
      <ApplyModal
        postId={postId}
        roles={postData.roles.map((role) => role.role)}
        isOpen={isOpen}
        onClose={close}
      />
    ));
  };

  return (
    <Button
      onClick={handleOpenApplyModal}
      variant={variant}
      size={size}
      disabled={postData.status === 'COMPLETED'}
      {...props}
    >
      {postData.status === 'RECRUITING' ? '지원하기' : '모집 마감'}
    </Button>
  );
}
