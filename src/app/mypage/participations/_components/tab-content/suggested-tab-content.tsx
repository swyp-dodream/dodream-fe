'use client';

import Pagination from '@/components/commons/pagination';
import { Tabs } from '@/components/commons/tabs';
import MyPageEmptyState from '@/components/features/mypage/commons/mypage-empty-state';
import SuggestedPostCard from '@/components/features/post/post-card/presets/suggested-post-card';
import useQueryParams from '@/hooks/filter/use-query-params';
import useGetMySuggestedPosts from '@/hooks/my/use-get-my-suggested.posts';

interface SuggestedTabContentProps {
  tabValue: string;
}

export default function SuggestedTabContent({
  tabValue,
}: SuggestedTabContentProps) {
  const { getParam, setParams } = useQueryParams();
  const currentPage = Number(getParam('page') ?? 1);

  const { data: suggestedPosts } = useGetMySuggestedPosts(currentPage - 1);

  if (!suggestedPosts || suggestedPosts.content.length === 0) {
    return (
      <MyPageEmptyState
        title="제안받은 내역이 없습니다"
        description="프로필을 완성하고 더 많은 매칭 제안을 받으세요"
      />
    );
  }

  return (
    <Tabs.Content
      key={tabValue}
      value={tabValue}
      showPagination
      paginationSlot={
        <Pagination
          currentPage={currentPage}
          totalPages={suggestedPosts.totalPages}
          onPageChange={(page) => setParams({ page })}
          className="justify-center mt-[36px]"
        />
      }
    >
      {suggestedPosts?.content.map((mySuggestedPost) => (
        <SuggestedPostCard
          key={mySuggestedPost.id}
          mySuggestedPost={mySuggestedPost}
        />
      ))}
    </Tabs.Content>
  );
}
