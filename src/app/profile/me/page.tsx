'use client';

import Image from 'next/image';
import Link from 'next/link';
import InterestTags from '@/app/profile/_components/interest-tags';
import ProfileLinks from '@/app/profile/_components/profile-link';
import SuitcaseIcon from '@/assets/icons/suitcase/14.svg';
import UsersIcon from '@/assets/icons/users/14.svg';
import TechCategories from '@/components/commons/tech-categories';
import { useGetProfile } from '@/hooks/profile/use-get-profile';

export default function ProfilePage() {
  const { data: profile } = useGetProfile();

  if (!profile) return;

  // TODO: 프로필 페이지 ID, 로그인 유저 ID 비교
  const isMyProfile = true;

  return (
    <div className="h-full grid grid-cols-12 gap-x-7 gap-y-5">
      {/* 프로필 이미지/수정 버튼 */}
      <section className="col-span-12 flex justify-between">
        {/* TODO: 이미지 수정 */}
        <Image
          src="/avatar/default-avatar.png"
          alt={`${profile.nickname}님의 프로필 이미지`}
          width={120}
          height={120}
          className="rounded-full bg-primary shrink-0 w-[120px] h-[120px]"
        />
        {isMyProfile && (
          <Link
            href="/profile/edit"
            className="w-fit h-fit bg-primary px-5 py-3 rounded-full body-md-medium"
            aria-label="프로필 정보 수정하기"
          >
            수정하기
          </Link>
        )}
      </section>
      <div className="col-span-6">
        {/* 닉네임 및 직무 */}
        <header>
          <h2 className="heading-xl pb-3">{profile.nickname}</h2>
          <ul className="flex flex-col gap-2 body-lg-medium">
            <li className="flex gap-3 items-center">
              <SuitcaseIcon className="text-icon-medium" aria-hidden="true" />
              <div className="flex gap-1 text-secondary">
                {/* TODO: 직무 값 사용 방법 수정 */}
                <div>{profile.roles[0].name}</div>
                <div aria-hidden="true">·</div>
                <div>{profile.experience}</div>
              </div>
            </li>
            <li className="flex gap-3 items-center text-secondary">
              <UsersIcon className="text-icon-medium" aria-hidden="true" />
              <div>{profile.activityMode} 선호</div>
            </li>
          </ul>
        </header>

        {/* 자기소개 */}
        <section className="flex flex-col gap-4 pt-9 pb-8">
          <h3 className="heading-sm">자기소개</h3>
          <p className="body-lg-regular">{profile.introText}</p>
        </section>

        {/* 링크 */}
        {Object.keys(profile.profileUrls).length !== 0 && (
          <section className="flex flex-col gap-4">
            <h3 className="heading-sm">링크</h3>
            <nav aria-label="사용자 외부 링크">
              <ProfileLinks profileUrls={profile.profileUrls} />
            </nav>
          </section>
        )}
      </div>
      <div className="col-span-4 col-start-9 flex flex-col">
        {/* 기술 스택 */}
        <section className="flex flex-col gap-4">
          <h3 className="heading-sm">기술 스택</h3>
          {/* TODO: techCategories 수정 시 map 제거 */}
          <TechCategories
            techCategories={profile.techSkills.map((skill) => skill.name)}
          />
        </section>

        {/* 관심 분야 */}
        <section className="flex flex-col pt-8 pb-13 gap-4">
          <h3 className="heading-sm">관심 분야</h3>
          <InterestTags interests={profile.interestKeywords} />
        </section>
      </div>
    </div>
  );
}
