import { Tabs } from '@/components/commons/tabs';
import BookmarkEmptyState from '@/components/features/mypage/bookmark/bookmark-empty-state';
import MyPageHeader from '@/components/features/mypage/commons/mypage-header';
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

      <Tabs defaultValue="project">
        <Tabs.List>
          {PROJECT_TAB_VALUES.map((tabValue) => (
            <Tabs.Trigger key={tabValue} value={tabValue}>
              {tabValue === 'project' ? '프로젝트' : '스터디'}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {PROJECT_TAB_VALUES.map((tabValue) => {
          const posts = bookmarkedPostsByType[tabValue];

          return (
            <Tabs.Content key={tabValue} value={tabValue}>
              {posts.length > 0 ? (
                posts.map((post) => (
                  // TODO: 임시 값 수정하기
                  <DefaultPostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    status="RECRUITING"
                    ownerNickname="닉네임"
                    ownerProfileImageUrl=""
                    projectType="PROJECT"
                    createDate={post.deadlineAt.toString()}
                    viewCount={post.views}
                    stacks={post.techCategories}
                    roles={['백엔드']}
                  />
                ))
              ) : (
                <BookmarkEmptyState tabValue={tabValue} />
              )}
            </Tabs.Content>
          );
        })}
      </Tabs>
    </>
  );
}
