import postApi from '@/apis/post.api';
import Button from '@/components/commons/buttons/button';
import { formatDeadlineAt, getRelativeTime } from '@/utils/date.util';
import PostBookmarkButton from '../_components/post-bookmark-button';
import PostLinkButton from '../_components/post-link-button';
import RecruitInfo from '../_components/recruit-info';

interface PostDetailPageProps {
  params: { id: string };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const postData = await postApi.getPostDetail(Number(params.id));

  const isClosed = new Date(postData.deadlineDate) < new Date();

  return (
    <article className="grid grid-cols-12 gap-x-7">
      <section className="col-span-8">
        <div className="flex items-center body-lg-medium">
          {/* 프로필, 작성 시간 영역 */}
          {/* TODO: 프로필 이미지로 수정 */}
          <div className="w-9 h-9 rounded-full bg-primary" />
          <span className="ml-4 mr-3">{postData.ownerNickname}</span>
          <time className="text-subtle" dateTime={postData.deadlineDate}>
            {getRelativeTime(postData.createdAt)}
          </time>
          <div className="flex ml-auto gap-7">
            {/* 북마크 버튼 */}
            {/* TODO: 북마크 버튼 수정 */}
            <PostBookmarkButton isBookmarked={false} />
            {/* 링크 복사 버튼 */}
            <PostLinkButton />
          </div>
        </div>

        {/* 제목 */}
        <h2 className="heading-xl mt-5">{postData.title}</h2>

        {/* 내용 영역 */}
        <div className="mt-9 mb-12 whitespace-pre-line">
          <h3 className="heading-lg mb-8">모집 내용</h3>
          {postData.content}
        </div>
        <RecruitInfo
          projectType={postData.projectType}
          deadlineDate={postData.deadlineDate}
          activityMode={postData.activityMode}
          interestKeywords={postData.interestKeywords}
          duration={postData.duration}
          techStacks={postData.stacks}
        />
      </section>

      <aside className="col-start-10 col-span-3 flex flex-col gap-7">
        {!isClosed ? (
          postData.owner ? (
            // 작성자인 경우 - 마감일 표시
            <div className="flex items-center justify-center h-[50px] body-lg-medium bg-brand text-text-on-brand p-3 w-full rounded-md">
              마감 {formatDeadlineAt(new Date(postData.deadlineDate))}
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
              <Button variant="brand" size="md" className="h-[50px]">
                지원하기
              </Button>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-[50px] body-lg-medium bg-disabled text-text-on-brand p-3 w-full rounded-md">
            모집 마감
          </div>
        )}

        {/* 모집중인 직군 */}
        {/* <RecruitStatus postId={postData.id} /> */}
      </aside>
    </article>
  );
}
