'use client';

import useGetMyPostApplicantProfile from '@/hooks/my/use-get-my-post-applicant-profile';

interface ProfileContentProps {
  userId: bigint;
  postId: bigint;
}

/** 프로필 내용 컴포넌트 */
export default function ProfileContent({
  userId,
  postId,
}: ProfileContentProps) {
  const { data: profile } = useGetMyPostApplicantProfile(postId, userId);

  return <div>ProfileContent</div>;
}
