import { Suspense } from 'react';
import Banner from '@/app/(home)/_components/banner';
import RecommendedPosts from '@/app/(home)/_components/recommended-posts';
import HomePosts from './(home)/_components/home-posts';

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-x-7 gap-y-12">
      <Banner />
      <RecommendedPosts />
      {/* TODO: 스켈레톤 추가 */}
      <Suspense>
        <HomePosts />
      </Suspense>
    </div>
  );
}
