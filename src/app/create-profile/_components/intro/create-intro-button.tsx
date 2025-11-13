import { overlay } from 'overlay-kit';
import { INTERESTS, TECH_STACKS } from '@/constants/profile.constant';
import type { ProfileFormData } from '@/schemas/user.schema';
import type { AiRequestDataType } from '@/types/profile.type';
import {
  convertActivityModeValue,
  convertAgeValue,
  convertExperienceValue,
} from '@/utils/profile.util';
import CreateIntroModal from './create-intro-modal';

interface CreateIntroButtonProps {
  ProfileFormData: ProfileFormData;
}

/**
 * AI 자기소개 생성 버튼
 * @param ProfileFormData - Zod 프로필 스키마 타입의 프로필 데이터
 */
export default function CreateIntroButton({
  ProfileFormData: {
    nickname,
    age,
    experience,
    activityMode,
    links,
    role,
    interests,
    techStacks,
    intro,
  },
}: CreateIntroButtonProps) {
  // 요청 타입에 맞도록 변환
  const data: AiRequestDataType = {
    nickname,
    ageBand: convertAgeValue(age),
    experience: convertExperienceValue(experience),
    activityMode: convertActivityModeValue(activityMode),
    introText: intro,
    profileUrls: links
      .filter((url) => url.value !== '')
      .map((url) => url.value),
    roles: [role],
    interestKeywords: interests.map((interest) => INTERESTS[interest]),
    techSkills: techStacks.map((stack) => TECH_STACKS[stack]),
  };

  return (
    <button
      onClick={() => {
        overlay.open(({ isOpen, close }) => (
          <CreateIntroModal isOpen={isOpen} onClose={close} data={data} />
        ));
      }}
      className="border border-border-brand text-brand body-lg-medium h-[34px] w-[140px] rounded-md bg-surface py-2 ml-3 hover:bg-button-ai"
      type="button"
    >
      AI로 초안 작성
    </button>
  );
}
