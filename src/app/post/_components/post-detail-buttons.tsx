'use client';

import Button from '@/components/commons/buttons/button';
import ApplyButton from '@/components/features/post/post-card/buttons/apply-button';
import ApplyCancelButton from '@/components/features/post/post-card/buttons/apply-cancel-button';
import { useGetApplyAvailable } from '@/hooks/post/use-apply';
import { useGetPostDetail } from '@/hooks/post/use-get-posts';
import { useGetProfileExists } from '@/hooks/profile/use-get-profile';
import useToast from '@/hooks/use-toast';
import { formatDeadlineAt } from '@/utils/date.util';

interface PostDetailButtonsProps {
  postId: number;
}

/**
 * 모집글 상세 페이지 우측 상단의 버튼 그룹
 * @param owner - 작성자인지 여부
 * @param deadlineDate - 모집 마감일
 */
export default function PostDetailButtons({ postId }: PostDetailButtonsProps) {
  const { data: postData } = useGetPostDetail(postId);
  const { data: profileExists } = useGetProfileExists();
  const { data: isApplyAvailable } = useGetApplyAvailable(postId);
  const toast = useToast();

  if (!postData) return null;

  const handleChat = () => {
    toast({ title: '준비중입니다.' });
  };

  return (
    <>
      {postData?.owner ? (
        // 작성자인 경우 - 마감일 표시
        <div className="flex items-center justify-center h-[50px] body-lg-medium bg-brand text-text-on-brand p-3 w-full rounded-md">
          마감 {formatDeadlineAt(new Date(postData.deadlineDate))}
        </div>
      ) : (
        // 작성자가 아닌 경우 - 채팅/지원 버튼
        <div className="flex gap-4 h-[50px] body-lg-medium">
          <Button onClick={handleChat} variant="outline" size="md">
            채팅하기
          </Button>
          {profileExists?.exists && !isApplyAvailable?.canApply ? (
            <ApplyCancelButton
              postId={postId}
              ownerNickname={postData.ownerNickname}
              variant="brand"
              size="md"
            />
          ) : (
            <ApplyButton postId={postId} variant="brand" size="md" />
          )}
        </div>
      )}
    </>
  );
}
