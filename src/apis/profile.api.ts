import type { UpdateProfileSettingsFormData } from '@/schemas/profile.schema';
import type {
  AiRequestType,
  CreateProfileRequestType,
  GetProfileSettingsResponseType,
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

  /** 내 계정 설정 조회 */
  getProfileSettings: () =>
    authApi.get<GetProfileSettingsResponseType>('/api/profiles/settings'),

  /** 내 계정 설정 수정 */
  updateProfileSettings: (payload: UpdateProfileSettingsFormData) =>
    authApi.put<UpdateProfileSettingsFormData>(
      '/api/profiles/settings',
      payload,
    ),
};

export default profileApi;
