import Image from 'next/image';
import Link from 'next/link';
import BookmarkIcon from '@/assets/icons/bookmark/20.svg';
import PostCardProjectType from '@/components/features/post/post-card/post-card-project-type';
import PostCardRoles from '@/components/features/post/post-card/post-card-roles';
import PostCardStatus from '@/components/features/post/post-card/post-card-status';
import PostCardTechCategories from '@/components/features/post/post-card/post-card-tech-categories';
import PostCardViews from '@/components/features/post/post-card/post-card-views';

/**
 * 카드 전체 레이아웃
 */
function Root({
  children,
  avatarUrl,
}: {
  children: React.ReactNode;
  avatarUrl?: string;
}) {
  return (
    // TODO: 추후에 게시물 상세페이지 링크걸기
    <Link href="#">
      <article className="rounded-lg border-1 border-border-primary p-7 bg-surface flex gap-4">
        {/* 왼쪽 아바타 영역 */}
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="프로필 이미지"
            width={36}
            height={36}
            className="rounded-full size-9 object-cover shrink-0"
          />
        ) : (
          <div className="rounded-full bg-primary size-9 shrink-0" />
        )}

        {/* 오른쪽 영역 */}
        <div className="flex flex-col w-full gap-4">{children}</div>
      </article>
    </Link>
  );
}

/**
 * 카드 헤더 - 닉네임, 남은 기한, 종류(프로젝트/스터디), 북마크 아이콘
 */
function Header({
  nickname,
  elapsedTime,
  projectType,
  isBookmarked,
}: {
  nickname: string;
  elapsedTime: string;
  projectType: 'project' | 'study';
  isBookmarked: boolean;
}) {
  return (
    <header className="flex justify-between w-full items-center">
      <div className="flex gap-3 items-center">
        <span className="body-md-medium text-primary">{nickname}</span>
        {/* TODO: time 태그 형식 맞추기 */}
        <time
          className="body-md-regular text-subtle"
          dateTime={elapsedTime}
          title={elapsedTime}
        >
          {elapsedTime}
        </time>
      </div>

      <div className="flex gap-3 items-center">
        <PostCardProjectType projectType={projectType} />
        <button
          type="button"
          aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
        >
          <BookmarkIcon
            className={
              isBookmarked
                ? 'fill-bg-brand text-bg-brand'
                : 'fill-none text-border-secondary'
            }
          />
        </button>
      </div>
    </header>
  );
}

/**
 * 메인 영역 (본문 영역 래퍼)
 */
function Main({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col gap-8">{children}</section>;
}

/**
 * 카드 제목 (두 줄 clamp + 고정 높이 유지)
 */
function Title({ children }: { children: React.ReactNode }) {
  // TODO: 고정 높이로 되어있는 h-[50px] 바꾸기
  return <h2 className="heading-sm line-clamp-2 h-[50px]">{children}</h2>;
}

/**
 * 카드 푸터 - 조회수, 모집 상태
 */
function Footer({
  views,
  status,
}: {
  views: number;
  status: 'recruiting' | 'completed';
}) {
  return (
    <footer className="flex gap-5 text-secondary">
      <PostCardViews views={views} />
      <PostCardStatus status={status} />
    </footer>
  );
}

export const PostCard = Object.assign(Root, {
  Header,
  Main,
  Title,
  TechCategories: PostCardTechCategories,
  Roles: PostCardRoles,
  Footer,
});
