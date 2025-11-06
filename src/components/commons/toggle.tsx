import clsx from 'clsx';
import { Switch } from 'radix-ui';

interface ToggleProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

/**
 * 토글 스위치 컴포넌트
 * @param checked - 현재 체크 상태 (controlled 모드)
 * @param onCheckedChange - 상태 변경 핸들러 (controlled 모드)
 * @param defaultChecked - 초기 체크 상태 (uncontrolled 모드)
 * @param disabled - 비활성화 여부
 * @param id - label 연결 시 사용할 ID
 * @param name - form 제출 시 사용할 필드명
 * @param className - 추가 스타일 클래스 (Root에 적용)
 * @example
 * // form 제출 시 Uncontrolled 모드
 * <form action={saveSettings}>
 *   <Toggle name="notifications" defaultChecked={true} />
 *   <button type="submit">저장</button>
 * </form>
 * // on/off 데이터 사용
 * const formData = new FormData(e.target);
 * const isSwitchOn = formData.get('notifications') // 'on' 또는 null
 */
export default function Toggle({
  checked,
  onCheckedChange,
  defaultChecked,
  disabled,
  id,
  name,
  className,
}: ToggleProps) {
  return (
    <Switch.Root
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      id={id}
      name={name}
      className={clsx(
        'w-9 h-7 bg-secondary rounded-full relative shadow-md data-[state=checked]:bg-button tap-highlight-transparent',
        className,
      )}
    >
      <Switch.Thumb className="block w-6 h-6 bg-surface rounded-full shadow-sm transition-transform duration-100 translate-x-[2px] will-change-transform data-[state=checked]:translate-x-[18px]" />
    </Switch.Root>
  );
}
