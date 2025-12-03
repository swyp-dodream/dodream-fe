/** 알림 타입 */
export type NotificationResponseType = {
  createdAt: string;
  updatedAt: string;
  id: bigint;
  receiverId: bigint;
  type: NotificationType;
  message: string;
  targetPostId: bigint;
  targetPostTitle: string;
  read: boolean;
};

/** 알림 종류 */
export type NotificationType =
  | 'PROPOSAL_SENT'
  | 'PROPOSAL_APPLIED'
  | 'APPLICATION_ACCEPTED'
  | 'BOOKMARK_DEADLINE'
  | 'REVIEW_ACTIVATED'
  | 'FEEDBACK_WRITTEN';
