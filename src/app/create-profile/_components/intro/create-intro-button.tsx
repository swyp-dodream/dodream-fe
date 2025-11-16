import { overlay } from 'overlay-kit';
import { INTERESTS } from '@/constants/profile.constant';
import type {
  ActivityModeType,
  AgeRangeType,
  AiRequestType,
  ExperienceType,
  InterestsType,
  LinkItemType,
  RoleType,
  TechStackType,
} from '@/types/profile.type';
import {
  convertActivityModeValue,
  convertAgeValue,
  convertExperienceValue,
} from '@/utils/profile.util';
import CreateIntroModal from './create-intro-modal';

interface CreateIntroButtonProps {
  nickname: string;
  age: AgeRangeType | null;
  experience: ExperienceType;
  activityMode: ActivityModeType;
  links: LinkItemType[];
  role: RoleType;
  interests: InterestsType[];
  techStacks: TechStackType[];
  intro: string;
  setIntro: (text: string) => void;
}

/**
 * AI 자기소개 생성 버튼
 * @param ProfileFormData - Zod 프로필 스키마 타입의 프로필 데이터
 * @param setIntro - 자기소개 생성 완료 시 텍스트 필드에 저장하는 함수
 */
export default function CreateIntroButton({
  nickname,
  age,
  experience,
  activityMode,
  links,
  role,
  interests,
  techStacks,
  intro,
  setIntro,
}: CreateIntroButtonProps) {
  // 요청 타입에 맞도록 변환
  const data: AiRequestType = {
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
    techSkills: techStacks,
  };

  return (
    <button
      onClick={() => {
        overlay.open(({ isOpen, close }) => (
          <CreateIntroModal
            isOpen={isOpen}
            onClose={close}
            data={data}
            setIntro={setIntro}
          />
        ));
      }}
      className="border border-border-brand text-brand body-lg-medium h-[34px] w-[140px] rounded-md bg-surface py-2 ml-3 hover:bg-button-ai"
      type="button"
    >
      AI로 초안 작성
    </button>
  );
}
