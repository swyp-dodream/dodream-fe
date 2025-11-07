import Banner from '@/components/features/home/banner';
import RecommendedPosts from '@/components/features/home/recommended-posts';

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-x-7 gap-y-12">
      <Banner />
      <RecommendedPosts />
    </div>
  );
}
