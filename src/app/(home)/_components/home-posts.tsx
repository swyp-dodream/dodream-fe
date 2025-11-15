'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs } from '@/components/commons/tabs';
import DefaultPostCard from '@/components/features/post/post-card/presets/default-post-card';
import {
  HOME_PROJECT_MAP,
  HOME_PROJECT_TAB_VALUES,
} from '@/constants/post.constant';
import useGetPosts from '@/hooks/post/use-get-posts';
import type { HomeProjectType, PostContentType } from '@/types/post.type';

export default function HomePosts() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activePostType =
    (searchParams.get('projectType') as HomeProjectType) || 'ALL';
  const { data: posts } = useGetPosts(activePostType);

  const handleTabChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === 'ALL') {
      newParams.delete('projectType'); // ALL이면 파라미터 제거
    } else {
      newParams.set('projectType', value);
    }

    router.push(`/?${newParams.toString()}`, { scroll: false });
  };

  // console.log(
  //   'posts ➡️',
  //   posts?.content.map((element) => element.projectType),
  // );

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
        onValueChange={handleTabChange}
      >
        <Tabs.List
          className="col-span-2 flex p-3 gap-3 bg-primary rounded-lg"
          aria-label="게시글 타입 필터"
        >
          {HOME_PROJECT_TAB_VALUES.map((tabValue) => (
            <Tabs.Trigger key={tabValue} value={tabValue}>
              {HOME_PROJECT_MAP[tabValue as HomeProjectType]}
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
            <DefaultPostCard
              id={BigInt(post.id)}
              title={post.title}
              status={post.status}
              ownerNickname={post.ownerNickname}
              ownerProfileImageUrl={post.ownerProfileImageUrl}
              projectType={post.projectType}
              deadlineDate={post.deadlineDate}
              viewCount={post.viewCount}
              stacks={post.stacks}
              roles={post.roles}
            />
          </li>
        );
      })}
    </ul>
  );
}
