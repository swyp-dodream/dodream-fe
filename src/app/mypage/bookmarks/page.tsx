'use client';

import { useMemo } from 'react';
import BookmarkedPageTabContent from '@/app/mypage/bookmarks/_components/tab-content';
import { Tabs } from '@/components/commons/tabs';
import MyPageHeader from '@/components/features/mypage/commons/mypage-header';
import useGetMyBookmarkedPosts from '@/hooks/my/use-get-my-bookmarked-posts';
import type { MyBookmarkedPostType, ProjectType } from '@/types/post.type';

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
  const { data: bookmarkedPosts } = useGetMyBookmarkedPosts();

  const postsByTabValue = useMemo(() => {
    const initial: Record<
      (typeof BOOKMARKED_TABS)[number]['tabValue'],
      MyBookmarkedPostType[]
    > = {
      PROJECT: [],
      STUDY: [],
    };

    if (!bookmarkedPosts?.content) return initial;

    return bookmarkedPosts.content.reduce((acc, post) => {
      const key = post.projectType.toUpperCase();
      if (key in acc) {
        acc[key as keyof typeof acc].push(post);
      }
      return acc;
    }, initial);
  }, [bookmarkedPosts?.content]);

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

        {BOOKMARKED_TABS.map(({ tabValue }) => {
          const posts = postsByTabValue[tabValue];

          return (
            <Tabs.Content key={tabValue} value={tabValue}>
              <BookmarkedPageTabContent
                posts={posts}
                projectType={tabValue as ProjectType}
              />
            </Tabs.Content>
          );
        })}
      </Tabs>
    </>
  );
}
