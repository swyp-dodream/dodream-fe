import { PostCard } from '@/components/features/post/post-card';
import type { PostStatusType, ProjectType } from '@/types/post.type';
import { getRelativeTime } from '@/utils/date.util';

interface DefaultPostCardProps {
  id: bigint;
  title: string;
  status: PostStatusType;
  ownerNickname: string;
  ownerProfileImageCode: number;
  projectType: ProjectType;
  createDate: string;
  viewCount: number;
  stacks: string[];
  roles: string[];
  isBookmarked: boolean;
}

export default function DefaultPostCard({
  id,
  title,
  status,
  ownerNickname,
  ownerProfileImageCode,
  projectType,
  createDate,
  viewCount,
  stacks,
  roles,
  isBookmarked,
}: DefaultPostCardProps) {
  return (
    <PostCard
      href={`/post/${BigInt(id)}`}
      ownerProfileImageCode={ownerProfileImageCode}
    >
      <PostCard.Header
        nickname={ownerNickname}
        elapsedTime={getRelativeTime(createDate)}
        projectType={projectType}
        postId={id}
        isBookmarked={isBookmarked}
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
