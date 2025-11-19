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
  jobGroups: string[];
  appliedRoleId: number;
  appliedRoleName: string;
  message: string;
};
