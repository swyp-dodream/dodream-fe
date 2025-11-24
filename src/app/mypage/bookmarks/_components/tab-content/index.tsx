import MyPageEmptyState from '@/components/features/mypage/commons/mypage-empty-state';
import DefaultPostCard from '@/components/features/post/post-card/presets/default-post-card';
import useGetMyBookmarkedPosts from '@/hooks/my/use-get-my-bookmarked-posts';
import type { ProjectType } from '@/types/post.type';

interface BookmarkedPageTabContentProps {
  projectType: ProjectType;
}

export default function BookmarkedPageTabContent({
  projectType,
}: BookmarkedPageTabContentProps) {
  const { data: bookmarkedPosts } = useGetMyBookmarkedPosts(projectType);
  const projectTypeToKorean = projectType === 'PROJECT' ? '프로젝트' : '스터디';

  if (bookmarkedPosts?.totalElements === 0) {
    return (
      <MyPageEmptyState
        title="북마크한 글이 없습니다"
        description={`관심 있는 ${projectTypeToKorean}를 북마크해 보세요`}
      />
    );
  }

  return bookmarkedPosts?.content.map((bookmarkedPost) => (
    <DefaultPostCard
      key={bookmarkedPost.postId}
      id={bookmarkedPost.postId}
      title={bookmarkedPost.postTitle}
      status={bookmarkedPost.postStatus}
      ownerNickname={bookmarkedPost.leaderName}
      ownerProfileImageCode={bookmarkedPost.leaderProfileImageCode}
      projectType={bookmarkedPost.projectType}
      createDate={bookmarkedPost.postCreatedAt.toString()}
      viewCount={bookmarkedPost.viewCount}
      stacks={bookmarkedPost.stacks}
      roles={bookmarkedPost.roles}
      isBookmarked={bookmarkedPost.bookmarked}
    />
  ));
}
