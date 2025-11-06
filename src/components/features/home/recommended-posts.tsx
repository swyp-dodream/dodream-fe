'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import {
  HOME_RECOMMENDED_POST_PROJECT,
  HOME_RECOMMENDED_POST_STUDY,
} from '@/mocks/home';
import type { RecommendedPostType } from '@/types/home.type';
import { formatDate } from '@/utils/date.util';
import RecommendTypes from './recommend-types';

export default function RecommendedPosts() {
  const [postType, setPostType] = useState<'study' | 'project'>('project');
  const posts =
    postType === 'project'
      ? HOME_RECOMMENDED_POST_PROJECT
      : HOME_RECOMMENDED_POST_STUDY;

  return (
    <section className="col-span-12 flex flex-col gap-8">
      <div className="flex justify-between">
        {/* 제목 */}
        <h2 className="heading-lg">관심 있어 할 만한 글을 AI가 찾아뒀어요</h2>
        <span className="sr-only">AI 추천 게시글 종류</span>
        <div className="flex gap-5 body-lg-medium">
          {/* 프로젝트 필터 */}
          <button
            type="button"
            onClick={() => setPostType('project')}
            className={clsx({
              'text-primary': postType === 'project',
              'text-subtle': postType === 'study',
            })}
          >
            프로젝트
          </button>
          {/* 스터디 필터 */}
          <button
            type="button"
            onClick={() => setPostType('study')}
            className={clsx({
              'text-primary': postType === 'study',
              'text-subtle': postType === 'project',
            })}
          >
            스터디
          </button>
        </div>
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
