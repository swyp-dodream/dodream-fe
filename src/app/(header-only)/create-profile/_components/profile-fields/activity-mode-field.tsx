import type { ComponentPropsWithRef } from 'react';
import Dropdown from '@/components/commons/dropdown';
import {
  ACTIVITY_MODE,
  ACTIVITY_MODE_LIST,
} from '@/constants/profile.constant';
import type { ActivityModeType } from '@/types/profile.type';

interface ActivityModeFieldProps {
  value: ActivityModeType | undefined;
  onChange: (value: string) => void;
  error?: string;
  ref?: ComponentPropsWithRef<'button'>['ref'];
}

/**
 * 선호 방식 선택 컴포넌트
 * @param value - 현재 선택된 선호 방식
 * @param onChange - 선호 방식 변경 핸들러
 * @param error - 검증 에러 메시지
 */
export default function ActivityModeField({
  value,
  onChange,
  error,
  ref,
}: ActivityModeFieldProps) {
  const displayLabel = value ? ACTIVITY_MODE[value] : '선호 방식 선택';

  return (
    <div className="flex justify-between">
      <span className="body-lg-medium py-3">선호 방식</span>
      <div className="flex flex-col">
        <Dropdown
          ref={ref}
          label={displayLabel}
          items={ACTIVITY_MODE_LIST.map((activityMode) => ({
            label: activityMode.label,
            onSelect: () => onChange(activityMode.value),
          }))}
          isError={!!error}
        />
        {error && <p className="body-sm-medium text-error mt-2">{error}</p>}
      </div>
    </div>
  );
}
