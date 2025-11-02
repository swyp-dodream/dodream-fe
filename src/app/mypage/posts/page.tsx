import { Tabs } from 'radix-ui';
import BookmarkTabTrigger from '@/components/features/mypage/bookmark/bookmark-tab-trigger';
import MyPageHeader from '@/components/features/mypage/commons/mypage-header';
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

      <Tabs.Root defaultValue="project" className="grid grid-cols-8 gap-7">
        <Tabs.List className="col-span-2 flex p-3 gap-3 bg-primary rounded-lg">
          {PROJECT_TAB_VALUES.map((tabValue) => (
            <BookmarkTabTrigger key={tabValue} value={tabValue}>
              {tabValue === 'project' ? '프로젝트' : '스터디'}
            </BookmarkTabTrigger>
          ))}
        </Tabs.List>

        {PROJECT_TAB_VALUES.map((tabValue) => {
          const posts = mockPosts[tabValue];

          return (
            <Tabs.Content
              key={tabValue}
              value={tabValue}
              className="row-start-2 col-span-8 grid grid-cols-2 grid-rows-5 gap-7"
            >
              {posts.length > 0 ? (
                posts.map((post) => <MyPostCard key={post.id} post={post} />)
              ) : (
                <MyPostsEmptyState />
              )}
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </>
  );
}
