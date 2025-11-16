'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import profileApi from '@/apis/profile.api';
import CreateIntroButton from '@/app/create-profile/_components/intro/create-intro-button';
import ActivityModeField from '@/app/create-profile/_components/profile-fields/activity-mode-field';
import ExperienceField from '@/app/create-profile/_components/profile-fields/experience-field';
import InterestsField from '@/app/create-profile/_components/profile-fields/interests-field';
import LinkField from '@/app/create-profile/_components/profile-fields/link-field';
import RoleField from '@/app/create-profile/_components/profile-fields/role-field';
import TechStacksField from '@/app/create-profile/_components/profile-fields/tech-stack-field';
import NicknameField from '@/app/create-profile/_components/profile-fields/user-info/nickname-field';
import Button from '@/components/commons/buttons/button';
import TextField from '@/components/commons/text-fields/text-field';
import DefaultTooltip from '@/components/commons/tooltip/default-tooltip';
import { useGetProfile } from '@/hooks/profile/use-get-profile';
import useUpdateProfile from '@/hooks/profile/use-update-profile';
import useToast from '@/hooks/use-toast';
import {
  type ProfileEditFormData,
  profileEditFormSchema,
} from '@/schemas/user.schema';
import useProfileStore from '@/store/profile-store';
import type {
  ActivityModeType,
  ExperienceType,
  InterestsType,
  LinkItemType,
  RoleType,
  TechStackType,
} from '@/types/profile.type';
import {
  parseActivityModeValue,
  parseExperienceValue,
  parseInterestsValue,
  parseRoleValue,
} from '@/utils/profile.util';

export default function ProfileEditContent() {
  const { data: profile } = useGetProfile(); // 프로필
  const { mutate: updateProfile } = useUpdateProfile();

  const techStacks = useProfileStore((state) => state.techStacks); // 기술 스택
  const setStacks = useProfileStore((state) => state.setStacks);
  const interests = useProfileStore((state) => state.interests); // 관심 분야
  const setInterests = useProfileStore((state) => state.setInterests);
  const [links, setLinks] = useState<LinkItemType[]>([{ id: '', value: '' }]); // 링크

  const router = useRouter();
  const toast = useToast();

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setFocus,
    clearErrors, // 에러 후 재입력하면 에러 제거
    setValue, // 드롭다운 값 설정용
  } = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    // 디폴트 값
    defaultValues: {
      nickname: '',
      role: null,
      experience: null,
      activityMode: null,
      intro: '',
    },
  });

  // profile 데이터 로드 시 폼 값 설정
  useEffect(() => {
    if (profile) {
      // 폼 값 설정
      setValue('nickname', profile.nickname);
      setValue('role', parseRoleValue(profile.roles[0].name));
      setValue('experience', parseExperienceValue(profile.experience));
      setValue('activityMode', parseActivityModeValue(profile.activityMode));
      setValue('intro', profile.introText || '');

      // 링크 설정
      if (profile.profileUrls && profile.profileUrls.length > 0) {
        const convertedLinks = profile.profileUrls.map((url) => ({
          id: url.id.toString(),
          value: url.url,
        }));
        setLinks(convertedLinks);
      }

      // 기술 스택 설정
      if (profile.techSkills && profile.techSkills.length > 0) {
        setStacks(
          profile.techSkills.map((skill) => skill.name as TechStackType),
        );
      }

      // 관심 분야 설정
      if (profile.interestKeywords && profile.interestKeywords.length > 0) {
        setInterests(
          profile.interestKeywords
            .map((interest) => parseInterestsValue(interest.name))
            .filter((interest): interest is InterestsType => interest !== null),
        );
      }
    }
  }, [profile, setValue, setStacks, setInterests]);

  // interests 변경 시 폼에 자동 동기화
  useEffect(() => {
    setValue('interests', interests);
    clearErrors('interests');
  }, [interests, setValue, clearErrors]);

  // techStacks 변경 시 폼에 자동 동기화
  useEffect(() => {
    setValue('techStacks', techStacks);
  }, [techStacks, setValue]);

  // links 변경 시 폼에 자동 동기화
  useEffect(() => {
    setValue('links', links);
  }, [links, setValue]);

  if (!profile) return null;

  const handleProfileSubmit = async (data: ProfileEditFormData) => {
    // 닉네임 중복 체크
    try {
      const { available } = await profileApi.checkNickname(data.nickname);
      if (!available) {
        setError('nickname', {
          type: 'server',
          message: '중복된 닉네임입니다',
        });
        setFocus('nickname');
        return;
      }
    } catch {
      console.error('닉네임 확인 중 오류가 발생했습니다.');
      return;
    }

    // 제출 처리
    updateProfile(data, {
      onSuccess: () => {
        router.push('/profile/me');
      },
      onError: () => {
        toast({
          title: '변경사항을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.',
        });
      },
    });
  };

  return (
    <form
      className="flex flex-col gap-12"
      onSubmit={handleSubmit(handleProfileSubmit)}
    >
      {/* 기본 정보 필드 */}
      <fieldset>
        <legend className="heading-lg">기본 정보</legend>

        {/* 유저 정보 - 프로필 이미지 및 닉네임 */}
        <section className="flex gap-8 py-8">
          {/* TODO: 이미지 컴포넌트 분리 및 수정 */}
          <div className="w-[120px] h-[120px] bg-primary rounded-full" />
          <NicknameField
            value={watch('nickname')}
            {...register('nickname', {
              onChange: () => clearErrors('nickname'),
            })}
            error={errors.nickname?.message}
          />
        </section>

        <div className="flex flex-col gap-8">
          {/* 직군 선택 */}
          <RoleField
            ref={register('role').ref}
            value={watch('role') as RoleType | null}
            onChange={(value: string) => {
              setValue('role', value as RoleType);
              clearErrors('role');
            }}
            error={errors.role?.message}
          />

          {/* 경력 선택 */}
          <ExperienceField
            ref={register('experience').ref}
            value={watch('experience') as ExperienceType | null}
            onChange={(value: string) => {
              setValue('experience', value as ExperienceType);
              clearErrors('experience');
            }}
            error={errors.experience?.message}
          />

          {/* 선호 방식 선택 */}
          <ActivityModeField
            ref={register('activityMode').ref}
            value={watch('activityMode') as ActivityModeType | null}
            onChange={(value: string) => {
              setValue('activityMode', value as ActivityModeType);
              clearErrors('activityMode');
            }}
            error={errors.activityMode?.message}
          />

          {/* 기술 스택 선택 */}
          <TechStacksField />

          {/* 관심 분야 선택 */}
          <InterestsField error={errors.interests?.message} />

          {/* 링크 선택 */}
          <LinkField links={links} onLinksChange={setLinks} />
        </div>
      </fieldset>

      {/* 추가 정보 필드 */}
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
              age={null}
              experience={watch('experience') as ExperienceType}
              activityMode={watch('activityMode') as ActivityModeType}
              links={links}
              role={watch('role') as RoleType}
              interests={interests}
              techStacks={techStacks}
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
      </fieldset>

      <footer className="flex justify-end">
        <Button variant="solid" type="submit">
          저장
        </Button>
      </footer>
    </form>
  );
}
