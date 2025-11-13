import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import type { UserType } from '@/types/auth.type';
import type { AiRequestDataType } from '@/types/profile.type';
import { tokenStorage } from '@/utils/auth.util';
import { api, authApi } from './fetcher/api';

const userApi = {
  /** 유저 정보 */
  getUser: () => authApi.get<UserType>('/api/auth/me'),

  /** 로그아웃 */
  logout: async () => {
    try {
      await authApi.post('/api/auth/logout');
      tokenStorage.clearAll();
      queryClient.removeQueries({ queryKey: [QUERY_KEY.user] });
    } catch {
      throw Error('로그아웃 실패');
    }
  },

  /** 유저 프로필 존재 여부 */
  getProfileExists: () =>
    authApi.get<{ exists: boolean }>('/api/profiles/me/exists'),

  /** 닉네임 중복 여부 체크 */
  checkNickname: (nickname: string) =>
    authApi.get<{ available: boolean; nickname: string }>(
      `/api/profiles/check-nickname?nickname=${nickname}`,
    ),

  /** 유저 프로필 */
  getProfile: () => authApi.get<UserType>('/api/profiles/me'),

  /** AI 자기소개 */
  // TODO: 다른 곳으로 이동
  getAiIntro: (data: AiRequestDataType) =>
    api.post<string>('/api/profiles/intro/ai-draft', data),
};

export default userApi;
