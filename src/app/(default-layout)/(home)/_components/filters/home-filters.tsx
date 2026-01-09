import clsx from 'clsx';
import { overlay } from 'overlay-kit';
import { useState } from 'react';
import InterestSelectModal from '@/app/(header-only)/create-profile/_components/interests-modal/interest-select-modal';
import TechStackSelectModal from '@/app/(header-only)/create-profile/_components/tech-stack-modal/tech-stack-select-modal';
import ArrowUpIcon from '@/assets/icons/chevron-up/14.svg';
import RotateIcon from '@/assets/icons/rotate/14.svg';
import Dropdown from '@/components/commons/dropdown';
import { SORT_LABEL_LIST, SORT_LABELS } from '@/constants/filter.constant';
import { ACTIVITY_MODE_LIST, ROLE_LIST } from '@/constants/profile.constant';
import useQueryParams from '@/hooks/filter/use-query-params';
import type { SortType } from '@/types/filter.type';
import HomeFilterButton from './home-filter-button';
import HomeFilterTags from './home-filter-tags';

/**
 * 홈 게시글의 필터링
 */
export default function HomeFilters() {
  const [isFilterOpen, setFilterOpen] = useState(true);
  // const [keyword, setKeyword] = useState('');
  const {
    params,
    filterParams,
    setParams,
    clearParams,
    getBoolParam,
    setBoolParam,
  } = useQueryParams();

  return (
    <div>
      <div className="flex mb-5">
        {/* 직군 필터링 */}
        <Dropdown
          label="직군"
          items={ROLE_LIST.map((role) => ({
            label: role.label,
            onSelect: () => setParams({ roles: role.value }),
          }))}
        >
          <HomeFilterButton>직군</HomeFilterButton>
        </Dropdown>

        {/* 기술 스택 필터링 */}
        <HomeFilterButton
          onClick={() => {
            overlay.open(({ isOpen, close }) => (
              <TechStackSelectModal
                isOpen={isOpen}
                onClose={close}
                isFilter={true}
              />
            ));
          }}
          className="hover:bg-primary"
        >
          기술 스택
        </HomeFilterButton>

        {/* 관심 분야 필터링 */}
        <HomeFilterButton
          onClick={() => {
            overlay.open(({ isOpen, close }) => (
              <InterestSelectModal
                isOpen={isOpen}
                onClose={close}
                isFilter={true}
              />
            ));
          }}
          className="hover:bg-primary"
        >
          관심 분야
        </HomeFilterButton>

        {/* 활동 방식 필터링 */}
        <Dropdown
          label="활동 방식"
          items={ACTIVITY_MODE_LIST.map((mode) => ({
            label: mode.label,
            onSelect: () => setParams({ activityMode: mode.value }),
          }))}
        >
          <HomeFilterButton>활동 방식</HomeFilterButton>
        </Dropdown>

        {/* 정렬 기준 필터링 */}
        <Dropdown
          label={params.sort}
          items={SORT_LABEL_LIST.map((sortType) => ({
            label: sortType.label,
            onSelect: () => setParams({ sort: sortType.value }),
          }))}
        >
          <HomeFilterButton>
            {SORT_LABELS[(params.sort ?? 'LATEST') as SortType]}
          </HomeFilterButton>
        </Dropdown>

        {/* 모집글만 보기 */}
        <button
          type="button"
          onClick={() =>
            setBoolParam(
              'onlyRecruiting',
              !getBoolParam('onlyRecruiting', true),
            )
          }
          className={clsx(
            'py-3 px-4 body-md-medium rounded-full flex items-center justify-between outline-none gap-2 group hover:bg-primary mr-auto',
            {
              'bg-primary': getBoolParam('onlyRecruiting', true),
            },
          )}
        >
          모집글만 보기
        </button>

        {/* 검색 */}
        {/* TODO: 필터링 API와 통합되면 추가 */}
        {/* <SearchInput
          placeholder="찾고 싶은 키워드를 검색하세요"
          variant="dark"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-[283px]"
        /> */}
      </div>

      <hr className="border-border-primary mb-6" />
      {filterParams.length !== 0 && (
        <>
          <div className="flex flex-col px-4">
            <div className="body-md-medium text-secondary flex gap-5">
              {/* 초기화 버튼 */}
              <button
                type="button"
                onClick={clearParams}
                className="flex gap-2 items-center"
              >
                초기화
                <RotateIcon />
              </button>

              {/* 접기/펼치기 버튼 */}
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

            {/* 필터링된 태그 */}
            {isFilterOpen && (
              <div className="mt-4">
                <HomeFilterTags />
              </div>
            )}
          </div>
          <hr className="border-border-primary mt-5" />
        </>
      )}
    </div>
  );
}
