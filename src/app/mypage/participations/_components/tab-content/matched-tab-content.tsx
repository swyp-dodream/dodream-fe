import MatchedPostCard from '@/components/features/post/post-card/presets/matched-post-card';
import { MOCK_POSTS } from '@/mocks/posts';

export default function MatchedTabContent() {
  return (
    <>
      {MOCK_POSTS.map((post) => (
        <MatchedPostCard key={post.id} post={post} />
      ))}
    </>
  );
}
