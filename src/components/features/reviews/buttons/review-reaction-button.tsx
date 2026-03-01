import clsx from 'clsx';
import ThumbsDownIcon from '@/assets/icons/thumbs-down/14.svg';
import ThumbsUpIcon from '@/assets/icons/thumbs-up/14.svg';
import type { Reaction } from '@/types/review.type';

interface ReviewReactionButtonProps {
  variant: Reaction;
  onClick: () => void;
  selected?: boolean;
}

/** 좋았어요 / 아쉬워요 버튼 */
export default function ReviewReactionButton({
  variant,
  onClick,
  selected,
}: ReviewReactionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex items-center justify-center gap-2 body-md-regular w-full py-3 rounded-sm hover:bg-container-primary-hover active:bg-container-primary-pressed',
        selected
          ? 'bg-container-primary-pressed hover:bg-container-primary-pressed'
          : 'bg-container-primary',
      )}
    >
      {variant === 'positive' ? (
        <>
          <ThumbsUpIcon />
          좋았어요
        </>
      ) : (
        <>
          <ThumbsDownIcon />
          아쉬웠어요
        </>
      )}
    </button>
  );
}
