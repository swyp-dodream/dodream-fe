'use client';

import OfferTabContent from '@/app/mypage/posts/[postId]/recruitment/_components/offer-tab-content';
import DefaultTooltip from '@/components/commons/tooltip/default-tooltip';
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
      <div className="flex gap-3 items-center">
        <h3 className="heading-lg">AI가 추천하는 회원을 탐색해 보세요</h3>
        <DefaultTooltip
          content="회원님이 게시한 모집글 정보를 바탕으로 
  가장 잘 맞을 지원자를 꼽아 추천해요.
  목록에서 프로필을 확인하고 바로 합류 제안을 보내보세요."
        />
      </div>
      <OfferTabContent postId={postId} users={profiles} />
    </div>
  );
}
