'use client';

import MyPageEmptyState from '@/components/features/mypage/commons/mypage-empty-state';
import MyMatchedPostCard from '@/components/features/post/post-card/presets/my-matched-post-card';
import useGetMatchedPosts from '@/hooks/post/use-get-matched-posts';

export default function MatchedTabContent() {
  const { data: myMatchedPosts } = useGetMatchedPosts();

  if (myMatchedPosts?.content.length === 0) {
    return (
      <MyPageEmptyState
        title="매칭 내역이 없습니다."
        description="지금 지원하거나 새 글을 작성하여 매칭을 시작하세요."
      />
    );
  }

  return (
    <>
      {myMatchedPosts?.content?.map((myMatchedPost) => (
        <MyMatchedPostCard
          key={myMatchedPost.id}
          myMatchedPost={myMatchedPost}
        />
      ))}
    </>
  );
}
