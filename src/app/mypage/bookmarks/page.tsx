import { Separator, Tabs } from 'radix-ui';
import { BookmarkTabTrigger } from '@/components/features/mypage/bookmark/bookmark-tab-trigger';
import { PostCard } from '@/components/features/post/post-card';
import {
  MOCK_POSTS,
  type MockPost,
  type ProjectType,
  type Role,
} from '@/mocks/posts';

const PROJECT_TAB_VALUES: ProjectType[] = ['project', 'study'];

const ROLE_LABEL_MAP: Record<Role, string> = {
  FE: '프론트엔드',
  BE: '백엔드',
  iOS: 'iOS',
  AOS: '안드로이드',
  Designer: '디자이너',
  PM: 'PM',
  Planner: '기획자',
  Marketer: '마케터',
};

const bookmarkedPostsByType = MOCK_POSTS.filter(
  (post) => post.isBookmarked,
).reduce<Record<ProjectType, MockPost[]>>(
  (acc, post) => {
    acc[post.projectType].push(post);
    return acc;
  },
  { project: [], study: [] },
);

function formatDeadline(deadline: Date) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);

  const diffTime = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) {
    return `D-${diffDays}`;
  }

  if (diffDays === 0) {
    return 'D-Day';
  }

  return `D+${Math.abs(diffDays)}`;
}

function getRoles(roles: Role[]) {
  return roles.map((role) => ROLE_LABEL_MAP[role]);
}

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
                  <PostCard key={post.id}>
                    <PostCard.Header
                      nickname={post.ownerUserId}
                      elapsedTime={formatDeadline(post.deadlineAt)}
                      projectType={post.projectType}
                      isBookmarked={post.isBookmarked}
                    />

                    <PostCard.Main>
                      <PostCard.Title>{post.title}</PostCard.Title>

                      <div className="flex flex-col gap-4">
                        <PostCard.TechCategories
                          techCategories={post.techCategories}
                        />
                        <PostCard.Roles roles={getRoles(post.roles)} />
                      </div>
                    </PostCard.Main>

                    <PostCard.Footer views={post.views} status={post.status} />
                  </PostCard>
                ))
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="body-lg-medium text-primary">
                    북마크한 글이 없습니다
                  </span>
                  <span className="body-lg-medium text-subtle">
                    관심 있는 {tabValue === 'project' ? '프로젝트' : '스터디'}를
                    북마크해 보세요.
                  </span>
                </div>
              )}
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </>
  );
}
