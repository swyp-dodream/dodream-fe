import XIcon from '@/assets/icons/x/12.svg';
import useQueryParams from '@/hooks/filter/use-query-params';
import { getLabel } from '@/utils/filter.util';

/**
 * 적용된 필터 태그 리스트
 */
export default function HomeFilterTags() {
  const { filterParams, getArrayParam, removeParam, setParams } =
    useQueryParams();

  // 모든 파라미터 평탄화
  const allParamPairs = filterParams.flatMap(([key]) => {
    const values = getArrayParam(key);
    return values.map((value) => [key, value] as const);
  });

  /** 파라미터 제거 함수 */
  const removeParamValue = (key: string, valueToRemove: string) => {
    const allValues = getArrayParam(key);
    const newValues = allValues.filter((v) => v !== valueToRemove);

    if (newValues.length === 0) {
      removeParam(key);
    } else {
      setParams({ [key]: newValues });
    }
  };

  return (
    <ul className="flex gap-4">
      {allParamPairs.map(([param, value]) => (
        <li
          key={`${param}-${value}`}
          className="body-md-regular px-2 flex gap-2 bg-primary rounded-sm"
        >
          {getLabel(value)}
          <button type="button" onClick={() => removeParamValue(param, value)}>
            <XIcon className="text-icon-light" />
          </button>
        </li>
      ))}
    </ul>
  );
}
