import clsx from 'clsx';

interface CheckboxProps {
  name?: string;
  id?: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
}

/**
 * 범용 체크박스 컴포넌트
 * @param name - checkbox name 속성
 * @param id - checkbox id 속성
 * @param checked - 체크 여부
 * @param onChange - 체크 클릭 시 실행될 핸들러
 * TODO: 체크박스 컴포넌트 하나로 통합
 */
export function Checkbox({
  name,
  id,
  checked,
  onChange,
  className,
}: CheckboxProps) {
  return (
    <input
      type="checkbox"
      name={name}
      id={id}
      checked={checked}
      onChange={onChange}
      className={clsx(
        'appearance-none border-1 border-icon-dark size-4 rounded-sm bg-no-repeat bg-center bg-size-[12px] cursor-pointer',
        checked && 'bg-icon-dark',
        className,
      )}
      style={
        checked
          ? { backgroundImage: "url('/assets/icons/check/12.svg')" }
          : undefined
      }
    />
  );
}
