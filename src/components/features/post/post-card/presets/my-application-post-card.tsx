import { PostCard } from '@/components/features/post/post-card';
import ApplyCancelButton from '@/components/features/post/post-card/buttons/apply-cancel-button';
import ApplyDetailButton from '@/components/features/post/post-card/buttons/apply-detail-button';
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

function _getRoles(roles: Role[]) {
  return roles.map((role) => ROLE_LABEL_MAP[role]);
}

interface MyApplicationPostCardProps {
  post: MockPost;
}

export default function MyApplicationPostCard({
  post,
}: MyApplicationPostCardProps) {
  return (
    <PostCard>
      <PostCard.Header
        nickname={post.ownerUserId}
        elapsedTime={formatDeadlineAt(post.deadlineAt)}
        // TODO: 값 수정
        projectType="PROJECT"
        isBookmarked={post.isBookmarked}
      />

      <PostCard.Main>
        <PostCard.Title>{post.title}</PostCard.Title>

        <div className="flex flex-col gap-4">
          <PostCard.TechCategories techCategories={post.techCategories} />
          {/* TODO: 값 수정 */}
          <PostCard.Roles roles={[]} />
        </div>
      </PostCard.Main>

      {/* TODO: 값 수정 */}
      <PostCard.Footer views={post.views} status="RECRUITING" />

      <PostCard.Actions>
        <ApplyCancelButton />
        <ApplyDetailButton />
      </PostCard.Actions>
    </PostCard>
  );
}
