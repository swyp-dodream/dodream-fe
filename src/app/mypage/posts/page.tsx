'use client';

import Pagination from '@/components/commons/pagination';
import { Tabs } from '@/components/commons/tabs';
import MyPageHeader from '@/components/features/mypage/commons/mypage-header';
import MyPostsEmptyState from '@/components/features/mypage/my-posts/my-posts-empty-state';
import MyPostCard from '@/components/features/post/post-card/presets/my-post-card';
import { PROJECT_MAP, PROJECT_TAB_VALUES } from '@/constants/post.constant';
import useQueryParams from '@/hooks/filter/use-query-params';
import useGetMyPosts from '@/hooks/my/use-get-my-posts';
import type { ProjectType } from '@/types/post.type';
import { getValidPage } from '@/utils/filter.util';

export default function MyPostsPage() {
  const { getParam, setParams } = useQueryParams();
  const currentProjectType = (getParam('projectType') ??
    PROJECT_TAB_VALUES[0]) as ProjectType;
  const currentPage = Number(getParam('page') ?? 1);

  const { data: posts } = useGetMyPosts(currentProjectType, currentPage - 1);

  if (!posts) return null;

  // 탭 선택 핸들러
  const handleTabChange = (value: string) => {
    setParams({ projectType: value, page: null });
  };

  return (
    <>
      <MyPageHeader title="내가 쓴 글" />

      <Tabs defaultValue={currentProjectType} onValueChange={handleTabChange}>
        <Tabs.List>
          {PROJECT_TAB_VALUES.map((value) => (
            <Tabs.Trigger key={value} value={value}>
              {PROJECT_MAP[value as ProjectType]}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {PROJECT_TAB_VALUES.map((tabValue) => {
          return (
            <Tabs.Content key={tabValue} value={tabValue}>
              {posts?.posts.length > 0 ? (
                posts.posts.map((post) => (
                  <MyPostCard key={post.postId} post={post} />
                ))
              ) : (
                <MyPostsEmptyState />
              )}
            </Tabs.Content>
          );
        })}
      </Tabs>

      {posts.posts.length !== 0 && (
        <Pagination
          currentPage={getValidPage(currentPage, posts.totalPages)}
          totalPages={posts.totalPages}
          onPageChange={(page) => setParams({ page })}
          className="justify-center mt-6"
        />
      )}
    </>
  );
}
