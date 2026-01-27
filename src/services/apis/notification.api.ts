import type { NotificationResponseType } from '@/types/notification.type';
import type { createApiMethods } from '../fetcher/create-api';

export function createNotificationApi(
  apiClient: ReturnType<typeof createApiMethods>,
) {
  return {
    /** 알림 목록 */
    getNotifications: () =>
      apiClient.get<NotificationResponseType[]>('/api/v1/notifications'),

    /** 알림 읽기 */
    readNotification: (id: bigint) =>
      apiClient.post(`/api/v1/notifications/${id}/read`),
  };
}
