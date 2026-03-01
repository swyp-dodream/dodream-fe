import type { FC, SVGProps } from 'react';
import CalendarCheckIcon from '@/assets/icons/calendar-check/14.svg';
import EarIcon from '@/assets/icons/ear/14.svg';
import HandFirstIcon from '@/assets/icons/hand-fist/14.svg';
import KeyIcon from '@/assets/icons/key/14.svg';
import SpeechIcon from '@/assets/icons/speech/14.svg';
import UserRoundIcon from '@/assets/icons/users-round/14.svg';
import type { ReviewTag } from '@/types/review.type';

export const REVIEW_TAG_LABEL: Record<ReviewTag, string> = {
  GOOD_COMMUNICATION: '소통이 원활해요',
  KEEPS_PROMISES: '약속된 일정을 잘 지켜요',
  RESPONSIBLE: '일을 책임감 있게 수행해요',
  POSITIVE_ENERGY: '긍정적인 에너지가 좋아요',
  PROBLEM_SOLVER: '문제 해결력이 뛰어나요',
  RESPECTS_OPINIONS: '다른 의견을 존중해요',
  POOR_COMMUNICATION: '소통이 원활하지 않아요',
  BREAKS_PROMISES: '일정을 지키지 않아요',
  LACKS_RESPONSIBILITY: '책임감이 아쉬워요',
  NEGATIVE_INFLUENCE: '분위기에 부정적 영향을 줘요',
  POOR_PROBLEM_SOLVING: '문제 상황 해결이 미흡해요',
  IGNORES_OPINIONS: '다른 의견을 잘 듣지 않아요',
};

export const POSITIVE_TAGS: ReviewTag[] = [
  'GOOD_COMMUNICATION',
  'KEEPS_PROMISES',
  'RESPONSIBLE',
  'POSITIVE_ENERGY',
  'PROBLEM_SOLVER',
  'RESPECTS_OPINIONS',
];

export const NEGATIVE_TAGS: ReviewTag[] = [
  'POOR_COMMUNICATION',
  'BREAKS_PROMISES',
  'LACKS_RESPONSIBILITY',
  'NEGATIVE_INFLUENCE',
  'POOR_PROBLEM_SOLVING',
  'IGNORES_OPINIONS',
];

/** 리뷰 태그 아이콘 */
export const REVIEW_ICONS: Record<ReviewTag, FC<SVGProps<SVGElement>>> = {
  GOOD_COMMUNICATION: SpeechIcon,
  KEEPS_PROMISES: CalendarCheckIcon,
  RESPONSIBLE: HandFirstIcon,
  POSITIVE_ENERGY: UserRoundIcon,
  PROBLEM_SOLVER: KeyIcon,
  RESPECTS_OPINIONS: EarIcon,

  POOR_COMMUNICATION: SpeechIcon,
  BREAKS_PROMISES: CalendarCheckIcon,
  LACKS_RESPONSIBILITY: HandFirstIcon,
  NEGATIVE_INFLUENCE: UserRoundIcon,
  POOR_PROBLEM_SOLVING: KeyIcon,
  IGNORES_OPINIONS: EarIcon,
};
