'use client';

import Button from '@/components/commons/buttons/button';
import { useGetPostDetail } from '@/hooks/post/use-get-posts';
import { useGetProfileExists } from '@/hooks/profile/use-get-profile';
import useToast from '@/hooks/use-toast';
import { formatDeadlineAt } from '@/utils/date.util';
import PostActionButton from './post-action-button';

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
  const toast = useToast();

  if (!postData) return null;

  const handleChat = () => {
    toast({ title: '준비중입니다.' });
  };

  // 작성자인 경우: 마감일만 표시
  if (postData.owner) {
    return (
      <div className="flex items-center justify-center h-[50px] body-lg-medium bg-brand text-text-on-brand p-3 w-full rounded-md">
        마감 {formatDeadlineAt(new Date(postData.deadlineDate))}
      </div>
    );
  }

  // 작성자가 아닌 경우: 채팅하기 + 액션 버튼
  return (
    <div className="flex gap-4 h-[50px] body-lg-medium">
      <Button onClick={handleChat} variant="outline" size="md">
        채팅하기
      </Button>
      <PostActionButton
        postId={postId}
        postData={postData}
        profileExists={profileExists}
      />
    </div>
  );
}
