'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ulid } from 'ulid';
import api from '@/apis/api';
import Button from '@/components/commons/buttons/button';
import ProgressBar from '@/components/commons/progress-bar';
import { StaticTooltip } from '@/components/commons/tooltip/static-tooltip';
import { type ProfileFormData, profileFormSchema } from '@/schemas/user.schema';
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
  // const interests = useProfileStore((state) => state.interests);

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    setError,
    clearErrors,
    setFocus,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      nickname: '',
    },
  });

  /**
   * 다음 페이지 이동 핸들러
   */
  const handleNextStep = async () => {
    // 1페이지 필드들만 검증
    const isValid = await trigger(['nickname']);

    if (!isValid) {
      setFocus('nickname');
      return;
    }

    // 닉네임 중복 체크
    // TODO: 함수 객체로 이동
    const response = await api.get<{ available: boolean; nickname: string }>(
      `/api/profiles/check-nickname?${watch('nickname')}`,
    );

    if (response.available) {
      setError('nickname', { message: '중복된 닉네임입니다' });
      return;
    }

    // 다음 페이지로 이동
    setStep(2);
  };

  /**
   * 프로필 생성 제출 핸들러
   * @param data - 프로필 폼 데이터
   */
  const handleProfileSubmit = (data: ProfileFormData) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(handleProfileSubmit)}
    >
      {/* 기본 정보 필드 */}
      {step === 1 && (
        <fieldset>
          <legend className="heading-lg">기본 정보</legend>

          {/* 유저 정보 - 프로필 이미지 및 닉네임 */}
          <div className="flex gap-8 py-8">
            {/* TODO: 이미지 컴포넌트 분리 및 수정 */}
            <div className="w-[120px] h-[120px] bg-primary rounded-full" />
            <NicknameField
              value={watch('nickname')}
              {...register('nickname', {
                onChange: () => clearErrors('nickname'),
              })}
              error={errors.nickname?.message}
            />
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
              onClick={handleNextStep}
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
