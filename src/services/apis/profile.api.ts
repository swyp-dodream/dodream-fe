import type { UpdateProfileSettingsFormData } from '@/schemas/profile.schema';
import type { MyPostApplicantProfileType } from '@/types/my.type';
import type {
  AiRequestType,
  CreateProfileRequestType,
  GetProfileSettingsResponseType,
  ProfileType,
  UpdateProfileRequestType,
} from '@/types/profile.type';
import type { createApiMethods } from '../fetcher/create-api';

export function createProfileApi(
  apiClient: ReturnType<typeof createApiMethods>,
) {
  return {
    /** 내 계정 설정 조회 */
    getProfileSettings: () =>
      apiClient.get<GetProfileSettingsResponseType>('/api/profiles/settings'),

    /** 내 계정 설정 수정 */
    updateProfileSettings: (payload: UpdateProfileSettingsFormData) =>
      apiClient.put<UpdateProfileSettingsFormData>(
        '/api/profiles/settings',
        payload,
      ),

    /** 내 프로필 조회 */
    getProfile: () => apiClient.get<ProfileType>('/api/profiles/me'),

    /** 내 프로필 수정 */
    updateProfile: (data: UpdateProfileRequestType) =>
      apiClient.put('/api/profiles/me', data),

    /** 초기 프로필 생성 */
    createProfile: (data: CreateProfileRequestType) =>
      apiClient.post<void>('/api/profiles', data),

    /** AI 자기소개 초안 생성 */
    getAiIntro: (data: AiRequestType) =>
      apiClient.post<string>('/api/profiles/intro/ai-draft', data),

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

    /** 닉네임 중복 여부 체크 */
    checkNickname: (nickname: string) =>
      apiClient.get<{ available: boolean; nickname: string }>(
        `/api/profiles/check-nickname?nickname=${nickname}`,
      ),

    /** 내 모집글 지원자 프로필 조회 */
    getMyPostApplicantProfile: (postId: bigint, userId: bigint) =>
      apiClient.get<MyPostApplicantProfileType>(
        `/api/profiles/applicant/${userId}/post/${postId}`,
      ),
  };
}
