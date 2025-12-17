import { useMutation } from '@tanstack/react-query';
import profileApi from '@/services/apis/profile.api';
import type { AiRequestType } from '@/types/profile.type';

/** AI 자기소개 생성 */
export default function useGenerateAiIntro() {
  return useMutation({
    mutationFn: (data: AiRequestType) => profileApi.getAiIntro(data),
    onError: (error) => {
      console.error('AI 초안 생성 실패:', error);
    },
    retry: false,
  });
}
