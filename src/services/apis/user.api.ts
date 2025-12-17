import type { UserType } from '@/types/auth.type';
import type { ProfileType } from '@/types/profile.type';
import type { createApiMethods } from '../fetcher/create-api';
import { api } from '../fetcher/fetcher';

export function createUserApi(apiClient: ReturnType<typeof createApiMethods>) {
  return {
    /** 유저 정보 */
    getUser: () => apiClient.get<UserType>('/api/auth/me'),

    /** 로그아웃 */
    logout: () => apiClient.post('/api/auth/logout'),

    /** 회원탈퇴 */
    deleteUser: () => apiClient.delete<void>('/api/users/withdraw'),

    /** 유저 프로필 존재 여부 */
    getProfileExists: async (): Promise<{ exists: boolean }> => {
      try {
        return await apiClient.get<{ exists: boolean }>(
          '/api/profiles/me/exists',
        );
      } catch {
        return { exists: false };
      }
    },

    /** 유저 프로필 */
    getProfile: () => apiClient.get<ProfileType>('/api/profiles/me'),
  };
}

const userApi = createUserApi(api);
export default userApi;
