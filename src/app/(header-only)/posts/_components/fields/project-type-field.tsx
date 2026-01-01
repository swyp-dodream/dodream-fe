import { Controller, useFormContext } from 'react-hook-form';
import { RoleTabs } from '@/components/features/mypage/my-posts/recruitments/role-tabs';

export default function ProjectTypeField() {
  const { control } = useFormContext();

  return (
    <Controller
      name="projectType"
      control={control}
      render={({ field }) => (
        <div className="flex items-center justify-between">
          <span className="body-lg-medium text-primary">모집 유형</span>
          <RoleTabs value={field.value} onValueChange={field.onChange}>
            <RoleTabs.List>
              <RoleTabs.Trigger value="PROJECT">프로젝트</RoleTabs.Trigger>
              <RoleTabs.Trigger value="STUDY">스터디</RoleTabs.Trigger>
            </RoleTabs.List>
          </RoleTabs>
        </div>
      )}
    />
  );
}
