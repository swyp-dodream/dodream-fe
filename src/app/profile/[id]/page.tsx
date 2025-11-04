import Image from 'next/image';
import Link from 'next/link';
import SuitcaseIcon from '@/assets/icons/suitcase/14.svg';
import UsersIcon from '@/assets/icons/users/14.svg';
import PostCardTechCategories from '@/components/features/post/post-card/post-card-tech-categories';
import InterestTags from '@/components/features/profile/interest-tags';
import ProfileLinks from '@/components/features/profile/profile-link';
import { PROFILE } from '@/mocks/profiles';

export default function ProfilePage() {
  // TODO: path 파라미로부터 프로필 데이터 페칭
  const profile = PROFILE;

  // TODO: 프로필 페이지 ID, 로그인 유저 ID 비교
  const isMyProfile = true;

  return (
    <div className="h-full flex flex-col">
      {/* 프로필 이미지/수정 버튼 */}
      <section className="flex justify-between">
        {/* TODO: 이미지 수정 */}
        <Image
          src="/"
          alt={`${profile.nickname}님의 프로필 이미지`}
          width={120}
          height={120}
          className="rounded-full bg-primary"
        />
        {isMyProfile && (
          <Link
            href="/"
            className="w-fit h-fit bg-primary px-5 py-3 rounded-full body-md-medium"
            aria-label="프로필 정보 수정하기"
          >
            수정하기
          </Link>
        )}
      </section>
      <div className="flex justify-between pt-5">
        <div className="w-[589px]">
          {/* 닉네임 및 직무 */}
          <header>
            <h2 className="heading-xl pb-3">{profile.nickname}</h2>
            <ul className="flex flex-col gap-2 body-lg-medium">
              <li className="flex gap-3 items-center">
                <SuitcaseIcon className="text-icon-medium" aria-hidden="true" />
                <div className="flex gap-1 text-secondary">
                  <div>{profile.roles}</div>
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
          <section className="flex flex-col gap-4">
            <h3 className="heading-sm">링크</h3>
            <nav aria-label="사용자 외부 링크">
              <ProfileLinks profileUrls={profile.profileUrls} />
            </nav>
          </section>
        </div>
        <div className="w-[384px] flex flex-col">
          {/* 기술 스택 */}
          <section className="flex flex-col gap-4">
            <h3 className="heading-sm">기술 스택</h3>
            <PostCardTechCategories techCategories={profile.techSkills} />
          </section>

          {/* 관심 분야 */}
          <section className="flex flex-col pt-8 pb-13 gap-4">
            <h3 className="heading-sm">관심 분야</h3>
            <InterestTags interests={profile.interestKeywords} />
          </section>
        </div>
      </div>
    </div>
  );
}
