import { DropdownMenu } from 'radix-ui';
import { useFormContext } from 'react-hook-form';
import FieldErrorMessage from '@/app/posts/_components/field-error-message';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from '@/components/commons/buttons/dropdown-button';
import type { PostCreateFormData } from '@/schemas/post.schema';

export default function DurationField() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<PostCreateFormData>();
  const duration = watch('duration');

  const handleSelect = (value: NonNullable<PostCreateFormData['duration']>) => {
    setValue('duration', value, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="body-lg-medium text-primary">활동 기간</span>

        <DurationDropdown
          selected={duration}
          onSelect={handleSelect}
          isError={!!errors.duration}
        />
      </div>
      {errors && (
        <FieldErrorMessage className="flex justify-end">
          {errors.duration?.message}
        </FieldErrorMessage>
      )}
    </div>
  );
}

const OPTIONS: Array<{
  label: string;
  value: NonNullable<PostCreateFormData['duration']>;
}> = [
  { label: '미정', value: 'UNDECIDED' },
  { label: '1개월 미만', value: 'UNDER_ONE_MONTH' },
  { label: '1개월', value: 'ONE_MONTH' },
  { label: '2개월', value: 'TWO_MONTHS' },
  { label: '3개월', value: 'THREE_MONTHS' },
  { label: '4개월', value: 'FOUR_MONTHS' },
  { label: '5개월', value: 'FIVE_MONTHS' },
  { label: '6개월', value: 'SIX_MONTHS' },
  { label: '장기', value: 'LONG_TERM' },
];

const DURATION_LABEL: Record<
  NonNullable<PostCreateFormData['duration']>,
  string
> = OPTIONS.reduce(
  (acc, option) => {
    acc[option.value] = option.label;
    return acc;
  },
  {} as Record<NonNullable<PostCreateFormData['duration']>, string>,
);

interface DurationDropdownProps {
  selected?: PostCreateFormData['duration'];
  onSelect: (value: NonNullable<PostCreateFormData['duration']>) => void;
  isError: boolean;
}

function DurationDropdown({
  selected,
  onSelect,
  isError,
}: DurationDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <DropdownButton
          label={selected ? DURATION_LABEL[selected] : '활동 기간 선택'}
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
