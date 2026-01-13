'use client';

import { type ReactNode, useEffect } from 'react';
import { BASE_URL } from '@/constants/auth.constant';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const eventSource = new EventSource(
      `${BASE_URL}/api/v1/notifications/stream`,
      {
        withCredentials: true,
      },
    );

    eventSource.addEventListener('notification', (event) => {
      console.log('알림 정보:', event.data);

      try {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.auth, QUERY_KEY.notifications],
        });
      } catch (error) {
        console.error('알림 파싱 오류:', error);
      }
    });

    eventSource.onerror = (error) => {
      console.error('SSE 오류:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return children;
};
