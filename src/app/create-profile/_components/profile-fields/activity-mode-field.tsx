import type { Dispatch, SetStateAction } from 'react';
import Dropdown from '@/components/commons/dropdown';
import {
  ACTIVITY_MODE,
  ACTIVITY_MODE_LIST,
} from '@/constants/profile.constant';
import type { ActivityModeType } from '@/types/profile.type';

interface ActivityModeFieldProps {
  activityMode: ActivityModeType | null;
  setActivityMode: Dispatch<SetStateAction<ActivityModeType | null>>;
}

/**
 * 선호 방식 선택 컴포넌트
 * @param activityMode - 선호 방식
 * @param setActivityMode - 선호 방식 set 함수
 */
export default function ActivityModeField({
  activityMode,
  setActivityMode,
}: ActivityModeFieldProps) {
  const displayLabel = activityMode
    ? ACTIVITY_MODE[activityMode]
    : '선호 방식 선택'; // 선택되지 않았을 경우 기본 메시지

  return (
    <div className="flex justify-between items-center">
      <span className="body-lg-medium">선호 방식</span>
      <Dropdown
        label={displayLabel}
        items={ACTIVITY_MODE_LIST.map((activityMode) => ({
          label: activityMode.label,
          onSelect: () =>
            setActivityMode(activityMode.value as ActivityModeType),
        }))}
      />
    </div>
  );
}
