import type { UpdateProfileSettingsFormData } from '@/schemas/profile.schema';
import type {
  AiRequestType,
  CreateProfileRequestType,
  GetProfileSettingsResponseType,
  UpdateProfileRequestType,
} from '@/types/profile.type';
import type { createApiMethods } from '../fetcher/create-api';

export function createProfileApi(
  apiClient: ReturnType<typeof createApiMethods>,
) {
  return {
    /** 닉네임 중복 여부 체크 */
    checkNickname: (nickname: string) =>
      apiClient.get<{ available: boolean; nickname: string }>(
        `/api/profiles/check-nickname?nickname=${nickname}`,
      ),

    /** AI 자기소개 */
    getAiIntro: (data: AiRequestType) =>
      apiClient.post<string>('/api/profiles/intro/ai-draft', data),

    /** 프로필 생성 */
    createProfile: (data: CreateProfileRequestType) =>
      apiClient.post<void>('/api/profiles', data),

    /** 프로필 수정 */
    updateProfile: (data: UpdateProfileRequestType) =>
      apiClient.put('/api/profiles/me', data),

    /** 내 계정 설정 조회 */
    getProfileSettings: () =>
      apiClient.get<GetProfileSettingsResponseType>('/api/profiles/settings'),

    /** 내 계정 설정 수정 */
    updateProfileSettings: (payload: UpdateProfileSettingsFormData) =>
      apiClient.put<UpdateProfileSettingsFormData>(
        '/api/profiles/settings',
        payload,
      ),
  };
}
