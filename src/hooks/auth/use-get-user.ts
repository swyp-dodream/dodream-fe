import { queryOptions, useQuery } from '@tanstack/react-query';
import { clientApis } from '@/apis/client.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

export const userQueryOptions = queryOptions({
  queryKey: [QUERY_KEY.user],
  queryFn: clientApis.user.getUser,
  retry: false,
});

/** 유저 기본 정보 */
export default function useGetUser() {
  return useQuery(userQueryOptions);
}
