import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

const STALE_TIME = 10 * 60 * 1000; // 10분
const GC_TIME = 30 * 60 * 1000; // 30분

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
    },
  },
});

// 서버 컴포넌트용
export const getQueryClient = cache(() => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
      },
    },
  });
});
