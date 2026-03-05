'use client';

import { useState } from 'react';
import ArrowDownIcon from '@/assets/icons/chevron-down/14.svg';
import ArrowUpIcon from '@/assets/icons/chevron-up/14.svg';
import SuitcaseIcon from '@/assets/icons/suitcase/14.svg';
import ThumbsUpIcon from '@/assets/icons/thumbs-up/14.svg';
import UsersIcon from '@/assets/icons/users/14.svg';
import ProfileImage from '@/components/commons/profile-image';
import TechCategories from '@/components/commons/tech-categories';
import { EXPERIENCE } from '@/constants/profile.constant';
import { reviews } from '@/mocks/review.mock';
import { parseExperienceValue } from '@/utils/profile.util';
import { getReviewSummary } from '@/utils/review.util';
import { ReviewTagList } from '../reviews/review-tag-list';
import InterestTags from './interest-tags';
import ProfileLinks from './profile-link';

interface ProfileContentProps {
  nickname: string;
  profileImage: number;
  controller?: React.ReactNode;
  role: string;
  experience: string;
  introText: string;
  interests: {
    id: number;
    categoryId: number;
    name: string;
  }[];
  activityMode: string;
  profileUrls: {
    id: bigint;
    url: string;
  }[];
  techSkills: string[];
}

/** 프로필 내용 컴포넌트 */
export default function ProfileContent({
  nickname,
  profileImage,
  controller,
  role,
  experience,
  introText,
  interests,
  activityMode,
  profileUrls,
  techSkills,
}: ProfileContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => setIsExpanded((prev) => !prev);

  const { positiveCount, result } = getReviewSummary(reviews, true);
  const visibleResult = isExpanded ? result : result.slice(0, 3);

  return (
    <div className="h-full grid grid-cols-12 gap-x-7 gap-y-5">
      {/* 프로필 이미지/수정 버튼 */}
      <section className="col-span-12 flex justify-between">
        <ProfileImage
          code={profileImage}
          size={120}
          className="rounded-full bg-primary shrink-0 w-30 h-30"
        />
        {controller}
      </section>
      <div className="col-span-6">
        {/* 닉네임 및 직무 */}
        <header>
          <h2 className="heading-xl pb-3">{nickname}</h2>
          <ul className="flex flex-col gap-2 body-lg-medium">
            <li className="flex gap-3 items-center">
              <SuitcaseIcon className="text-icon-medium" aria-hidden="true" />
              <div className="flex gap-1 text-secondary">
                {/* TODO: 직무 값 사용 방법 수정 */}
                <div>{role}</div>
                <div aria-hidden="true">·</div>
                <div>
                  경력 {EXPERIENCE[parseExperienceValue(experience) ?? 'new']}
                </div>
              </div>
            </li>
            <li className="flex gap-3 items-center text-secondary">
              <UsersIcon className="text-icon-medium" aria-hidden="true" />
              <div>{activityMode} 선호</div>
            </li>
          </ul>
        </header>

        {/* 자기소개 */}
        <section className="flex flex-col gap-4 pt-9 pb-8">
          <h3 className="heading-sm">자기소개</h3>
          <p className="body-lg-regular">{introText}</p>
        </section>

        {/* 링크 */}
        {Object.keys(profileUrls).length !== 0 && (
          <section className="flex flex-col gap-4">
            <h3 className="heading-sm">링크</h3>
            <nav aria-label="사용자 외부 링크">
              <ProfileLinks profileUrls={profileUrls} />
            </nav>
          </section>
        )}
      </div>
      <div className="col-span-4 col-start-9 flex flex-col">
        {/* 기술 스택 */}
        <section className="flex flex-col gap-4">
          <h3 className="heading-sm">기술 스택</h3>
          <TechCategories techCategories={techSkills} />
        </section>

        {/* 관심 분야 */}
        <section className="flex flex-col pt-8 pb-13 gap-4">
          <h3 className="heading-sm">관심 분야</h3>
          <InterestTags interests={interests} />
        </section>

        {/* 받은 후기 */}
        <section className="flex flex-col pb-13">
          <h3 className="heading-md mb-3">{nickname}님이 받은 후기</h3>
          <div className="flex items-center gap-2 text-secondary mb-7">
            <ThumbsUpIcon />
            <p className="body-md-medium">
              {reviews.length}명 중 {positiveCount}명이 함께한 경험이 좋았다고
              말했어요
            </p>
          </div>
          <ReviewTagList reviews={visibleResult} />

          {result.length > 3 && (
            <button
              type="button"
              onClick={handleToggle}
              className="w-full flex justify-center items-center mt-5 text-secondary body-md-medium"
            >
              {isExpanded ? (
                <div className="flex gap-2 items-center">
                  접기 <ArrowUpIcon />
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  더보기 <ArrowDownIcon />
                </div>
              )}
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
