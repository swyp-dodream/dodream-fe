'use client';

import ApplyButton from '@/components/features/post/post-card/buttons/apply-button';
import ApplyCancelButton from '@/components/features/post/post-card/buttons/apply-cancel-button';
import ChatButton from '@/components/features/post/post-card/buttons/chat-button';
import { useGetApplyAvailable } from '@/hooks/post/use-apply';
import { useGetPostDetail } from '@/hooks/post/use-get-posts';
import { useGetProfileExists } from '@/hooks/profile/use-get-profile';
import { formatDeadlineAt } from '@/utils/date.util';

interface PostDetailButtonsProps {
  postId: bigint;
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

  if (!postData) return null;

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
          <ChatButton postId={postData.id} />
          {/* TODO: 매칭된 경우 매칭 취소 버튼으로 변경 */}
          {profileExists?.exists &&
          !isApplyAvailable?.canApply &&
          postData.applicationId ? (
            <ApplyCancelButton
              postId={postId}
              applicationId={BigInt(postData.applicationId)}
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
