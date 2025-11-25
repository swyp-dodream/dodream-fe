interface ChatListHeaderProps {
  tabs: React.ReactNode;
}

export default function ChatListHeader({ tabs }: ChatListHeaderProps) {
  return (
    <div className="p-4 flex flex-col gap-4">
      <span className="body-lg-medium text-primary">채팅</span>
      {tabs}
    </div>
  );
}
