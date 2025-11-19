import { PostCard } from '@/components/features/post/post-card';
import ApplyDetailButton from '@/components/features/post/post-card/buttons/apply-detail-button';
import MathcingCancelButton from '@/components/features/post/post-card/buttons/matching-cancel-button';
import type { MyMatchedPostType } from '@/types/post.type';
import { formatDeadlineAt } from '@/utils/date.util';

interface MatchedPostCardProps {
  myMatchedPost: MyMatchedPostType;
}

export default function MyMatchedPostCard({
  myMatchedPost,
}: MatchedPostCardProps) {
  return (
    <PostCard href={`/post/${BigInt(myMatchedPost.postId)}`}>
      <PostCard.Header
        postId={myMatchedPost.postId}
        nickname={myMatchedPost.leaderName}
        elapsedTime={formatDeadlineAt(myMatchedPost.matchedAt)}
        projectType={myMatchedPost.projectType}
        isBookmarked={myMatchedPost.bookmarked}
      />

      <PostCard.Main>
        <PostCard.Title>{myMatchedPost.postTitle}</PostCard.Title>

        <div className="flex flex-col gap-4">
          <PostCard.TechCategories techCategories={myMatchedPost.stacks} />
          <PostCard.Roles roles={myMatchedPost.roles} />
        </div>
      </PostCard.Main>

      <PostCard.Footer
        views={myMatchedPost.viewCount}
        status={myMatchedPost.postStatus}
      />

      <PostCard.Actions>
        <MathcingCancelButton
          nickname={myMatchedPost.leaderName}
          postId={myMatchedPost.postId}
          matchingId={myMatchedPost.id}
          matchedAt={myMatchedPost.matchedAt}
        />
        <ApplyDetailButton
          postId={BigInt(myMatchedPost.postId)}
          applicationId={myMatchedPost.applicationId}
        />
      </PostCard.Actions>
    </PostCard>
  );
}
