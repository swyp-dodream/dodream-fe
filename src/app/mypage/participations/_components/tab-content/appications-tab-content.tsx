'use client';

import MyPageEmptyState from '@/components/features/mypage/commons/mypage-empty-state';
import MyApplicationPostCard from '@/components/features/post/post-card/presets/my-application-post-card';
import useGetMyAppliedPosts from '@/hooks/post/use-get-applied-posts';

export default function ApplicationsTabContent() {
  const { data: myAppliedPosts } = useGetMyAppliedPosts();

  if (myAppliedPosts?.content.length === 0) {
    return (
      <MyPageEmptyState
        title="지원한 글이 없습니다"
        description="관심 있는 프로젝트와 스터디를 찾아 합류해보세요"
      />
    );
  }

  return (
    <>
      {myAppliedPosts?.content?.map((myAppliedPost) => (
        <MyApplicationPostCard
          key={myAppliedPost.id}
          myAppliedPost={myAppliedPost}
        />
      ))}
    </>
  );
}
