'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DeleteAccountButton from '@/app/(default-layout)/mypage/settings/_components/delete-account-button';
import AgeField from '@/app/(header-only)/create-profile/_components/profile-fields/age-field';
import GenderField from '@/app/(header-only)/create-profile/_components/profile-fields/gender-field';
import Button from '@/components/commons/buttons/button';
import Input from '@/components/commons/text-fields/input';
import Toggle from '@/components/commons/toggle';
import DefaultTooltip from '@/components/commons/tooltip/default-tooltip';
import MyPageHeader from '@/components/features/mypage/commons/mypage-header';
import useGetProfileSettings from '@/hooks/profile/use-get-profile-settings';
import useUpdateProfileSettings from '@/hooks/profile/use-update-profile-settings';
import {
  type UpdateProfileSettingsFormData,
  updateProfileSettingsFormSchema,
} from '@/schemas/profile.schema';
import {
  convertAgeValue,
  convertGenderValue,
  parseAgeValue,
  parseGenderValue,
} from '@/utils/profile.util';

export default function SettingsPage() {
  const { data: settings } = useGetProfileSettings();
  const { mutate: updateProfileSettings } = useUpdateProfileSettings();
  const {
    control,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<UpdateProfileSettingsFormData>({
    resolver: zodResolver(updateProfileSettingsFormSchema),
  });
  const acceptOffers = watch('proposalProjectOn') && watch('proposalStudyOn');

  const onSubmit = handleSubmit((values) => {
    if (!isDirty) return;
    updateProfileSettings(values);
  });

  useEffect(() => {
    if (settings) {
      reset({
        gender: settings.gender,
        ageBand: settings.ageBand,
        proposalProjectOn: settings.proposalProjectOn,
        proposalStudyOn: settings.proposalStudyOn,
        isPublic: settings.isPublic,
      });
    }
  }, [settings, reset]);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-9">
        <MyPageHeader title="계정 설정" />

        <form
          id="settings-form"
          className="flex flex-col gap-9"
          noValidate
          onSubmit={onSubmit}
        >
          <h3 className="heading-lg text-gray-content-primary">계정 정보</h3>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <span className="body-lg-medium text-primary">로그인 정보</span>
                <Input
                  disabled
                  value={settings?.email ?? ''}
                  className="text-subtle"
                />
              </div>

              <Controller
                name="ageBand"
                control={control}
                render={({ field }) => (
                  <AgeField
                    value={parseAgeValue(field.value)}
                    onChange={(next) => field.onChange(convertAgeValue(next))}
                  />
                )}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <GenderField
                    value={parseGenderValue(field.value)}
                    onChange={(next) =>
                      field.onChange(convertGenderValue(next))
                    }
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex gap-3 items-center">
                <h3 className="heading-lg text-gray-content-primary">
                  매칭 설정
                </h3>
                <DefaultTooltip content="완성된 프로필 정보는 AI 매칭에 활용됩니다. 회원님과 꼭맞는 프로젝트의 모집자로부터 먼저 프로젝트 합류 제안을 받을 수 있어요." />
              </div>
              <div className="flex justify-between">
                <label className="body-lg-medium" htmlFor="acceptOffers">
                  지원 제안 받기
                </label>
                <Toggle
                  id="acceptOffers"
                  checked={acceptOffers}
                  onCheckedChange={(next) => {
                    setValue('proposalProjectOn', next, { shouldDirty: true });
                    setValue('proposalStudyOn', next, { shouldDirty: true });
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <footer className="flex flex-col gap-8 items-end">
        <Button
          type="submit"
          variant="solid"
          form="settings-form"
          disabled={!isDirty}
        >
          저장
        </Button>
        <DeleteAccountButton />
      </footer>
    </div>
  );
}
