import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import ArrowUpIcon from '@/assets/icons/chevron-up/14.svg';
import RotateIcon from '@/assets/icons/rotate/14.svg';
import HomeFilterButton from './home-filter-button';
import HomeFilterTags from './home-filter-tags';

/**
 * 홈 게시글의 필터링
 */
export default function HomeFilters() {
  const [isFilterOpen, setFilterOpen] = useState(true);

  return (
    <div>
      <div className="flex mb-5">
        <HomeFilterButton>직군</HomeFilterButton>
        <HomeFilterButton>기술 스택</HomeFilterButton>
        <HomeFilterButton>관심 분야</HomeFilterButton>
        <HomeFilterButton>활동 방식</HomeFilterButton>
        <HomeFilterButton>인기순</HomeFilterButton>
      </div>
      <hr className="border-border-primary mb-6" />
      <div className="flex flex-col px-4">
        <div className="body-md-medium text-secondary flex gap-5">
          <Link href="/" className="flex gap-2 items-center">
            초기화
            <RotateIcon />
          </Link>
          <button
            type="button"
            onClick={() => setFilterOpen(!isFilterOpen)}
            className="flex gap-2 items-center"
          >
            {isFilterOpen ? '접기' : '펼치기'}
            <ArrowUpIcon
              className={clsx(
                'transition-transform',
                isFilterOpen && 'rotate-180',
              )}
            />
          </button>
        </div>
        {isFilterOpen && (
          <div className="mt-4">
            <HomeFilterTags />
          </div>
        )}
      </div>
      <hr className="border-border-primary mt-5" />
    </div>
  );
}
