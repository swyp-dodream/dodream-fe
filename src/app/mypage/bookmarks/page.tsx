import { Separator, Tabs } from 'radix-ui';
import BookmarkEmptyState from '@/components/features/mypage/bookmark/bookmark-empty-state';
import BookmarkTabTrigger from '@/components/features/mypage/bookmark/bookmark-tab-trigger';
import DefaultPostCard from '@/components/features/post/post-card/presets/default-post-card';
import { MOCK_POSTS, type MockPost, type ProjectType } from '@/mocks/posts';

const PROJECT_TAB_VALUES: ProjectType[] = ['project', 'study'];

const bookmarkedPostsByType = MOCK_POSTS.filter(
  (post) => post.isBookmarked,
).reduce<Record<ProjectType, MockPost[]>>(
  (acc, post) => {
    acc[post.projectType].push(post);
    return acc;
  },
  { project: [], study: [] },
);

export default function BookmarkPage() {
  return (
    <>
      <h2 className="heading-xl">북마크</h2>

      <Separator.Root className="w-full h-px bg-border-primary" />

      <Tabs.Root defaultValue="project" className="grid grid-cols-8 gap-7">
        <Tabs.List className="col-span-2 flex p-3 gap-3 bg-primary rounded-lg">
          {PROJECT_TAB_VALUES.map((tabValue) => (
            <BookmarkTabTrigger key={tabValue} value={tabValue}>
              {tabValue === 'project' ? '프로젝트' : '스터디'}
            </BookmarkTabTrigger>
          ))}
        </Tabs.List>

        {PROJECT_TAB_VALUES.map((tabValue) => {
          const posts = bookmarkedPostsByType[tabValue];

          return (
            <Tabs.Content
              key={tabValue}
              value={tabValue}
              className="row-start-2 col-span-8 grid grid-cols-2 grid-rows-5 gap-7"
            >
              {posts.length > 0 ? (
                posts.map((post) => (
                  <DefaultPostCard key={post.id} post={post} />
                ))
              ) : (
                <BookmarkEmptyState tabValue={tabValue} />
              )}
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </>
  );
}
