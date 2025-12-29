'use client';

import { DropdownMenu } from 'radix-ui';
import { useFormContext } from 'react-hook-form';
import FieldErrorMessage from '@/app/(header-only)/posts/_components/field-error-message';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from '@/components/commons/buttons/dropdown-button';
import { ACTIVITY_MODE } from '@/constants/profile.constant';
import type { PostCreateFormData } from '@/schemas/post.schema';

export default function ActivityModeField() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<PostCreateFormData>();
  const activityMode = watch('activityMode');

  const handleSelect = (value: PostCreateFormData['activityMode']) => {
    setValue('activityMode', value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="body-lg-medium text-primary">활동 방식</span>

        <ActivityModeDropdown
          selected={activityMode}
          onSelect={handleSelect}
          isError={!!errors.activityMode?.message}
        />
      </div>
      {errors && (
        <FieldErrorMessage className="flex justify-end">
          {errors.activityMode?.message}
        </FieldErrorMessage>
      )}
    </div>
  );
}

const OPTIONS: Array<{
  label: string;
  value: NonNullable<PostCreateFormData['activityMode']>;
}> = [
  { label: ACTIVITY_MODE.ONLINE, value: 'ONLINE' },
  { label: ACTIVITY_MODE.OFFLINE, value: 'OFFLINE' },
  { label: ACTIVITY_MODE.HYBRID, value: 'HYBRID' },
];

const ACTIVITY_MODE_LABEL: Record<
  NonNullable<PostCreateFormData['activityMode']>,
  string
> = {
  ONLINE: ACTIVITY_MODE.ONLINE,
  OFFLINE: ACTIVITY_MODE.OFFLINE,
  HYBRID: ACTIVITY_MODE.HYBRID,
};

interface ActivityModeDropdownProps {
  selected?: PostCreateFormData['activityMode'];
  onSelect: (value: PostCreateFormData['activityMode']) => void;
  isError?: boolean;
}

function ActivityModeDropdown({
  selected,
  onSelect,
  isError,
}: ActivityModeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <DropdownButton
          label={selected ? ACTIVITY_MODE_LABEL[selected] : '활동 방식 선택'}
          isError={isError}
        >
          <ArrowIcon className="text-icon-light group-data-[state=open]:rotate-180" />
        </DropdownButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-surface rounded-md shadow-card p-3 w-[180px] space-y-2 body-md-medium">
          {OPTIONS.map((option) => (
            <DropdownMenu.Item
              key={option.value}
              onSelect={() => onSelect(option.value)}
              className="px-2 py-2 rounded outline-none transition cursor-pointer hover:bg-primary"
              data-state={selected === option.value ? 'active' : undefined}
            >
              {option.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
