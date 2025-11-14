'use client';

import { useState } from 'react';
import { Tabs } from '@/components/commons/tabs';
import DefaultPostCard from '@/components/features/post/post-card/presets/default-post-card';
import useGetPosts from '@/hooks/post/use-get-posts';
import type { PostContentType } from '@/types/post.type';

// TODO: 타입 분리
export const TAB_VALUE = {
  all: '전체',
  project: '프로젝트',
  study: '스터디',
} as const;

type ProjectType = keyof typeof TAB_VALUE;
const PROJECT_TAB_VALUES = Object.keys(TAB_VALUE) as ProjectType[];

export default function HomePosts() {
  const [activePostType, setActivePostType] = useState<ProjectType>('all');
  const { data: posts } = useGetPosts();

  // TODO: 탭 스타일 분리
  return (
    <section
      className="col-span-12 flex flex-col gap-8"
      aria-labelledby="home-posts-heading"
    >
      <h2 id="home-posts-heading" className="sr-only">
        모집 게시글 목록
      </h2>
      <Tabs
        className="w-fit"
        value={activePostType}
        onValueChange={(value) => setActivePostType(value as ProjectType)}
      >
        <Tabs.List
          className="col-span-2 flex p-3 gap-3 bg-primary rounded-lg"
          aria-label="게시글 타입 필터"
        >
          {PROJECT_TAB_VALUES.map((tabValue) => (
            <Tabs.Trigger key={tabValue} value={tabValue}>
              {TAB_VALUE[tabValue]}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs>
      <HomePostCards posts={posts?.content ?? []} />
    </section>
  );
}

interface HomePostCardsProps {
  posts: PostContentType[];
}

function HomePostCards({ posts }: HomePostCardsProps) {
  return (
    <ul className="grid grid-cols-3 gap-7">
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <DefaultPostCard post={post} />
          </li>
        );
      })}
    </ul>
  );
}
