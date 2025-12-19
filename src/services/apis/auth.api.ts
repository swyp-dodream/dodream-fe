import type { UserType } from '@/types/auth.type';
import type { createApiMethods } from '../fetcher/create-api';

export function createAuthApi(apiClient: ReturnType<typeof createApiMethods>) {
  return {
    /** 유저 정보 */
    getUser: () => apiClient.get<UserType>('/api/auth/me'),

    /** 로그아웃 */
    logout: () => apiClient.post('/api/auth/logout'),

    /** 회원탈퇴 */
    deleteUser: () => apiClient.delete<void>('/api/users/withdraw'),
  };
}
