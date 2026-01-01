'use client';

import ChatListHeader from '@/app/(header-only)/chat/_components/chat-list/chat-list-header';
import ChatListItems from '@/app/(header-only)/chat/_components/chat-list/chat-list-items';
import { ChatListTabs } from '@/app/(header-only)/chat/_components/chat-list/chat-list-tabs';
import type { ChatListItemType } from '@/types/chat.type';

const CHAT_LIST_TABS = [
  { tabValue: 'ALL', label: '전체' },
  { tabValue: 'UNREAD', label: '읽지 않음' },
] as const;

interface ChatListProps {
  onSelectChat: (chat: ChatListItemType) => void;
  selectedChat: ChatListItemType | null;
}

export default function ChatList({
  onSelectChat,
  selectedChat,
}: ChatListProps) {
  return (
    <ChatListTabs
      className="col-span-3 border-r-1 border-border-primary"
      defaultValue={CHAT_LIST_TABS[0].tabValue}
    >
      <ChatListHeader
        tabs={
          <ChatListTabs.List>
            {CHAT_LIST_TABS.map(({ tabValue, label }) => (
              <ChatListTabs.Trigger key={tabValue} value={tabValue}>
                {label}
              </ChatListTabs.Trigger>
            ))}
          </ChatListTabs.List>
        }
      />

      {CHAT_LIST_TABS.map(({ tabValue }) => (
        <ChatListItems
          key={tabValue}
          tabValue={tabValue}
          onSelectChat={onSelectChat}
          selectedChat={selectedChat}
        />
      ))}
    </ChatListTabs>
  );
}
