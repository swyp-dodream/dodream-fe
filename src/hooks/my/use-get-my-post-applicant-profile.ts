import { useQuery } from '@tanstack/react-query';
import myApi from '@/apis/my.api';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { useGetProfileExists } from '../profile/use-get-profile';

/** 내 모집글 지원자 프로필 */
export default function useGetMyPostApplicantProfile(
  postId: bigint,
  userId: bigint,
) {
  const { data: profileExists, isSuccess } = useGetProfileExists();

  return useQuery({
    queryKey: [
      QUERY_KEY.auth,
      QUERY_KEY.myPostApplicantProfile,
      postId.toString(),
      userId.toString(),
    ],
    queryFn: () =>
      myApi.getMyPostApplicantProfile(BigInt(postId), BigInt(userId)),
    enabled: isSuccess && profileExists.exists === true,
  });
}
