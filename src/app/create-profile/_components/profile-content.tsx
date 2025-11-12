'use client';

import { useState } from 'react';
import { ulid } from 'ulid';
import Button from '@/components/commons/buttons/button';
import ProgressBar from '@/components/commons/progress-bar';
import { StaticTooltip } from '@/components/commons/tooltip/static-tooltip';
import useProfileStore from '@/store/profile-store';
import type {
  ActivityModeType,
  AgeRangeType,
  ExperienceType,
  GenderType,
  LinkItemType,
  RoleType,
} from '@/types/profile.type';
import ActivityModeField from './profile-fields/activity-mode-field';
import AgeField from './profile-fields/age-field';
import ExperienceField from './profile-fields/experience-field';
import GenderField from './profile-fields/gender-field';
import InterestsField from './profile-fields/interests-field';
import LinkField from './profile-fields/link-field';
import RoleField from './profile-fields/role-field';
import TechStacksField from './profile-fields/tech-stack-field';
import NicknameField from './profile-fields/user-info/nickname-field';

export default function ProfileContent() {
  // 현재 페이지
  const [step, setStep] = useState(1);

  // 필드 상태
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState<AgeRangeType | null>(null);
  const [gender, setGender] = useState<GenderType | null>(null);
  const [role, setRole] = useState<RoleType | null>(null);
  const [experience, setExperience] = useState<ExperienceType | null>(null);
  const [activityMode, setActivityMode] = useState<ActivityModeType | null>(
    null,
  );
  const [links, setLinks] = useState<LinkItemType[]>([
    { id: ulid(), value: '' },
  ]);

  // 관심 분야
  const interests = useProfileStore((state) => state.interests);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // 모든 필드가 입력되었는지 여부
  const isAnyFormEmpty =
    nickname === '' ||
    age === null ||
    gender === null ||
    role === null ||
    experience === null ||
    activityMode === null ||
    interests.length === 0;

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      {/* 기본 정보 필드 */}
      {step === 1 && (
        <fieldset>
          <legend className="heading-lg">기본 정보</legend>

          {/* 유저 정보 - 프로필 이미지 및 닉네임 */}
          <div className="flex gap-8 py-8">
            {/* TODO: 이미지 컴포넌트 분리 및 수정 */}
            <div className="w-[120px] h-[120px] bg-primary rounded-full" />
            <NicknameField nickname={nickname} setNickname={setNickname} />
          </div>

          <div className="flex flex-col gap-8">
            {/* 연령대 선택 */}
            <AgeField age={age} setAge={setAge} />

            {/* 성별 선택 */}
            <GenderField gender={gender} setGender={setGender} />

            {/* 직군 선택 */}
            <RoleField role={role} setRole={setRole} />

            {/* 경력 선택 */}
            <ExperienceField
              experience={experience}
              setExperience={setExperience}
            />

            {/* 선호 방식 선택 */}
            <ActivityModeField
              activityMode={activityMode}
              setActivityMode={setActivityMode}
            />

            {/* 기술 스택 선택 */}
            <TechStacksField />

            {/* 관심 분야 선택 */}
            <InterestsField />

            {/* 링크 선택 */}
            <LinkField links={links} onLinksChange={setLinks} />
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="heading-lg">추가 정보</legend>
          {/* 추가 정보 입력 필드들 */}
        </fieldset>
      )}

      <div className="flex justify-between mt-20">
        {/* 진행률 */}
        <div className="flex gap-4 items-center">
          <ProgressBar value={50} />
          <span className="body-sm-regular">1/2</span>
        </div>

        {/* 다음 버튼 */}
        <div className="relative">
          <StaticTooltip>입력한 정보는 나중에 수정 가능해요</StaticTooltip>
          {step === 1 ? (
            <Button
              type="button"
              variant="solid"
              size="sm"
              disabled={isAnyFormEmpty}
              onClick={() => setStep(2)}
            >
              다음
            </Button>
          ) : (
            <Button type="submit" variant="solid" size="sm">
              저장
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
