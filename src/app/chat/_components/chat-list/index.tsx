import ChatListHeader from '@/app/chat/_components/chat-list/chat-list-header';
import ChatListItems from '@/app/chat/_components/chat-list/chat-list-items';
import { ChatListTabs } from '@/app/chat/_components/chat-list/chat-list-tabs';

const CHAT_LIST_TABS = [
  { tabValue: 'ALL', label: '전체' },
  { tabValue: 'UNREAD', label: '읽지 않음' },
] as const;

export default function ChatList() {
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
        <ChatListItems key={tabValue} tabValue={tabValue} />
      ))}
    </ChatListTabs>
  );
}
