import { PostCard } from '@/components/features/post/post-card';
import type { PostContentType } from '@/types/post.type';
import { formatDeadlineAt } from '@/utils/date.util';

interface DefaultPostCardProps {
  post: PostContentType;
}

export default function DefaultPostCard({ post }: DefaultPostCardProps) {
  return (
    <PostCard href={`/post/${post.id}`}>
      <PostCard.Header
        nickname={post.ownerNickname}
        elapsedTime={formatDeadlineAt(post.deadlineDate)}
        projectType={post.projectType}
        // TODO: 북마크 값 변경
        isBookmarked={false}
      />

      <PostCard.Main>
        <PostCard.Title>{post.title}</PostCard.Title>

        <div className="flex flex-col gap-4">
          <PostCard.TechCategories techCategories={post.stacks} />
          <PostCard.Roles roles={post.roles} />
        </div>
      </PostCard.Main>

      <PostCard.Footer views={post.viewCount} status={post.status} />
    </PostCard>
  );
}
