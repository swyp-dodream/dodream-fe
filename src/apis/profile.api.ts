import type {
  AiRequestType,
  CreateProfileRequestType,
} from '@/types/profile.type';
import { api, authApi } from './fetcher/api';

const profileApi = {
  /** 닉네임 중복 여부 체크 */
  checkNickname: (nickname: string) =>
    authApi.get<{ available: boolean; nickname: string }>(
      `/api/profiles/check-nickname?nickname=${nickname}`,
    ),

  /** AI 자기소개 */
  getAiIntro: (data: AiRequestType) =>
    api.post<string>('/api/profiles/intro/ai-draft', data),

  /** 프로필 생성 */
  createProfile: (data: CreateProfileRequestType) =>
    authApi.post<void>('/api/profiles', data),
};

export default profileApi;
