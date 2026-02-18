import Banner from '@/app/(default-layout)/(home)/_components/banner';
import HomePosts from '@/app/(default-layout)/(home)/_components/home-posts';
import RecommendedPosts from '@/app/(default-layout)/(home)/_components/recommended-posts';
import { serverApis } from '@/services/server.api';

export default async function Home() {
  const profileExists = await serverApis.profile.getProfileExists();

  return (
    <div className="grid grid-cols-12 gap-x-7 gap-y-12">
      <Banner profileExists={profileExists.exists} />
      <RecommendedPosts profileExists={profileExists.exists} />
      <HomePosts />
    </div>
  );
}
