'use client';

import ProfileContent from '@/app/profile/_components/profile-content';
import Button from '@/components/commons/buttons/button';
import useGetMyPostApplicantProfile from '@/hooks/my/use-get-my-post-applicant-profile';
import useToast from '@/hooks/use-toast';

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
  const toast = useToast();

  if (!profile) return null;

  return (
    <ProfileContent
      nickname={profile.nickname}
      // TODO: 제안 상황에 따라 버튼 변경
      controller={
        <Button
          variant="solid"
          className="w-fit h-fit py-3 px-5 rounded-full body-md-medium"
          onClick={() => toast({ title: '준비중입니다.' })}
        >
          제안하기
        </Button>
      }
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
