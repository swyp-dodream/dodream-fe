import {
  ApplicationsTabContent,
  MatchedTabContent,
  SuggestedTabContent,
} from '@/app/mypage/participations/_components/tab-content';
import { Tabs } from '@/components/commons/tabs';
import MyPageHeader from '@/components/features/mypage/commons/mypage-header';

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
  return (
    <>
      <MyPageHeader title="참여 내역" />

      <Tabs defaultValue={PARTICIPATIONS_TABS[0].tabValue}>
        <Tabs.List>
          {PARTICIPATIONS_TABS.map(({ tabValue, label }) => (
            <Tabs.Trigger key={tabValue} value={tabValue}>
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {PARTICIPATIONS_TABS.map(({ tabValue, Content }) => (
          <Tabs.Content key={tabValue} value={tabValue}>
            <Content />
          </Tabs.Content>
        ))}
      </Tabs>
    </>
  );
}
