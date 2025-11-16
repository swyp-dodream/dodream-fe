import SuggestedPostCard from '@/components/features/post/post-card/presets/suggested-post-card';
import { MOCK_POSTS } from '@/mocks/posts';

export default function SuggestedTabContent() {
  return (
    <>
      {MOCK_POSTS.map((post) => (
        <SuggestedPostCard key={post.id} post={post} />
      ))}
    </>
  );
}
