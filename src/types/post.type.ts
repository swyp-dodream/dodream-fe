import type { ActivityModeType } from './profile.type';

/** 게시글 데이터 타입 */
export type PostType = {
  content: PostContentType[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  empty: boolean;
};

/** 게시글 컨텐츠 타입 / 게시글 상세 타입 */
export type PostContentType = {
  id: bigint;
  title: string;
  content: string;
  status: PostStatusType;
  createdAt: string;
  ownerNickname: string;
  ownerProfileImageUrl: string;
  projectType: ProjectType;
  activityMode: ActivityModeType;
  duration: DurationType;
  deadlineDate: string;
  interestKeywords: string[];
  viewCount: number;
  stacks: string[];
  roles: {
    role: string;
    headcount: number;
  }[];
  owner: boolean;
};

/** 상세 페이지 멤버 내역 */
export type PostMembersType = {
  users: {
    suggestionId: number;
    applicationId: number;
    userId: number;
    nickname: string;
    profileImage: string;
    status: string;
    createdAt: string;
    experience: string;
    jobGroups: string[];
  }[];
  nextCursor: 0;
  hasNext: true;
};

/** AI 추천 게시글 타입 */
export type RecommendedPostsType = {
  posts: RecommendedPostContentType[];
  nextCursor: number;
  hasNext: boolean;
};

/** AI 추천 게시글 컨텐츠 타입 */
export type RecommendedPostContentType = {
  postId: bigint;
  title: string;
  projectType: ProjectType;
  activityMode: ActivityModeType;
  deadlineAt: string;
  similarity: number;
  fields: string[];
};

/** 모집글 생성 응답 타입 */
export type CreatePostResponseType = PostContentType;

export type ProjectType = 'PROJECT' | 'STUDY';
export type HomeProjectType = ProjectType | 'ALL';

export type PostStatusType = 'COMPLETED' | 'RECRUITING';

/** 기간 타입 */
export type DurationType =
  | 'UNDECIDED'
  | 'UNDER_ONE_MONTH'
  | 'ONE_MONTH'
  | 'TWO_MONTHS'
  | 'THREE_MONTHS'
  | 'FOUR_MONTHS'
  | 'FIVE_MONTHS'
  | 'SIX_MONTHS'
  | 'LONG_TERM';
