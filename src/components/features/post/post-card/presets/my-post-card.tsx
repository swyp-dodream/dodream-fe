import { PostCard } from '@/components/features/post/post-card';
import RecruitmentButton from '@/components/features/post/post-card/buttons/recruitment-button';
import { useGetProfile } from '@/hooks/profile/use-get-profile';
import type { MyPostsContentType } from '@/types/my.type';
import type { PostStatusType, ProjectType } from '@/types/post.type';
import { getRelativeTime } from '@/utils/date.util';

interface MyPostCardProps {
  post: MyPostsContentType;
}

export default function MyPostCard({ post }: MyPostCardProps) {
  const { data: profile } = useGetProfile();

  if (!profile) return null;

  return (
    <PostCard href={`/post/${BigInt(post.postId)}`}>
      <PostCard.Header
        postId={post.postId}
        nickname={profile?.nickname}
        elapsedTime={getRelativeTime(post.createdAt)}
        projectType={post.projectType as ProjectType}
        isBookmarked={false}
        showBookmarkIcon={false}
      />

      <PostCard.Main>
        <PostCard.Title>{post.title}</PostCard.Title>

        <div className="flex flex-col gap-4">
          <PostCard.TechCategories techCategories={post.stacks} />
          <PostCard.Roles
            roles={post.roleRequirements.map((role) => role.roleName)}
          />
        </div>
      </PostCard.Main>

      <PostCard.Footer
        views={post.viewCount}
        status={post.status as PostStatusType}
      />

      <PostCard.Actions>
        <RecruitmentButton postId={post.postId} />
      </PostCard.Actions>
    </PostCard>
  );
}
