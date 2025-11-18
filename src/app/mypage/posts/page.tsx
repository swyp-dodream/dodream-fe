'use client';

import { Tabs } from '@/components/commons/tabs';
import MyPageHeader from '@/components/features/mypage/commons/mypage-header';
import MyPostsEmptyState from '@/components/features/mypage/my-posts/my-posts-empty-state';
import MyPostCard from '@/components/features/post/post-card/presets/my-post-card';
import { PROJECT_TAB_VALUES } from '@/constants/post.constant';
import useQueryParams from '@/hooks/filter/use-query-params';
import useGetMyPosts from '@/hooks/my/use-get-my-posts';

export default function MyPostsPage() {
  const { params, setParams } = useQueryParams();
  const { data: posts } = useGetMyPosts(params.type);

  if (!posts) return null;

  return (
    <>
      <MyPageHeader title="내가 쓴 글" />

      <Tabs
        defaultValue={params.type || 'PROJECT'}
        onValueChange={(value) => setParams({ type: value })}
      >
        <Tabs.List>
          {PROJECT_TAB_VALUES.map((tabValue) => (
            <Tabs.Trigger key={tabValue} value={tabValue}>
              {tabValue === 'PROJECT' ? '프로젝트' : '스터디'}
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
    </>
  );
}
