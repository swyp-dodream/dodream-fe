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

/** 게시글 컨텐츠 타입 */
export type PostContentType = {
  id: number;
  title: string;
  content: string;
  status: PostStatusType;
  createdAt: string;
  ownerNickname: string;
  ownerProfileImageUrl: string;
  projectType: ProjectType;
  activityMode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
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

export type ProjectType = 'PROJECT' | 'STUDY';

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
