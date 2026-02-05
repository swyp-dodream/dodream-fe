import { overlay } from 'overlay-kit';
import {
  INTERESTS,
  INTERESTS_ID_MAP,
  TECH_STACK_ID_MAP,
} from '@/constants/profile.constant';
import type {
  ActivityModeType,
  AgeRangeType,
  AiRequestType,
  ExperienceType,
  LinkItemType,
  RoleType,
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
  interests: number[];
  techStacks: number[];
  intro: string;
  setIntro: (text: string) => void;
}

/**
 * AI 자기소개 생성 버튼
 * @param nickname - 닉네임
 * @param age - 나이
 * @param experience - 경력
 * @param activityMode - 선호 활동 방식
 * @param links - 프로필 URL
 * @param role - 직군
 * @param interests - 관심 분야
 * @param techStacks - 기술 스택
 * @param intro - 자기소개
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
    interestKeywords: interests.map((id) => INTERESTS[INTERESTS_ID_MAP[id]]),
    techSkills: techStacks.map((id) => TECH_STACK_ID_MAP[id]),
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
      className="border border-border-brand text-brand body-lg-medium h-8.5 w-35 rounded-md bg-surface py-2 ml-3 hover:bg-button-ai"
      type="button"
    >
      AI로 초안 작성
    </button>
  );
}
