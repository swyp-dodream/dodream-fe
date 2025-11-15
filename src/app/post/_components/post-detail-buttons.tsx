'use client';

import { overlay } from 'overlay-kit';
import Button from '@/components/commons/buttons/button';
import ApplyModal from '@/components/features/mypage/participations/modals/apply-modal';
import { useGetProfileExists } from '@/hooks/auth/use-get-profile';
import { useGetApplyAvailable } from '@/hooks/post/use-apply';
import useToast from '@/hooks/use-toast';
import { formatDeadlineAt } from '@/utils/date.util';

interface PostDetailButtonsProps {
  posId: number;
  roles: {
    role: string;
    headcount: number;
  }[];
  owner: boolean;
  deadlineDate: string;
}

/**
 * 모집글 상세 페이지 우측 상단의 버튼 그룹
 * @param owner - 작성자인지 여부
 * @param deadlineDate - 모집 마감일
 */
export default function PostDetailButtons({
  posId,
  roles,
  owner,
  deadlineDate,
}: PostDetailButtonsProps) {
  const { data: profileExists } = useGetProfileExists();
  const { data: isApplyAvailable } = useGetApplyAvailable(posId);

  const toast = useToast();

  const handleApply = () => {
    // 로그인하지 않았을 경우 disabled가 아닌 토스트 메시지 띄우기
    if (!profileExists?.exists) {
      toast({ title: '로그인이 필요합니다' });
      return;
    }

    overlay.open(({ isOpen, close }) => (
      <ApplyModal
        postId={posId}
        roles={roles.map((role) => role.role)}
        isOpen={isOpen}
        onClose={close}
      />
    ));
  };

  return (
    <>
      {owner ? (
        // 작성자인 경우 - 마감일 표시
        <div className="flex items-center justify-center h-[50px] body-lg-medium bg-brand text-text-on-brand p-3 w-full rounded-md">
          마감 {formatDeadlineAt(new Date(deadlineDate))}
        </div>
      ) : (
        // 작성자가 아닌 경우 - 채팅/지원 버튼
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="md"
            className="body-lg-medium h-[50px]"
          >
            채팅하기
          </Button>
          <Button
            onClick={handleApply}
            variant="brand"
            size="md"
            className="h-[50px]"
            disabled={!isApplyAvailable?.canApply}
          >
            지원하기
          </Button>
        </div>
      )}
    </>
  );
}
