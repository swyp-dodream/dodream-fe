import { useMutation } from '@tanstack/react-query';
import userApi from '@/apis/user.api';
import type { AiRequestDataType } from '@/types/profile.type';

export default function useGenerateAiIntro() {
  return useMutation({
    mutationFn: (data: AiRequestDataType) => userApi.getAiIntro(data),
    onError: (error) => {
      console.error('AI 초안 생성 실패:', error);
    },
    retry: false,
  });
}
