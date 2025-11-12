import { ulid } from 'ulid';
import Button from '@/components/commons/buttons/button';
import ClearableInput from '@/components/commons/text-fields/clearable-input';
import type { LinkItemType } from '@/types/profile.type';

const MAX_LINKS = 3;

type LinkFieldProps = {
  links: LinkItemType[];
  onLinksChange: (links: LinkItemType[]) => void;
};

/**
 * 링크 입력 컴포넌트
 * @param links - 링크 리스트
 * @param onLinksChange - 링크 set 함수
 */
export default function LinkField({ links, onLinksChange }: LinkFieldProps) {
  /**
   * 추가 버튼 클릭 핸들러
   */
  const handleAdd = () => {
    if (links.length < MAX_LINKS) {
      onLinksChange([...links, { id: ulid(), value: '' }]);
    }
  };

  /**
   * URL 유효성 검사 함수
   * @param url - 현재 URL
   * @returns - 에러 메시지 또는 undefined
   */
  const validateUrl = (url: string): string | undefined => {
    if (!url) return undefined; // 빈 값은 에러 없음

    // http(s)://도메인.확장자 형식
    const urlPattern =
      /^(https?:\/\/)?([\da-z\u00a1-\uffff.-]+)\.([a-z.]{2,6})([/\w\u00a1-\uffff .-]*)*\/?$/i;

    if (!urlPattern.test(url)) {
      return '유효한 URL을 입력해 주세요';
    }

    return undefined;
  };

  /**
   * input 값이 변경될 때마다 호출
   * @param id - 입력 필드 ID
   * @param value - 입력 필드에 들어갈 값
   */
  const handleChange = (id: string, value: string) => {
    const error = validateUrl(value);
    onLinksChange(
      links.map((link) => (link.id === id ? { ...link, value, error } : link)),
    );
  };

  /**
   * input 삭제 버튼 클릭 핸들러
   * @param id - 입력 필드 ID
   */
  const handleRemove = (id: string) => {
    if (links.length === 1) {
      // 1개일 때: 내용만 지우기
      onLinksChange([{ id: links[0].id, value: '' }]);
    } else {
      // 2개 이상일 때: 필드 자체 삭제
      onLinksChange(links.filter((link) => link.id !== id));
    }
  };

  return (
    <div className="flex justify-between">
      <span className="body-lg-medium flex gap-2 py-3">
        링크<span className="text-subtle">(선택)</span>
      </span>
      <div className="flex flex-col gap-4 items-end">
        {links.map((link) => (
          <ClearableInput
            key={link.id}
            id={`url-field-${link.id}`}
            placeholder="URL 입력"
            className="w-[282px]"
            value={link.value}
            onChange={(e) => handleChange(link.id, e.target.value)}
            onClear={() => handleRemove(link.id)}
            errorMessage={link.error}
          />
        ))}
        <Button
          variant="solid"
          onClick={handleAdd}
          disabled={links.length >= MAX_LINKS}
          className="mt-2"
        >
          추가
        </Button>
      </div>
    </div>
  );
}
