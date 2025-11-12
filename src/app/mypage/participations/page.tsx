import { Tabs } from '@/components/commons/tabs';
import MyPageHeader from '@/components/features/mypage/commons/mypage-header';
import MatchedPostCard from '@/components/features/post/post-card/presets/matched-post-card';
import MyApplicationPostCard from '@/components/features/post/post-card/presets/my-application-post-card';
import SuggestedPostCard from '@/components/features/post/post-card/presets/suggested-post-card';

import { MOCK_POSTS } from '@/mocks/posts';

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

function ApplicationsTabContent() {
  return (
    <>
      {MOCK_POSTS.map((post) => (
        <MyApplicationPostCard key={post.id} post={post} />
      ))}
    </>
  );
}

function SuggestedTabContent() {
  return (
    <>
      {MOCK_POSTS.map((post) => (
        <SuggestedPostCard key={post.id} post={post} />
      ))}
    </>
  );
}

function MatchedTabContent() {
  return (
    <>
      {MOCK_POSTS.map((post) => (
        <MatchedPostCard key={post.id} post={post} />
      ))}
    </>
  );
}
