import Image from 'next/image';
import Link from 'next/link';
import LinkIcon from '@/assets/icons/link/14.svg';
import SuitcaseIcon from '@/assets/icons/suitcase/14.svg';
import UsersIcon from '@/assets/icons/users/14.svg';
import PostCardTechCategories from '@/components/features/post/post-card/post-card-tech-categories';
import { TECH_CATEGORIES } from '@/mocks/posts';

const SKILL_LIST = [
  TECH_CATEGORIES[0],
  TECH_CATEGORIES[1],
  TECH_CATEGORIES[10],
  TECH_CATEGORIES[13],
];

export default function ProfilePage() {
  return (
    <div className="h-full flex flex-col">
      <section className="flex justify-between">
        <Image
          src="/"
          alt="사용자님의 프로필 이미지"
          width={120}
          height={120}
          className="rounded-full bg-primary"
        />
        <Link
          href="/"
          className="w-fit h-fit bg-primary px-5 py-3 rounded-full body-md-medium"
          aria-label="프로필 정보 수정하기"
        >
          수정하기
        </Link>
      </section>
      <div className="flex justify-between pt-5">
        <div className="w-[589px]">
          <header>
            <h2 className="heading-xl pb-3">닉네임입니다닉네임입</h2>
            <ul className="flex flex-col gap-2 body-lg-medium">
              <li className="flex gap-3 items-center">
                <SuitcaseIcon className="text-icon-medium" aria-hidden="true" />
                <div className="flex gap-1 text-secondary">
                  <div>디자이너</div>
                  <div aria-hidden="true">·</div>
                  <div>경력 1~3년</div>
                </div>
              </li>
              <li className="flex gap-3 items-center text-secondary">
                <UsersIcon className="text-icon-medium" aria-hidden="true" />
                <div>온라인 선호</div>
              </li>
            </ul>
          </header>
          <section className="flex flex-col gap-4 pt-9 pb-8">
            <h3 className="heading-sm">자기소개</h3>
            <p className="body-lg-regular">
              안녕하세요, 직무 전문가 이름입니다. 간결한 한 줄 강점/경험을 통해
              지원 분야에 기여하겠습니다. 첫째, 강점입니다. 관련 경험/성과를
              통해 구체적 증명을 할 수 있었습니다. 구체적인 수치를 제시하여,
              역량을 갖추었음을 증명했습니다. 둘째, 강점입니다. 관련 경험/성과를
              통해 구체적 증명을 할 수 있었습니다. 구체적인 수치를 제시하여,
              역량을 갖추었음을
            </p>
          </section>
          <section className="flex flex-col gap-4">
            <h3 className="heading-sm">링크</h3>
            <nav aria-label="사용자 외부 링크">
              <ul className="flex flex-col gap-3 body-md-medium">
                <li className="flex gap-3 items-center">
                  <LinkIcon aria-hidden="true" />
                  <Link href="/">
                    https://notion.com/en/account/dhfjdfnkdvndnv
                  </Link>
                </li>
                <li className="flex gap-3 items-center">
                  <LinkIcon aria-hidden="true" />
                  <Link href="/">
                    https://notion.com/en/account/dhfjdfnkdvndnv
                  </Link>
                </li>
                <li className="flex gap-3 items-center">
                  <LinkIcon aria-hidden="true" />
                  <Link href="/">
                    https://notion.com/en/account/dhfjdfnkdvndnv
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        </div>
        <div className="w-[384px] flex flex-col">
          <section className="flex flex-col gap-4">
            <h3 className="heading-sm">기술 스택</h3>
            <PostCardTechCategories techCategories={SKILL_LIST} />
          </section>
          <section className="flex flex-col pt-8 pb-13 gap-4">
            <h3 className="heading-sm">관심 분야</h3>
            <ul
              className="flex gap-3 body-lg-regular"
              aria-label="관심 분야 목록"
            >
              <li className="bg-primary py-2 px-4 rounded-full w-fit">환경</li>
              <li className="bg-primary py-2 px-4 rounded-full w-fit">사회</li>
              <li className="bg-primary py-2 px-4 rounded-full w-fit">
                엔터테인먼트
              </li>
              <li className="bg-primary py-2 px-4 rounded-full w-fit">AI</li>
              <li className="bg-primary py-2 px-4 rounded-full w-fit">금융</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
