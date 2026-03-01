import { Checkbox } from '@/components/commons/check-box';
import {
  NEGATIVE_TAGS,
  POSITIVE_TAGS,
  REVIEW_ICONS,
  REVIEW_TAG_LABEL,
} from '@/constants/review.constant';
import type { ReviewTag } from '@/types/review.type';

interface ReviewDetailSelectProps {
  type?: 'positive' | 'negative';
  selectedTags: ReviewTag[];
  onChange: (tags: ReviewTag[]) => void;
}

/** 리뷰 선택 창 */
export default function ReviewDetailSelect({
  type = 'positive',
  selectedTags,
  onChange,
}: ReviewDetailSelectProps) {
  const tags = type === 'positive' ? POSITIVE_TAGS : NEGATIVE_TAGS;

  return (
    <ul className="grid grid-cols-2 [&>li]:py-4 [&>li]:border-b [&>li]:border-border-primary [&>li:nth-last-child(-n+2)]:border-b-0">
      {tags.map((tag) => {
        const Icon = REVIEW_ICONS[tag];

        return (
          <li key={tag} className="flex items-center mx-3">
            <label
              htmlFor={`review-${tag}`}
              className="flex items-center cursor-pointer gap-4"
            >
              <Checkbox
                name="review"
                id={`review-${tag}`}
                checked={selectedTags.includes(tag)}
                onChange={() => {
                  const isSelected = selectedTags.includes(tag);
                  if (isSelected) {
                    onChange(selectedTags.filter((t) => t !== tag));
                  } else {
                    onChange([...selectedTags, tag]);
                  }
                }}
              />

              <div className="flex items-center gap-2">
                <Icon aria-hidden="true" className="text-primary" />
                <span className="body-md-regular">{REVIEW_TAG_LABEL[tag]}</span>
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
