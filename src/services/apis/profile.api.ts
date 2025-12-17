import type { UpdateProfileSettingsFormData } from '@/schemas/profile.schema';
import type {
  AiRequestType,
  CreateProfileRequestType,
  GetProfileSettingsResponseType,
  UpdateProfileRequestType,
} from '@/types/profile.type';
import { api } from '../fetcher/fetcher';

const profileApi = {
  /** 닉네임 중복 여부 체크 */
  checkNickname: (nickname: string) =>
    api.get<{ available: boolean; nickname: string }>(
      `/api/profiles/check-nickname?nickname=${nickname}`,
    ),

  /** AI 자기소개 */
  getAiIntro: (data: AiRequestType) =>
    api.post<string>('/api/profiles/intro/ai-draft', data),

  /** 프로필 생성 */
  createProfile: (data: CreateProfileRequestType) =>
    api.post<void>('/api/profiles', data),

  /** 프로필 수정 */
  updateProfile: (data: UpdateProfileRequestType) =>
    api.put(`/api/profiles/me`, data),

  /** 내 계정 설정 조회 */
  getProfileSettings: () =>
    api.get<GetProfileSettingsResponseType>('/api/profiles/settings'),

  /** 내 계정 설정 수정 */
  updateProfileSettings: (payload: UpdateProfileSettingsFormData) =>
    api.put<UpdateProfileSettingsFormData>('/api/profiles/settings', payload),
};

export default profileApi;
