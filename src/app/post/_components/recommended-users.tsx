'use client';

import OfferTabContent from '@/app/mypage/posts/[postId]/recruitment/_components/offer-tab-content';
import { useGetRecommendedUsers } from '@/hooks/post/use-get-recommended-users';

interface RecommendedUsersProps {
  postId: bigint;
}

/** 추천 유저 탭 */
export default function RecommendedUsers({ postId }: RecommendedUsersProps) {
  const { data } = useGetRecommendedUsers(postId);

  if (!data) return null;

  const profiles = data.profiles.map((profile) => ({
    ...profile,
    jobGroups: profile.roles,
  }));

  return (
    <div className="flex flex-col gap-8">
      <h3 className="heading-lg">AI가 추천하는 회원을 탐색해 보세요</h3>
      <OfferTabContent postId={postId} users={profiles} />
    </div>
  );
}
