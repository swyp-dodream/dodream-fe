'use client';

import Pagination from '@/components/commons/pagination';
import { Tabs } from '@/components/commons/tabs';
import MyPageEmptyState from '@/components/features/mypage/commons/mypage-empty-state';
import MyApplicationPostCard from '@/components/features/post/post-card/presets/my-application-post-card';
import useQueryParams from '@/hooks/filter/use-query-params';
import useGetMyAppliedPosts from '@/hooks/post/use-get-applied-posts';

interface ApplicationsTabContentProps {
  tabValue: string;
}

export default function ApplicationsTabContent({
  tabValue,
}: ApplicationsTabContentProps) {
  const { getParam, setParams } = useQueryParams();
  const currentPage = Number(getParam('page') ?? 1);

  const { data: myAppliedPosts } = useGetMyAppliedPosts(currentPage - 1);

  if (!myAppliedPosts) return null;

  if (myAppliedPosts.content.length === 0) {
    return (
      <MyPageEmptyState
        title="지원한 글이 없습니다"
        description="관심 있는 프로젝트와 스터디를 찾아 합류해보세요"
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
          totalPages={myAppliedPosts?.totalPages}
          onPageChange={(page) => setParams({ page })}
          className="justify-center mt-[36px]"
        />
      }
    >
      {myAppliedPosts?.content?.map((myAppliedPost) => (
        <MyApplicationPostCard
          key={myAppliedPost.id}
          myAppliedPost={myAppliedPost}
        />
      ))}
    </Tabs.Content>
  );
}
