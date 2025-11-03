import MyPageHeader from '@/components/features/mypage/commons/mypage-header';
import { MyPageTabs } from '@/components/features/mypage/commons/mypage-tabs';
import MyPostsEmptyState from '@/components/features/mypage/my-posts/my-posts-empty-state';
import MyPostCard from '@/components/features/post/post-card/presets/my-post-card';
import { MOCK_POSTS, type MockPost, type ProjectType } from '@/mocks/posts';

const PROJECT_TAB_VALUES: ProjectType[] = ['project', 'study'];

const mockPosts = MOCK_POSTS.reduce<Record<ProjectType, MockPost[]>>(
  (acc, post) => {
    acc[post.projectType].push(post);
    return acc;
  },
  { project: [], study: [] },
);

export default function MyPostsPage() {
  return (
    <>
      <MyPageHeader title="내가 쓴 글" />

      <MyPageTabs defaultValue="project">
        <MyPageTabs.List>
          {PROJECT_TAB_VALUES.map((tabValue) => (
            <MyPageTabs.Trigger key={tabValue} value={tabValue}>
              {tabValue === 'project' ? '프로젝트' : '스터디'}
            </MyPageTabs.Trigger>
          ))}
        </MyPageTabs.List>

        {PROJECT_TAB_VALUES.map((tabValue) => {
          const posts = mockPosts[tabValue];

          return (
            <MyPageTabs.Content key={tabValue} value={tabValue}>
              {posts.length > 0 ? (
                posts.map((post) => <MyPostCard key={post.id} post={post} />)
              ) : (
                <MyPostsEmptyState />
              )}
            </MyPageTabs.Content>
          );
        })}
      </MyPageTabs>
    </>
  );
}
