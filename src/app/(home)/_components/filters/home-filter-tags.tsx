import XIcon from '@/assets/icons/x/12.svg';

/**
 * 적용된 필터 태그 리스트
 */
export default function HomeFilterTags() {
  const filters = ['프론트엔드', '백엔드', 'Java'];

  return (
    <ul className="flex gap-4">
      {filters.map((filter) => (
        <li
          key={filter}
          className="body-md-regular px-2 flex gap-2 bg-primary rounded-sm"
        >
          {filter}
          <button type="button">
            <XIcon className="text-icon-light" />
          </button>
        </li>
      ))}
    </ul>
  );
}
