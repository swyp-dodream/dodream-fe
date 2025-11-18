import { PostCard } from '@/components/features/post/post-card';
import type { PostStatusType, ProjectType } from '@/types/post.type';
import { formatDeadlineAt } from '@/utils/date.util';

interface DefaultPostCardProps {
  id: bigint;
  title: string;
  status: PostStatusType;
  ownerNickname: string;
  ownerProfileImageUrl: string;
  projectType: ProjectType;
  deadlineDate: string;
  viewCount: number;
  stacks: string[];
  roles: {
    role: string;
    headcount: number;
  }[];
}

export default function DefaultPostCard({
  id,
  title,
  status,
  ownerNickname,
  ownerProfileImageUrl,
  projectType,
  deadlineDate,
  viewCount,
  stacks,
  roles,
}: DefaultPostCardProps) {
  return (
    <PostCard href={`/post/${id}`}>
      <PostCard.Header
        nickname={ownerNickname}
        elapsedTime={formatDeadlineAt(deadlineDate)}
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
