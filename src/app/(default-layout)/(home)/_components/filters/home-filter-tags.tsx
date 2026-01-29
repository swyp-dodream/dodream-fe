import XIcon from '@/assets/icons/x/12.svg';
import useQueryParams from '@/hooks/filter/use-query-params';
import { getLabel } from '@/utils/filter.util';

/**
 * 적용된 필터 태그 리스트
 */
export default function HomeFilterTags() {
  const { filterParams, getArrayParam, removeParam, setParams } =
    useQueryParams();

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
    <ul className="flex gap-x-4 gap-y-3 flex-wrap">
      {filterParams.map(([param, value]) => (
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
