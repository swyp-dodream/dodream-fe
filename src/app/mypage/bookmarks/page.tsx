'use client';

import BookmarkedPageTabContent from '@/app/mypage/bookmarks/_components/tab-content';
import { Tabs } from '@/components/commons/tabs';
import MyPageHeader from '@/components/features/mypage/commons/mypage-header';
import type { ProjectType } from '@/types/post.type';

const BOOKMARKED_TABS = [
  {
    tabValue: 'PROJECT',
    label: '프로젝트',
  },
  {
    tabValue: 'STUDY',
    label: '스터디',
  },
];

export default function BookmarkPage() {
  return (
    <>
      <MyPageHeader title="북마크" />

      <Tabs defaultValue={BOOKMARKED_TABS[0].tabValue}>
        <Tabs.List>
          {BOOKMARKED_TABS.map(({ tabValue, label }) => (
            <Tabs.Trigger key={tabValue} value={tabValue}>
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {BOOKMARKED_TABS.map(({ tabValue }) => (
          <Tabs.Content key={tabValue} value={tabValue}>
            <BookmarkedPageTabContent projectType={tabValue as ProjectType} />
          </Tabs.Content>
        ))}
      </Tabs>
    </>
  );
}
