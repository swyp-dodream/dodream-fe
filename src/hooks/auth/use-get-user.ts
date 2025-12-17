import { queryOptions, useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { clientApis } from '@/services/client.api';

export const userQueryOptions = queryOptions({
  queryKey: [QUERY_KEY.user],
  queryFn: clientApis.user.getUser,
  retry: false,
});

/** 유저 기본 정보 */
export default function useGetUser() {
  return useQuery(userQueryOptions);
}
