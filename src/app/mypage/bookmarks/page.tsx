import BookmarkEmptyState from '@/components/features/mypage/bookmark/bookmark-empty-state';
import MyPageHeader from '@/components/features/mypage/commons/mypage-header';
import { MyPageTabs } from '@/components/features/mypage/commons/mypage-tabs';
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
      <MyPageHeader title="북마크" />

      <MyPageTabs defaultValue="project">
        <MyPageTabs.List>
          {PROJECT_TAB_VALUES.map((tabValue) => (
            <MyPageTabs.Trigger key={tabValue} value={tabValue}>
              {tabValue === 'project' ? '프로젝트' : '스터디'}
            </MyPageTabs.Trigger>
          ))}
        </MyPageTabs.List>

        {PROJECT_TAB_VALUES.map((tabValue) => {
          const posts = bookmarkedPostsByType[tabValue];

          return (
            <MyPageTabs.Content key={tabValue} value={tabValue}>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <DefaultPostCard key={post.id} post={post} />
                ))
              ) : (
                <BookmarkEmptyState tabValue={tabValue} />
              )}
            </MyPageTabs.Content>
          );
        })}
      </MyPageTabs>
    </>
  );
}
