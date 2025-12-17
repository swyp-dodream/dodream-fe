import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import useToast from '@/hooks/use-toast';
import { queryClient } from '@/lib/query-client';
import type { UpdateProfileSettingsFormData } from '@/schemas/profile.schema';
import profileApi from '@/services/apis/profile.api';

export default function useUpdateProfileSettings() {
  const toast = useToast();

  return useMutation({
    mutationFn: (form: UpdateProfileSettingsFormData) =>
      profileApi.updateProfileSettings(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.profileSettings] });
      toast({ title: '변경사항이 저장되었습니다 ' });
    },
    onError: (error) => {
      console.error('계정 설정 수정 실패:', error);
      toast({ title: '변경사항을 저장하지 못했습니다' });
    },
  });
}
