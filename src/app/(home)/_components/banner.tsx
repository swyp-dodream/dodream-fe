'use client';

import Link from 'next/link';
import { overlay } from 'overlay-kit';
import LoginModal from '@/app/auth/_components/login-modal';
import AlertCircleIcon from '@/assets/icons/alert-circle/16.svg';
import { useGetProfileExists } from '@/hooks/auth/use-get-profile';
import RecommendTypes from './recommend-types';

export default function Banner() {
  const { data: profileExists } = useGetProfileExists();

  const handleLogin = () => {
    overlay.open(({ isOpen, close }) => (
      <LoginModal isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <aside
      className="col-span-12 flex flex-col justify-between relative h-[202px] shadow-card bg-white border border-border-primary rounded-lg overflow-hidden"
      aria-labelledby="banner-heading"
    >
      <div className="mt-8 ml-9">
        <h2 className="heading-lg w-[326px]" id="banner-heading">
          {profileExists
            ? '모집글을 작성하고 모집글과 꼭 맞는 AI 지원자 추천을 경험해 보세요.'
            : '놓치고 있는 기회가 있을지 몰라요!'}
        </h2>
        {!profileExists && (
          <p className="text-secondary body-md-regular mt-3">
            AI가 회원님의 프로필과 관심사를 분석하여 최적의 글을 추천해
            드립니다.
            <br />
            지금 로그인하고 숨겨진 기회를 두드려보세요.
          </p>
        )}
      </div>

      {/* 모집글 작성 페이지 이동 버튼 */}
      {profileExists ? (
        <Link
          href="/"
          className="bg-brand text-text-on-brand mb-8 ml-9 rounded-md w-fit px-4 py-2 body-md-medium"
        >
          모집글 작성하기
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleLogin}
          className="bg-brand text-text-on-brand mb-8 ml-9 rounded-md w-fit px-4 py-2 body-md-medium"
        >
          로그인하고 AI 추천 받아보기
        </button>
      )}

      {/* 추천 회원 영역 */}
      {profileExists ? (
        <div
          className="w-[645px] h-[194px] bg-white border border-gray-300 rounded-md absolute top-3.5 left-[573px] py-6 px-9"
          role="presentation"
        >
          <div className="flex gap-3 items-center">
            <h3 className="body-lg-semibold text-secondary">
              AI가 추천하는 회원을 탐색해보세요
            </h3>
            <AlertCircleIcon className="text-icon-light" />
          </div>
          <ul className="flex gap-4 body-md-medium mt-7 mb-6">
            <li className="py-3 px-4 bg-container-primary rounded-full">
              프론트엔드
            </li>
            <li className="py-3 px-4 bg-chip-selected text-on-brand rounded-full">
              백엔드
            </li>
            <li className="py-3 px-4 bg-container-primary rounded-full">iOS</li>
          </ul>
          <div className="flex gap-3 items-center">
            <div className="w-9 h-9 rounded-full bg-primary" />
            <div className="flex flex-col w-[156px]">
              <span className="body-lg-medium">두드림</span>
              <span className="body-sm-regular text-secondary">
                백엔드 · 경력 1~3년
              </span>
            </div>
            <RecommendTypes labels={['나와맞는기술스택', '선호하는분야']} />
          </div>
        </div>
      ) : (
        <div
          className="flex gap-4 absolute top-11 right-[-131px]"
          role="presentation"
        >
          <div className="w-[282px] h-[157px] bg-white border border-gray-300 rounded-lg py-5 px-6 flex flex-col">
            <RecommendTypes labels={['내직군모집중']} />
            <p className="heading-sm my-5">
              함께 스터디 하실 개발자분을 모집하고 있습니다
            </p>
            <time
              dateTime="2026-01-24"
              className="body-md-regular text-subtle mt-auto"
            >
              마감 2026.01.24
            </time>
          </div>
          <div className="w-[282px] h-[157px] bg-white border border-gray-300 rounded-lg py-5 px-6 flex flex-col">
            <RecommendTypes labels={['나와맞는활동방식']} />
            <p className="heading-sm my-5">실제 서비스를 운영할</p>
            <time
              dateTime="2025-12-19"
              className="body-md-regular text-subtle mt-auto"
            >
              마감 2025.12.19
            </time>
          </div>
        </div>
      )}
    </aside>
  );
}
