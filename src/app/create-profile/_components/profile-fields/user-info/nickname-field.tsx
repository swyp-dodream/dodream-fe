import type { ChangeEvent, Ref } from 'react';
import { FormInput } from '@/components/commons/text-fields/input';
import ValidateNickname from './validate-nickname';

interface NicknameFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

/**
 * 닉네임 입력 필드 (실시간 유효성 검사 포함)
 * @param value - 닉네임 값
 * @param onChange - 입력 변경 핸들러
 * @param name - 필드 이름
 * @param error - 에러 메시지
 */
export default function NicknameField({
  value,
  onChange,
  name,
  error,
  ref,
}: NicknameFieldProps) {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <label htmlFor="nickname-field" className="body-lg-medium">
          닉네임
        </label>
        <FormInput
          id="nickname-field"
          name={name}
          placeholder="닉네임 입력"
          value={value}
          onChange={onChange}
          ref={ref}
          errorMessage={error}
        >
          <ValidateNickname nickname={value} />
        </FormInput>
      </div>
    </div>
  );
}
