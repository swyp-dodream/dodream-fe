import type { Dispatch, SetStateAction } from 'react';
import { FormInput } from '@/components/commons/text-fields/input';
import ValidateNickname from './validate-nickname';

interface NicknameFieldProps {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
}

/**
 * 유효성 검사가 포함된 닉네임 입력 필드 컴포넌트
 * @param nickname - 닉네임
 * @param setNickname - 닉네임 set 함수
 */
export default function NicknameField({
  nickname,
  setNickname,
}: NicknameFieldProps) {
  // TODO: 닉네임 리스트 실제 비교
  const isNicknameDuplicated = false;

  return (
    <div>
      {/* 닉네임 */}
      <div className="flex flex-col gap-3">
        <label htmlFor="nickname-field" className="body-lg-medium">
          닉네임
        </label>
        <FormInput
          id="nickname-field"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          errorMessage={isNicknameDuplicated ? '중복된 닉네임입니다.' : ''}
        >
          <ValidateNickname nickname={nickname} />
        </FormInput>
      </div>
    </div>
  );
}
