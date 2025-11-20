'use client';

import { Tabs } from '@/components/commons/tabs';
import DefaultPostCard from '@/components/features/post/post-card/presets/default-post-card';
import {
  HOME_PROJECT_MAP,
  HOME_PROJECT_TAB_VALUES,
} from '@/constants/post.constant';
import useQueryParams from '@/hooks/filter/use-query-params';
import { useGetPosts } from '@/hooks/post/use-get-posts';
import type {
  HomeProjectType,
  PostContentType,
  PostStatusType,
  ProjectType,
} from '@/types/post.type';
import HomeFilters from './filters/home-filters';

export default function HomePosts() {
  const { getParam, setParams, getApiQueryString } = useQueryParams();
  const { data: posts } = useGetPosts(getApiQueryString());

  const activePostType = (getParam('type') as HomeProjectType) || 'ALL';

  const handleTabChange = (value: string) => {
    if (value === 'ALL') {
      setParams({ type: null }); // ALL이면 파라미터 제거
    } else {
      setParams({ type: value });
    }
  };

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
      <HomeFilters />
      <HomePostCards posts={posts?.posts.content ?? []} />
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
              status={post.status as PostStatusType}
              // TODO: 프로필 이미지 코드로 수정
              ownerProfileImageCode={0}
              ownerNickname={post.author}
              projectType={post.projectType as ProjectType}
              createDate={post.createdAt}
              viewCount={post.viewCount}
              stacks={post.techs}
              roles={post.roles}
              // TODO: 북마크 상태 수정
              isBookmarked={false}
            />
          </li>
        );
      })}
    </ul>
  );
}
