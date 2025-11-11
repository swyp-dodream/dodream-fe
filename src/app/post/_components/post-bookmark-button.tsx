import BookmarkIcon from '@/assets/icons/bookmark/24.svg';

interface PostBookmarkButtonProps {
  isBookmarked: boolean;
}

/**
 * 게시글 상세의 북마크 버튼 컴포넌트
 * @param isBookmarked - 북마크 여부
 */
export default function PostBookmarkButton({
  isBookmarked,
}: PostBookmarkButtonProps) {
  return (
    <button
      type="button"
      aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
    >
      <BookmarkIcon
        className={
          isBookmarked
            ? 'fill-bg-brand text-bg-brand'
            : 'fill-none text-icon-light'
        }
      />
    </button>
  );
}
