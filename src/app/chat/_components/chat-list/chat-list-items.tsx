'use client';

import { ChatListTabs } from '@/app/chat/_components/chat-list/chat-list-tabs';
import useGetChatList from '@/hooks/chat/use-get-chat-list';
import type { ChatListItemType } from '@/types/chat.type';

interface ChatListItemsProps {
  tabValue: 'ALL' | 'UNREAD';
}

export default function ChatListItems({ tabValue }: ChatListItemsProps) {
  const { data: chatList } = useGetChatList(tabValue);

  return (
    <ChatListTabs.Content value={tabValue}>
      <ul className="flex flex-col gap-6">
        {chatList?.map((chatListItem) => (
          <ChatListItem key={chatListItem.roomId} chatListItem={chatListItem} />
        ))}
      </ul>
    </ChatListTabs.Content>
  );
}

interface ChatListItemProps {
  chatListItem: ChatListItemType;
}

function ChatListItem({ chatListItem }: ChatListItemProps) {
  return (
    // 선택된거면 bg-primary
    <li className="rounded-md px-4 py-5 flex gap-4">
      <div className="size-9 rounded-full bg-primary" />
      <div>
        <div className="flex justify-between items-center">
          <span className="body-lg-medium text-primary">
            {chatListItem.leaderId}
          </span>
          <span className="body-sm-regular text-subtle">{'2분'}</span>
        </div>
        <p className="line-clamp-1">내용내용내용내용내용내용내용내용내용내용</p>
      </div>
    </li>
  );
}
