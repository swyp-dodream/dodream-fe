'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PostDeleteButton from '@/app/post/_components/post-delete-button';
import PostEditButton from '@/app/post/_components/post-edit-button';
import ProfileImage from '@/components/commons/profile-image';
import { useGetPostDetail } from '@/hooks/post/use-get-posts';
import useToast from '@/hooks/use-toast';
import { getRelativeTime } from '@/utils/date.util';
import PostBookmarkButton from './post-bookmark-button';
import PostContent from './post-content';
import PostDetailButtons from './post-detail-buttons';
import PostLinkButton from './post-link-button';
import RecommendedUsers from './recommended-users';
import RecruitInfo from './recruit-info';
import RecruitStatus from './recruit-status';

interface PostPageClientProps {
  postId: bigint;
}

export default function PostPageClient({ postId }: PostPageClientProps) {
  const toast = useToast();
  const router = useRouter();
  const { data: postData, isError, error } = useGetPostDetail(postId);

  useEffect(() => {
    if (isError) {
      toast({ title: error.message });
      router.replace('/');
    }
  }, [error, isError, router, toast]);

  if (!postData) return null;

  const isClosed = new Date(postData.deadlineDate) < new Date();

  return (
    <article className="grid grid-cols-12 gap-x-7">
      <section className="col-span-8 flex flex-col">
        <div className="flex items-center body-lg-medium">
          {/* 프로필, 작성 시간 영역 */}
          {/* TODO: 프로필 이미지로 수정 */}
          <ProfileImage
            // code={postData.ownerProfileImageUrl}
            size={40}
            userName={postData.ownerNickname}
          />
          <span className="ml-4 mr-3">{postData.ownerNickname}</span>
          <time className="text-subtle" dateTime={postData.deadlineDate}>
            {getRelativeTime(postData.createdAt)}
          </time>
          <div className="flex ml-auto gap-7">
            {postData.owner ? (
              <>
                {/* 모집글 수정 버튼 */}
                <PostEditButton postId={postData.id} />
                {/* 모집글 삭제 버튼 */}
                <PostDeleteButton postId={postData.id} />
              </>
            ) : (
              <>
                {/* 북마크 버튼 */}
                {/* TODO: 북마크 버튼 수정 */}
                <PostBookmarkButton
                  isBookmarked={postData.isBookmarked}
                  postId={BigInt(postData.id)}
                />
                {/* 링크 복사 버튼 */}
                <PostLinkButton />
              </>
            )}
          </div>
        </div>

        {/* 제목 */}
        <h2 className="heading-xl mt-5 mb-9">{postData.title}</h2>

        {/* 내용 영역 */}
        <div className="flex flex-col gap-12">
          <div className="whitespace-pre-line">
            <h3 className="heading-lg mb-8">모집 내용</h3>
            <PostContent content={postData.content} maxHeight={450} />
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
