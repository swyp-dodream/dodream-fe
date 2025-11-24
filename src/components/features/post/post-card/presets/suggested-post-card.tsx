'use client';

import { PostCard } from '@/components/features/post/post-card';
import ApplyButton from '@/components/features/post/post-card/buttons/apply-button';
import ChatButton from '@/components/features/post/post-card/buttons/chat-button';
import type { MySuggestedPostType } from '@/types/post.type';
import { getRelativeTime } from '@/utils/date.util';

interface SuggestedPostCardProps {
  mySuggestedPost: MySuggestedPostType;
}

export default function SuggestedPostCard({
  mySuggestedPost,
}: SuggestedPostCardProps) {
  return (
    <PostCard href={`/post/${BigInt(mySuggestedPost.postId)}`}>
      <PostCard.Header
        postId={mySuggestedPost.postId}
        nickname={mySuggestedPost.leaderName}
        elapsedTime={getRelativeTime(mySuggestedPost.postCreatedAt)}
        projectType={mySuggestedPost.projectType}
        isBookmarked={mySuggestedPost.bookmarked}
      />

      <PostCard.Main>
        <PostCard.Title>{mySuggestedPost.postTitle}</PostCard.Title>

        <div className="flex flex-col gap-4">
          <PostCard.TechCategories techCategories={mySuggestedPost.stacks} />
          <PostCard.Roles roles={mySuggestedPost.roles} />
        </div>
      </PostCard.Main>

      <PostCard.Footer
        views={mySuggestedPost.viewCount}
        status={mySuggestedPost.postStatus}
      />

      <PostCard.Actions>
        <ChatButton postId={mySuggestedPost.postId} />
        <ApplyButton
          postId={mySuggestedPost.postId}
          variant="solid"
          size="md"
        />
      </PostCard.Actions>
    </PostCard>
  );
}
