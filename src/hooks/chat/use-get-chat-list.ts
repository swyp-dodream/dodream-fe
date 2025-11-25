import { useQuery } from '@tanstack/react-query';
import chatApi from '@/apis/chat.api';
import { QUERY_KEY } from '@/constants/query-key.constant';

export default function useGetChatList(filter: 'ALL' | 'UNREAD') {
  return useQuery({
    queryKey: [QUERY_KEY.auth, QUERY_KEY.chatList, filter],
    queryFn: () => chatApi.getChatList(filter),
  });
}
