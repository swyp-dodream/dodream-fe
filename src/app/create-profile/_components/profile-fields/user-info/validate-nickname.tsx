import clsx from 'clsx';
import ValidationRuleIcon from '@/assets/icons/validation-rule/4.svg';
import { NICKNAME_REGEX } from '@/constants/profile.constant';

interface ValidateNicknameProps {
  nickname: string;
}

/**
 * 입력된 닉네임 유효성을 검사하는 컴포넌트
 * @param nickname - 닉네임
 */
export default function ValidateNickname({ nickname }: ValidateNicknameProps) {
  const isNicknameEmpty = nickname.length === 0;
  const isLengthInvalid = nickname.length > 10;

  const isTypeInvalid = !NICKNAME_REGEX.test(nickname);

  return (
    <ul className="flex gap-5">
      <li className="flex gap-3 items-center text-subtle">
        <ValidationRuleIcon
          className={clsx({
            'text-subtle': isNicknameEmpty,
            'text-bg-error': isLengthInvalid,
            'text-bg-success': !isLengthInvalid,
          })}
        />
        최대 10자
      </li>
      <li className="flex gap-3 items-center text-subtle">
        <ValidationRuleIcon
          className={clsx({
            'text-subtle': isNicknameEmpty,
            'text-bg-error': isTypeInvalid,
            'text-bg-success': !isTypeInvalid,
          })}
        />
        한국어, 영어, 숫자 가능
      </li>
    </ul>
  );
}
