import { PostCard } from '@/components/features/post/post-card';
import ApplyCancelButton from '@/components/features/post/post-card/buttons/apply-cancel-button';
import ApplyDetailButton from '@/components/features/post/post-card/buttons/apply-detail-button';
import type { MyAppliedPostType } from '@/types/post.type';
import { formatDeadlineAt } from '@/utils/date.util';

interface MyApplicationPostCardProps {
  myAppliedPost: MyAppliedPostType;
}

export default function MyApplicationPostCard({
  myAppliedPost,
}: MyApplicationPostCardProps) {
  return (
    <PostCard href={`/post/${BigInt(myAppliedPost.postId)}`}>
      <PostCard.Header
        postId={BigInt(myAppliedPost.postId)}
        nickname={myAppliedPost.leaderName}
        elapsedTime={formatDeadlineAt(myAppliedPost.appliedAt)}
        projectType={myAppliedPost.projectType}
        isBookmarked={myAppliedPost.bookmarked}
      />

      <PostCard.Main>
        <PostCard.Title>{myAppliedPost.postTitle}</PostCard.Title>

        <div className="flex flex-col gap-4">
          <PostCard.TechCategories techCategories={myAppliedPost.stacks} />
          <PostCard.Roles
            roles={myAppliedPost.roles.map((role) => ({ role }))}
          />
        </div>
      </PostCard.Main>

      <PostCard.Footer
        views={myAppliedPost.viewCount}
        status={myAppliedPost.postStatus}
      />

      <PostCard.Actions>
        <ApplyCancelButton
          applicationId={myAppliedPost.id}
          postId={myAppliedPost.postId}
          ownerNickname={myAppliedPost.leaderName}
          variant="outline"
          size="md"
        />
        <ApplyDetailButton applicationId={myAppliedPost.id} />
      </PostCard.Actions>
    </PostCard>
  );
}
