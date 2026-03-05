import { REVIEW_ICONS, REVIEW_TAG_LABEL } from '@/constants/review.constant';

interface ReviewTag {
  tag: keyof typeof REVIEW_ICONS;
  count: number;
}

interface ReviewTagListProps {
  reviews: ReviewTag[];
  variant?: 'default' | 'grid';
}

/**
 * 받은 리뷰 태그 리스트
 * @param variant - default(vertical) 또는 grid
 */
export function ReviewTagList({
  reviews,
  variant = 'default',
}: ReviewTagListProps) {
  const isGrid = variant === 'grid';

  return (
    <ul
      className={
        isGrid ? 'grid grid-cols-2 gap-y-3 gap-x-5' : 'flex flex-col gap-3'
      }
    >
      {reviews.map((tag) => {
        const Icon = REVIEW_ICONS[tag.tag][isGrid ? 14 : 16];

        return (
          <li
            key={tag.tag}
            className={`flex items-center bg-primary py-4 px-5 rounded-md justify-between ${
              !isGrid ? 'body-lg-medium' : ''
            }`}
          >
            <div className={`flex items-center ${isGrid ? 'gap-2' : 'gap-3'}`}>
              <Icon aria-hidden="true" className="text-primary" />
              <span className={isGrid ? 'body-md-regular' : ''}>
                {REVIEW_TAG_LABEL[tag.tag]}
              </span>
            </div>
            {tag.count}
          </li>
        );
      })}
    </ul>
  );
}
