'use client';

import { ChatListTabs } from '@/app/chat/_components/chat-list/chat-list-tabs';
import useGetChatList from '@/hooks/chat/use-get-chat-list';
import type { ChatListItemType } from '@/types/chat.type';
import { getRelativeTime } from '@/utils/date.util';
import { cn } from '@/utils/style.util';

interface ChatListItemsProps {
  tabValue: 'ALL' | 'UNREAD';
  onSelectChat: (chat: ChatListItemType) => void;
  selectedChat: ChatListItemType | null;
}

export default function ChatListItems({
  tabValue,
  onSelectChat,
  selectedChat,
}: ChatListItemsProps) {
  const { data: chatList } = useGetChatList(tabValue);

  return (
    <ChatListTabs.Content value={tabValue}>
      <ul className="flex flex-col gap-6">
        {chatList?.map((chatListItem) => (
          <ChatListItem
            key={chatListItem.roomId}
            chatListItem={chatListItem}
            onSelectChat={onSelectChat}
            isSelected={selectedChat?.roomId === chatListItem.roomId}
          />
        ))}
      </ul>
    </ChatListTabs.Content>
  );
}

interface ChatListItemProps {
  chatListItem: ChatListItemType;
  onSelectChat: (chat: ChatListItemType) => void;
  isSelected: boolean;
}

function ChatListItem({
  chatListItem,
  onSelectChat,
  isSelected,
}: ChatListItemProps) {
  return (
    <li>
      <button
        type="button"
        className={cn(
          'rounded-md px-4 py-5 flex gap-4 w-full items-center text-left cursor-pointer',
          isSelected && 'bg-container-primary',
        )}
        onClick={() => onSelectChat(chatListItem)}
      >
        {/* 프로필 이미지 */}
        <div className="size-9 rounded-full bg-primary shrink-0" />
        {/* 채팅 정보 */}
        <div className="w-full min-w-0">
          <div className="flex justify-between items-center">
            <span className="body-lg-medium text-primary">
              {chatListItem.roomName}
            </span>
            <span className="body-sm-regular text-subtle">
              {getRelativeTime(chatListItem.lastMessageAt.toString())}
            </span>
          </div>
          <p className="truncate">{chatListItem.lastMessage}</p>
        </div>
      </button>
    </li>
  );
}
