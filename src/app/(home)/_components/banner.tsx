'use client';

import Link from 'next/link';
import { overlay } from 'overlay-kit';
import LoginModal from '@/app/auth/_components/login-modal';
import { useGetProfileExists } from '@/hooks/profile/use-get-profile';

export default function Banner() {
  const { data: profileExists } = useGetProfileExists();

  const handleLogin = () => {
    overlay.open(({ isOpen, close }) => (
      <LoginModal isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <aside
      className={`col-span-12 flex flex-col justify-between relative h-[204px] shadow-card bg-white border border-border-primary rounded-lg overflow-hidden bg-[url('/banner/${profileExists?.exists === true ? 'authenticated' : 'unauthenticated'}.png')] bg-cover`}
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
          href="/posts/new"
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
    </aside>
  );
}
