'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { overlay } from 'overlay-kit';
import { useState } from 'react';
import { Controller, type Resolver, useForm } from 'react-hook-form';
import { ulid } from 'ulid';
import WelcomeModal from '@/app/auth/_components/welcome-modal';
import Button from '@/components/commons/buttons/button';
import LoadingSpinner from '@/components/commons/loading-spinner';
import ProfileImage from '@/components/commons/profile-image';
import ProgressBar from '@/components/commons/progress-bar';
import TextField from '@/components/commons/text-fields/text-field';
import Toggle from '@/components/commons/toggle';
import DefaultTooltip from '@/components/commons/tooltip/default-tooltip';
import { StaticTooltip } from '@/components/commons/tooltip/static-tooltip';
import { useLogoutOnLeave } from '@/hooks/auth/use-logout-on-leave';
import useCreateProfile from '@/hooks/profile/use-create-profile';
import { type ProfileFormData, profileFormSchema } from '@/schemas/user.schema';
import { clientApis } from '@/services/client.api';
import type {
  ActivityModeType,
  AgeRangeType,
  ExperienceType,
  RoleType,
} from '@/types/profile.type';
import CreateIntroButton from './intro/create-intro-button';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1); // 현재 페이지
  const { mutate: createProfile, isPending } = useCreateProfile();

  // 생성하지 않고 벗어나면 로그아웃 처리
  const { preventLogout } = useLogoutOnLeave();

  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    setError,
    setFocus,
    clearErrors, // 에러 후 재입력하면 에러 제거
    setValue, // 드롭다운 값 설정용
  } = useForm<ProfileFormData>({
    resolver: zodResolver(
      profileFormSchema,
    ) as unknown as Resolver<ProfileFormData>,
    mode: 'onSubmit',
    // 디폴트 값
    defaultValues: {
      nickname: '',
      age: undefined,
      gender: undefined,
      role: undefined,
      experience: undefined,
      activityMode: undefined,
      techStacks: [],
      interests: [],
      links: [{ id: ulid(), value: '' }],
      intro: '',
      acceptOffers: true,
    },
  });

  /**
   * 다음 페이지 이동 핸들러
   */
  const handleNextStep = async () => {
    // 1페이지 필드 검증
    const isValid = await trigger(
      [
        'nickname',
        'age',
        'gender',
        'role',
        'experience',
        'activityMode',
        'interests',
        'links',
      ],
      { shouldFocus: true },
    );

    if (!isValid) {
      return;
    }

    // 닉네임 중복 체크
    try {
      const { available } = await clientApis.profile.checkNickname(
        watch('nickname'),
      );
      if (!available) {
        setError('nickname', {
          type: 'server',
          message: '중복된 닉네임입니다',
        });
        setFocus('nickname');
        return;
      }

      // 다음 페이지로 이동
      setStep(2);
    } catch {
      console.error('닉네임 확인 중 오류가 발생했습니다.');
    }
  };

  /**
   * 프로필 생성 제출 핸들러
   * @param data - 프로필 폼 데이터
   */
  const handleProfileSubmit = async (data: ProfileFormData) => {
    // 2페이지 필드 검증
    const isValid = await trigger(['intro'], { shouldFocus: true });

    if (!isValid) return;

    // 제출 처리
    createProfile(data, {
      onSuccess: () => {
        // 로그아웃 방지
        preventLogout();

        // 성공 시 원래 페이지로 리다이렉트
        const redirectPath = searchParams.get('redirect');
        router.replace(redirectPath || '/');
        router.refresh();

        overlay.open(({ isOpen, close }) => (
          <WelcomeModal isOpen={isOpen} onClose={close} />
        ));
      },
    });
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
          <section className="flex gap-8 py-8">
            <ProfileImage src={null} size={120} />
            <NicknameField
              value={watch('nickname')}
              {...register('nickname', {
                onChange: () => clearErrors('nickname'),
              })}
              error={errors.nickname?.message}
            />
          </section>

          <div className="flex flex-col gap-8">
            {/* 연령대 선택 */}
            <Controller
              name="age"
              control={control}
              render={({ field, fieldState }) => (
                <AgeField
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            {/* 성별 선택 */}
            <Controller
              name="gender"
              control={control}
              render={({ field, fieldState }) => (
                <GenderField
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            {/* 직군 선택 */}
            <Controller
              name="role"
              control={control}
              render={({ field, fieldState }) => (
                <RoleField
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            {/* 경력 선택 */}
            <Controller
              name="experience"
              control={control}
              render={({ field, fieldState }) => (
                <ExperienceField
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            {/* 선호 방식 선택 */}
            <Controller
              name="activityMode"
              control={control}
              render={({ field, fieldState }) => (
                <ActivityModeField
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            {/* 기술 스택 선택 */}
            <TechStacksField
              stacks={watch('techStacks')}
              onChange={(stacks) => setValue('techStacks', stacks)}
            />

            {/* 관심 분야 선택 */}
            <Controller
              name="interests"
              control={control}
              render={({ field, fieldState }) => (
                <InterestsField
                  interests={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
            {/* 링크 선택 */}
            <LinkField
              links={watch('links')}
              onLinksChange={(links) => setValue('links', links)}
            />
          </div>
        </fieldset>
      )}

      {/* 추가 정보 필드 */}
      {step === 2 && (
        <fieldset className="flex flex-col gap-12">
          <legend className="sr-only">추가 정보</legend>
          {/* 자기소개 */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center">
              <h3 className="heading-lg flex-1">자기소개</h3>
              <DefaultTooltip
                content="회원님이 작성한 프로필 정보를 바탕으로 AI가 자기소개 초안을
                작성해 주는 서비스예요. 현재까지 입력해 주신 기본정보와 자기소개
                내용이 반영되어 작성돼요."
              />
              {/* AI 초안 생성 버튼 */}
              <CreateIntroButton
                nickname={watch('nickname')}
                age={watch('age') as AgeRangeType}
                experience={watch('experience') as ExperienceType}
                activityMode={watch('activityMode') as ActivityModeType}
                links={watch('links') || []}
                role={watch('role') as RoleType}
                interests={watch('interests')}
                techStacks={watch('techStacks')}
                intro={watch('intro') || ''}
                setIntro={(text) => setValue('intro', text)}
              />
            </div>
            <TextField
              className="w-full"
              placeholder="자기소개를 작성해 주세요."
              maxLength={500}
              resizable={false}
              value={watch('intro')}
              {...register('intro', {
                onChange: () => clearErrors('intro'),
              })}
              error={errors.intro?.message}
            />
          </div>

          {/* 매칭 설정 */}
          <div className="flex flex-col gap-8">
            <div className="flex gap-3 items-center">
              <h3 className="heading-lg">매칭 설정</h3>
              <DefaultTooltip content="완성된 프로필 정보는 AI 매칭에 활용됩니다. 회원님과 꼭맞는 프로젝트의 모집자로부터 먼저 프로젝트 합류 제안을 받을 수 있어요." />
            </div>
            <div className="flex justify-between">
              <label className="body-lg-medium" htmlFor="acceptOffers">
                지원 제안 받기
              </label>
              <Toggle
                id="acceptOffers"
                checked={watch('acceptOffers')}
                onCheckedChange={(checked) => setValue('acceptOffers', checked)}
              />
            </div>
          </div>
        </fieldset>
      )}

      <footer className="flex justify-between mt-20">
        {/* 진행률 */}
        <div className="flex gap-4 items-center">
          <ProgressBar value={step} max={2} />
          <span className="body-sm-regular">{step}/2</span>
        </div>

        {/* 다음/이전/저장 버튼 */}
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
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setStep(1)}
              >
                이전
              </Button>
              <Button
                type="submit"
                variant="solid"
                size="sm"
                disabled={isPending}
              >
                {isPending ? (
                  <LoadingSpinner variant="sm" className="m-auto" />
                ) : (
                  '저장'
                )}
              </Button>
            </div>
          )}
        </div>
      </footer>
    </form>
  );
}
