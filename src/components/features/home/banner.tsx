import Link from 'next/link';

// TODO: 배너 스타일 디자인 시스템 수정
export default function Banner() {
  const user = true;

  return (
    <section
      className="flex flex-col justify-between relative h-[204px] shadow-card bg-white border border-gray-300 rounded-lg overflow-hidden"
      aria-labelledby="banner-heading"
    >
      <div className="mt-8 ml-9">
        <h2 className="heading-lg w-[326px]" id="banner-heading">
          {user
            ? '모집글을 작성하고 모집글과 꼭 맞는 AI 지원자 추천을 경험해 보세요.'
            : '놓치고 있는 기회가 있을지 몰라요!'}
        </h2>
        {!user && (
          <p className="text-secondary body-md-regular mt-3">
            AI가 회원님의 프로필과 관심사를 분석하여 최적의 글을 추천해
            드립니다.
            <br />
            지금 로그인하고 숨겨진 기회를 두드려보세요.
          </p>
        )}
      </div>

      {/* 모집글 작성 페이지 이동 버튼 */}
      <Link
        href="/"
        className="bg-brand text-text-on-brand mb-8 ml-9 rounded-md w-fit px-4 py-2 body-md-medium"
      >
        {user ? '모집글 작성하기' : '로그인하고 AI 추천 받아보기'}
      </Link>

      {/* 추천 회원 영역 */}
      {user ? (
        <aside className="w-[645px] h-[194px] bg-white border border-gray-300 rounded-md absolute top-3.5 left-[573px] py-6 px-9">
          <h3 className="body-lg-semibold">
            AI가 추천하는 회원을 탐색해보세요
          </h3>
          <span className="block mt-3 text-secondary">준비중</span>
          {/* TODO: 내용 추가 */}
        </aside>
      ) : (
        // 미로그인 시 추천 섹션 수정
        <aside className="w-[321px] h-[194px] bg-white border border-gray-300 rounded-lg absolute top-8 right-[200px] py-6 px-9">
          <span className="block mt-3 text-secondary">준비중</span>
        </aside>
      )}
    </section>
  );
}
