import MyPageEmptyState from '@/components/features/mypage/commons/mypage-empty-state';
import DefaultPostCard from '@/components/features/post/post-card/presets/default-post-card';
import { PROJECT_MAP } from '@/constants/post.constant';
import type {
  GetMyBookmarkedPostsResponseType,
  ProjectType,
} from '@/types/post.type';

interface BookmarkedPageTabContentProps {
  projectType: ProjectType;
  bookmarkedPosts: GetMyBookmarkedPostsResponseType;
}

export default function BookmarkedPageTabContent({
  projectType,
  bookmarkedPosts,
}: BookmarkedPageTabContentProps) {
  if (bookmarkedPosts.totalElements === 0) {
    return (
      <MyPageEmptyState
        title="북마크한 글이 없습니다"
        description={`관심 있는 ${PROJECT_MAP[projectType]}를 북마크해 보세요`}
      />
    );
  }

  return (
    <>
      {bookmarkedPosts.content.map((bookmarkedPost) => (
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
      ))}
    </>
  );
}
