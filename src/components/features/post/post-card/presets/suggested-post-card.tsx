'use client';

import { PostCard } from '@/components/features/post/post-card';
import ApplyButton from '@/components/features/post/post-card/buttons/apply-button';
import ChatButton from '@/components/features/post/post-card/buttons/chat-button';
import type { MySuggestedPostType } from '@/types/post.type';
import { formatDeadlineAt } from '@/utils/date.util';

interface SuggestedPostCardProps {
  mySuggestedPost: MySuggestedPostType;
}

export default function SuggestedPostCard({
  mySuggestedPost,
}: SuggestedPostCardProps) {
  return (
    <PostCard href={`/post/${BigInt(mySuggestedPost.postId)}`}>
      <PostCard.Header
        nickname={mySuggestedPost.leaderName}
        elapsedTime={formatDeadlineAt(mySuggestedPost.appliedAt)}
        projectType={mySuggestedPost.projectType}
        isBookmarked={mySuggestedPost.bookmarked}
      />

      <PostCard.Main>
        <PostCard.Title>{mySuggestedPost.postTitle}</PostCard.Title>

        <div className="flex flex-col gap-4">
          <PostCard.TechCategories techCategories={mySuggestedPost.stacks} />
          <PostCard.Roles
            roles={mySuggestedPost.roles.map((role) => ({ role }))}
          />
        </div>
      </PostCard.Main>

      <PostCard.Footer
        views={mySuggestedPost.viewCount}
        status={mySuggestedPost.status}
      />

      <PostCard.Actions>
        <ChatButton />
        <ApplyButton
          postId={mySuggestedPost.postId}
          variant="solid"
          size="md"
        />
      </PostCard.Actions>
    </PostCard>
  );
}
