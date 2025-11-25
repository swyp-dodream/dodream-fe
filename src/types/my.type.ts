import type { MatchingCancelReasonCode } from '@/constants/matching.constant';
import type { PostStatusType, ProjectType } from '@/types/post.type';
import type { ActivityModeType } from '@/types/profile.type';

/** 내 지원 상세 조회 응답 타입 */
export type GetMyApplicationDetailResponseType = {
  applicationId: bigint;
  postId: bigint;
  postTitle: string;
  projectType: ProjectType;
  activityMode: ActivityModeType;
  status: PostStatusType;
  leaderName: string;
  leaderProfileImage: string;
  roleName: string;
  roleCode: string;
  message: string;
  appliedAt: Date;
};

/** 매칭 취소 */
export type { MatchingCancelReasonCode } from '@/constants/matching.constant';
export type CancelMatchingParams = {
  matchingId: bigint;
};
export type CancelMatchingBody = {
  reasonCode: MatchingCancelReasonCode;
  reasonText?: string;
};

export type CancelMatchingRequestType = {
  params: CancelMatchingParams;
  body: CancelMatchingBody;
};

/** 내가 쓴 글 조회 */
export type MyPostsResponseType = {
  posts: MyPostsContentType[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type MyPostsContentType = {
  postId: bigint;
  title: string;
  projectType: string;
  activityMode: string;
  duration: string;
  status: string;
  deadlineAt: string;
  viewCount: number;
  fields: string[];
  roleRequirements: {
    roleName: string;
    headcount: number;
  }[];
  stacks: string[];
  createdAt: string;
  updatedAt: string;
};

/** 내 모집글 지원자 목록 타입 */
export type MyPostApplicationsType = {
  users: MyPostApplicantType[];
  nextCursor: number;
  hasNext: boolean;
};

export type MyPostApplicantType = {
  suggestionId: bigint;
  applicationId: bigint;
  userId: bigint;
  nickname: string;
  profileImage: string;
  status: string;
  createdAt: string;
  experience: string;
  jobGroups: string[];
};

/** 내 모집글 지원자 상세 타입 */
export type MyPostApplicantDetailType = {
  applicationId: bigint;
  userId: bigint;
  nickname: string;
  profileImage: string;
  status: string;
  createdAt: string;
  experience: string;
  appliedRoleId: number;
  appliedRoleName: string;
  message: string;
};

/** 내 모집글 지원자 프로필 타입 */
export type MyPostApplicantProfileType = {
  nickname: string;
  experience: string;
  activityMode: string;
  introText: string;
  profileImageCode: number;
  roles: {
    id: number;
    code: string;
    name: string;
  }[];
  interestKeywords: {
    id: number;
    categoryId: number;
    name: string;
  }[];
  techSkills: {
    id: number;
    categoryId: number;
    name: string;
  }[];
  profileUrls: {
    id: bigint;
    url: string;
  }[];
};

/** 내 제안 내역 */
export type MyPostOffersType = {
  users: MyPostOfferUserType[];
  nextCursor: number;
  hasNext: boolean;
};

export type MyPostOfferUserType = {
  matchedId: bigint;
  suggestionId: bigint;
  applicationId: bigint;
  userId: bigint;
  nickname: string;
  profileImage: string;
  status: string;
  createdAt: string;
  experience: string;
  jobGroups: string[];
};

/** 내 모집글 추천 지원자 타입 */
export type MyPostRecommendedApplications = {
  applicants: MyPostRecommendedApplicant[];
  totalCount: 3;
};

export type MyPostRecommendedApplicant = {
  applicationId: bigint;
  profileId: bigint;
  nickname: string;
  profileImageUrl: string;
  role: string;
  career: string;
  applicationMessage: string;
  similarity: number;
  tags: string[];
};

/** ApplicantSection에서 사용할 지원자 타입 정의 */
export type ApplicantRowUserType = {
  suggestionId?: bigint;
  applicationId: bigint;
  userId: bigint;
  nickname: string;
  profileImage: string;
  experience: string;
  role: string;
  tags?: string[];
};
