import { PostCard } from '@/components/features/post/post-card';
import type { PostStatusType, ProjectType } from '@/types/post.type';
import { getRelativeTime } from '@/utils/date.util';

interface DefaultPostCardProps {
  id: bigint;
  title: string;
  status: PostStatusType;
  ownerNickname: string;
  ownerProfileImageUrl: string;
  projectType: ProjectType;
  createDate: string;
  viewCount: number;
  stacks: string[];
  roles: string[];
}

export default function DefaultPostCard({
  id,
  title,
  status,
  ownerNickname,
  ownerProfileImageUrl,
  projectType,
  createDate,
  viewCount,
  stacks,
  roles,
}: DefaultPostCardProps) {
  return (
    <PostCard href={`/post/${id}`}>
      <PostCard.Header
        nickname={ownerNickname}
        elapsedTime={getRelativeTime(createDate)}
        projectType={projectType}
        // TODO: 북마크 값 변경
        postId={id}
        isBookmarked={false}
      />

      <PostCard.Main>
        <PostCard.Title>{title}</PostCard.Title>

        <div className="flex flex-col gap-4">
          <PostCard.TechCategories techCategories={stacks} />
          <PostCard.Roles roles={roles} />
        </div>
      </PostCard.Main>

      <PostCard.Footer views={viewCount} status={status} />
    </PostCard>
  );
}
