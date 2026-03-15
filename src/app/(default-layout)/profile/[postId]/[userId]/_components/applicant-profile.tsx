'use client';

import ProfileContent from '@/components/features/profile/profile-content';
import useGetMyPostApplicantProfile from '@/hooks/my/use-get-my-post-applicant-profile';

interface ApplicantProfileProps {
  postId: bigint;
  userId: bigint;
}

/**
 * 지원자 프로필 확인
 * @param postId - 모집글 ID
 * @param userId - 지원자 ID
 */
export default function ApplicantProfile({
  postId,
  userId,
}: ApplicantProfileProps) {
  const { data: profile } = useGetMyPostApplicantProfile(postId, userId);

  if (!profile) return null;

  return (
    <ProfileContent
      userId={userId}
      nickname={profile.nickname}
      profileImage={profile.profileImageCode}
      role={profile.roles[0].name}
      experience={profile.experience}
      introText={profile.introText}
      interests={profile.interestKeywords}
      activityMode={profile.activityMode}
      profileUrls={profile.profileUrls}
      techSkills={profile.techSkills.map((stack) => stack.name)}
    />
  );
}
