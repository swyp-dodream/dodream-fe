'use client';

import { useParams } from 'next/navigation';
import { useGetPostDetail } from '@/hooks/post/use-get-posts';
import { getRelativeTime } from '@/utils/date.util';
import PostBookmarkButton from '../_components/post-bookmark-button';
import PostContent from '../_components/post-content';
import PostDetailButtons from '../_components/post-detail-buttons';
import PostLinkButton from '../_components/post-link-button';
import RecommendedUsers from '../_components/recommended-users';
import RecruitInfo from '../_components/recruit-info';
import RecruitStatus from '../_components/recruit-status';

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const postId = BigInt(params.id ?? 0);
  const { data: postData } = useGetPostDetail(postId);

  if (!postData) return null;

  const isClosed = new Date(postData.deadlineDate) < new Date();

  return (
    <article className="grid grid-cols-12 gap-x-7">
      <section className="col-span-8 flex flex-col">
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
            <PostBookmarkButton
              isBookmarked={postData.isBookmarked}
              postId={BigInt(postData.id)}
            />
            {/* 링크 복사 버튼 */}
            <PostLinkButton />
          </div>
        </div>

        {/* 제목 */}
        <h2 className="heading-xl mt-5 mb-9">{postData.title}</h2>

        {/* 내용 영역 */}
        <div className="flex flex-col gap-12">
          <div className="whitespace-pre-line">
            <h3 className="heading-lg mb-8">모집 내용</h3>
            <PostContent content={postData.content} maxHeight={480} />
          </div>

          {/* 모집 요약 */}
          <RecruitInfo
            projectType={postData.projectType}
            deadlineDate={postData.deadlineDate}
            activityMode={postData.activityMode}
            interestKeywords={postData.interestKeywords}
            duration={postData.duration}
            techStacks={postData.stacks}
          />

          {/* 추천 회원 */}
          <RecommendedUsers postId={postData.id} />
        </div>
      </section>

      {/* 버튼 */}
      <aside className="col-start-10 col-span-3 flex flex-col gap-7">
        {!isClosed ? (
          <PostDetailButtons postId={postData.id} />
        ) : (
          <div className="flex items-center justify-center h-[50px] body-lg-medium bg-disabled text-text-on-brand p-3 w-full rounded-md">
            모집 마감
          </div>
        )}

        {/* 모집중인 직군 */}
        <RecruitStatus roles={postData.roles} postId={postData.id} />
      </aside>
    </article>
  );
}
