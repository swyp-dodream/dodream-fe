'use client';

import Button from '@/components/commons/buttons/button';
import { useGetPostDetail } from '@/hooks/post/use-get-posts';
import useToast from '@/hooks/use-toast';
import { formatDeadlineAt } from '@/utils/date.util';
import ApplyButton from './apply-button';

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
        <div className="flex gap-4">
          <Button
            onClick={handleChat}
            variant="outline"
            size="md"
            className="body-lg-medium h-[50px]"
          >
            채팅하기
          </Button>
          <ApplyButton postId={postId} />
        </div>
      )}
    </>
  );
}
