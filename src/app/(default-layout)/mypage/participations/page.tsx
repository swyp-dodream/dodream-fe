'use client';

import {
  ApplicationsTabContent,
  MatchedTabContent,
  SuggestedTabContent,
} from '@/app/(default-layout)/mypage/participations/_components/tab-content';
import { Tabs } from '@/components/commons/tabs';
import MyPageHeader from '@/components/features/mypage/commons/mypage-header';
import useQueryParams from '@/hooks/filter/use-query-params';

const PARTICIPATIONS_TABS = [
  {
    tabValue: 'applications',
    label: '지원한 글',
    Content: ApplicationsTabContent,
  },
  {
    tabValue: 'suggested',
    label: '제안 받은 글',
    Content: SuggestedTabContent,
  },
  { tabValue: 'matched', label: '매칭된 글', Content: MatchedTabContent },
];

export default function ParticipantsPage() {
  const { getParam, setParams } = useQueryParams();
  const currentTab = getParam('tab') ?? PARTICIPATIONS_TABS[0].tabValue;

  // 현재 탭의 설정 찾기
  const currentTabConfig = PARTICIPATIONS_TABS.find(
    (tab) => tab.tabValue === currentTab,
  );

  const CurrentContent = currentTabConfig?.Content;

  const handleTabChange = (value: string) => {
    setParams({ tab: value, page: null }); // 탭 변경 시 페이지 초기화
  };

  return (
    <>
      <MyPageHeader title="참여 내역" />

      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <Tabs.List>
          {PARTICIPATIONS_TABS.map(({ tabValue, label }) => (
            <Tabs.Trigger key={tabValue} value={tabValue}>
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {CurrentContent && <CurrentContent tabValue={currentTab} />}
      </Tabs>
    </>
  );
}
