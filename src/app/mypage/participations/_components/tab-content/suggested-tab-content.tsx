'use client';

import MyPageEmptyState from '@/components/features/mypage/commons/mypage-empty-state';
import SuggestedPostCard from '@/components/features/post/post-card/presets/suggested-post-card';
import useGetMySuggestedPosts from '@/hooks/my/use-get-my-suggested.posts';

export default function SuggestedTabContent() {
  const { data: suggestedPosts } = useGetMySuggestedPosts();

  if (suggestedPosts?.content.length === 0) {
    return (
      <MyPageEmptyState
        title="제안받은 내역이 없습니다"
        description="프로필을 완성하고 더 많은 매칭 제안을 받으세요"
      />
    );
  }

  return (
    <>
      {suggestedPosts?.content.map((mySuggestedPost) => (
        <SuggestedPostCard
          key={mySuggestedPost.id}
          mySuggestedPost={mySuggestedPost}
        />
      ))}
    </>
  );
}
