import Link from 'next/link';
import PostContent from '@/app/(default-layout)/post/_components/post-content';
import RecruitInfo from '@/app/(default-layout)/post/_components/recruit-info';
import RecruitStatus from '@/app/(default-layout)/post/_components/recruit-status';
import ChevronRightIcon from '@/assets/icons/chevron-right/16.svg';
import { useGetPostDetail } from '@/hooks/post/use-get-posts';

interface PostDetailProps {
  postId: bigint;
}

export default function PostDetail({ postId }: PostDetailProps) {
  const { data: postDetail, isPending } = useGetPostDetail(postId);

  if (isPending || !postDetail) {
    return null;
  }

  return (
    <div className="col-span-4 flex flex-col h-full border-l-1 border-border-primary px-7 @container/chatting">
      {/* 헤더 */}
      <header className="flex justify-between items-center py-4">
        <span className="body-lg-medium text-primary">모집글</span>
        {/* 모집글 상세로 가기 버튼 */}
        <Link
          href={`/post/${postId}`}
          className="rounded-full p-2 size-7 cursor-pointer bg-primary flex justify-center items-center"
        >
          <ChevronRightIcon className="text-icon-medium" />
        </Link>
      </header>

      {/* 본문 */}
      <section className="py-5 flex flex-col gap-7 overflow-y-auto scrollbar-thin-dark">
        {/* 제목 */}
        <h1 className="heading-lg">{postDetail?.title}</h1>

        <div className="flex flex-col gap-8">
          {/* 모집중인 직군 */}
          <RecruitStatus roles={postDetail.roles} postId={postId} />

          {/* 모집 내용 */}
          <div className="whitespace-pre-line">
            <PostContent content={postDetail.content} maxHeight={280} />
          </div>

          {/* 모집 요약 */}
          <RecruitInfo
            projectType={postDetail.projectType}
            deadlineDate={postDetail.deadlineDate}
            activityMode={postDetail.activityMode}
            interestKeywords={postDetail.interestKeywords}
            duration={postDetail.duration}
            techStacks={postDetail.stacks}
            align="vertical"
          />
        </div>
      </section>
    </div>
  );
}
