import type { ReviewResponseType } from '@/types/review.type';

export const members = [
  { id: BigInt(1), nickname: '유저1' },
  { id: BigInt(2), nickname: '유저2' },
  { id: BigInt(3), nickname: '유저3' },
  { id: BigInt(4), nickname: '유저4' },
  { id: BigInt(5), nickname: '유저5' },
];

export const reviews: ReviewResponseType[] = [
  {
    feedbackId: BigInt(1),
    postId: BigInt(101),
    postTitle: 'Next.js 프로젝트 팀원 모집',
    feedbackType: 'positive',
    options: ['GOOD_COMMUNICATION', 'KEEPS_PROMISES', 'RESPONSIBLE'],
    receivedAt: '2025-02-15T09:30:00Z',
  },
  {
    feedbackId: BigInt(2),
    postId: BigInt(102),
    postTitle: 'React 스터디 그룹 모집',
    feedbackType: 'positive',
    options: ['POSITIVE_ENERGY', 'PROBLEM_SOLVER', 'RESPECTS_OPINIONS'],
    receivedAt: '2025-02-20T14:00:00Z',
  },
  {
    feedbackId: BigInt(3),
    postId: BigInt(103),
    postTitle: '포트폴리오 피드백 구합니다',
    feedbackType: 'negative',
    options: ['POOR_COMMUNICATION', 'BREAKS_PROMISES'],
    receivedAt: '2025-02-25T11:15:00Z',
  },
  {
    feedbackId: BigInt(4),
    postId: BigInt(104),
    postTitle: '사이드 프로젝트 백엔드 개발자 구해요',
    feedbackType: 'positive',
    options: ['KEEPS_PROMISES', 'RESPONSIBLE', 'GOOD_COMMUNICATION'],
    receivedAt: '2025-03-01T16:45:00Z',
  },
  {
    feedbackId: BigInt(5),
    postId: BigInt(105),
    postTitle: 'TypeScript 스터디 모집',
    feedbackType: 'negative',
    options: ['IGNORES_OPINIONS', 'LACKS_RESPONSIBILITY', 'NEGATIVE_INFLUENCE'],
    receivedAt: '2025-03-02T10:00:00Z',
  },
];
