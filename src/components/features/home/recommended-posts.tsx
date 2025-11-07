'use client';

import Link from 'next/link';
import { Tabs } from 'radix-ui';
import { useState } from 'react';
import {
  HOME_RECOMMENDED_POST_PROJECT,
  HOME_RECOMMENDED_POST_STUDY,
} from '@/mocks/home';
import type { RecommendedPostType } from '@/types/home.type';
import { formatDate } from '@/utils/date.util';
import RecommendTypes from './recommend-types';

// TODO: 타입 분리
type TabValue = 'study' | 'project';

export default function RecommendedPosts() {
  // TODO: 타입 분리할 경우 수정
  const [activePostType, setActivePostType] = useState<TabValue>('project');

  // TODO: API 요청으로 수정
  const posts =
    activePostType === 'project'
      ? HOME_RECOMMENDED_POST_PROJECT
      : HOME_RECOMMENDED_POST_STUDY;

  return (
    <section className="col-span-12 flex flex-col gap-8">
      <div className="flex justify-between">
        {/* 제목 */}
        <h2 className="heading-lg">관심 있어 할 만한 글을 AI가 찾아뒀어요</h2>

        {/* 게시글 종류 선택 탭 */}
        <PostTypeTabs
          value={activePostType}
          onValueChange={setActivePostType}
        />
      </div>

      {/* AI 추천 게시글 */}
      <ul className="flex gap-7">
        {posts.map((post) => (
          <RecommendedPost key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}

interface RecommendedPostProps {
  post: RecommendedPostType;
}

/**
 * 개별 게시글 컴포넌트
 * TODO: 타입 수정 후 컴포넌트 수정
 */
function RecommendedPost({ post }: RecommendedPostProps) {
  return (
    <li className="flex-1 border border-border-primary rounded-lg px-6 py-5 ">
      <Link href="/">
        <article className="flex flex-col h-full gap-5">
          <RecommendTypes labels={post.type} />
          <h3 className="heading-sm line-clamp-2">{post.title}</h3>
          <div className="flex gap-3 text-subtle flex-1 items-end">
            <span>마감</span>
            <span>{formatDate(new Date(post.deadlineAt))}</span>
          </div>
        </article>
      </Link>
    </li>
  );
}

interface PostTypeTabsProps {
  value: TabValue;
  onValueChange: (value: TabValue) => void;
}

/**
 * 추천 게시글 Tabs 컴포넌트
 * @param value - 현재 선택된 탭
 * @param onValueChange - 탭 set 함수
 */
function PostTypeTabs({ value, onValueChange }: PostTypeTabsProps) {
  return (
    <Tabs.Root
      value={value}
      onValueChange={(value) => onValueChange(value as TabValue)}
    >
      <Tabs.List
        className="flex gap-5 body-lg-medium text-subtle"
        aria-label="게시글 유형 선택"
      >
        <Tabs.Trigger
          value="project"
          className="data-[state=active]:text-primary"
        >
          프로젝트
        </Tabs.Trigger>
        <Tabs.Trigger
          value="study"
          className="data-[state=active]:text-primary"
        >
          스터디
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}
