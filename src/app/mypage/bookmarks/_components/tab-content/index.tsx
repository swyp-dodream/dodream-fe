import MyPageEmptyState from '@/components/features/mypage/commons/mypage-empty-state';
import DefaultPostCard from '@/components/features/post/post-card/presets/default-post-card';
import type { MyBookmarkedPostType, ProjectType } from '@/types/post.type';

interface BookmarkedPageTabContentProps {
  posts: MyBookmarkedPostType[];
  projectType: ProjectType;
}

export default function BookmarkedPageTabContent({
  posts,
  projectType,
}: BookmarkedPageTabContentProps) {
  const projectTypeToKorean = projectType === 'PROJECT' ? '프로젝트' : '스터디';

  if (posts.length === 0) {
    return (
      <MyPageEmptyState
        title="북마크한 글이 없습니다"
        description={`관심 있는 ${projectTypeToKorean}를 북마크해 보세요`}
      />
    );
  }

  return posts?.map((post) => (
    <DefaultPostCard
      key={post.postId}
      id={post.postId}
      title={post.postTitle}
      status={post.postStatus}
      ownerNickname={post.leaderName}
      ownerProfileImageCode={post.leaderProfileImageCode}
      projectType={post.projectType}
      createDate={post.postCreatedAt.toString()}
      viewCount={post.viewCount}
      stacks={post.stacks}
      roles={post.roles}
      isBookmarked={post.bookmarked}
    />
  ));
}
