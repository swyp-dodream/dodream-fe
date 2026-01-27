import { Suspense } from 'react';
import Banner from '@/app/(default-layout)/(home)/_components/banner';
import HomePosts from '@/app/(default-layout)/(home)/_components/home-posts';
import RecommendedPosts from '@/app/(default-layout)/(home)/_components/recommended-posts';

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
