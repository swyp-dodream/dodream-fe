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
