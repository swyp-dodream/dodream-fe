import { PostCard } from '@/components/features/post/post-card';
import ApplyDetailButton from '@/components/features/post/post-card/buttons/apply-detail-button';
import MathcingCancelButton from '@/components/features/post/post-card/buttons/matching-cancel-button';
import type { MockPost, Role } from '@/mocks/posts';
import { formatDeadlineAt } from '@/utils/date.util';

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

function getRoles(roles: Role[]) {
  return roles.map((role) => ROLE_LABEL_MAP[role]);
}

interface MatchedPostCardProps {
  post: MockPost;
}

export default function MatchedPostCard({ post }: MatchedPostCardProps) {
  return (
    <PostCard>
      <PostCard.Header
        nickname={post.ownerUserId}
        elapsedTime={formatDeadlineAt(post.deadlineAt)}
        projectType={post.projectType}
        isBookmarked={post.isBookmarked}
      />

      <PostCard.Main>
        <PostCard.Title>{post.title}</PostCard.Title>

        <div className="flex flex-col gap-4">
          <PostCard.TechCategories techCategories={post.techCategories} />
          <PostCard.Roles roles={getRoles(post.roles)} />
        </div>
      </PostCard.Main>

      <PostCard.Footer views={post.views} status={post.status} />

      <PostCard.Actions>
        <MathcingCancelButton nickname="닉네임" />
        <ApplyDetailButton />
      </PostCard.Actions>
    </PostCard>
  );
}
