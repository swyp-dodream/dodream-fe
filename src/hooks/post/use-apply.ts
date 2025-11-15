import { useMutation, useQuery } from '@tanstack/react-query';
import postApi from '@/apis/post.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { useGetProfileExists } from '../auth/use-get-profile';

/** 지원 */
export function useApply() {
  return useMutation({
    mutationFn: ({
      postId,
      roleId,
      message = '',
    }: {
      postId: number;
      roleId: number;
      message?: string;
    }) => postApi.apply(postId, { roleId, message }),
    onSuccess: () => {
      // TODO: 쿼리 무효화 로직 실행
    },
  });
}

/** 지원 가능 여부 판단 */
export function useGetApplyAvailable(postId: number) {
  const { data: profileExists } = useGetProfileExists();

  return useQuery({
    queryKey: [QUERY_KEY.canApply],
    queryFn: () => postApi.getApplyAvailable(postId),
    enabled: profileExists?.exists === true, // 프로필 있을 때만 판단
  });
}
