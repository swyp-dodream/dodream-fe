const TEXT = {
  ALL: {
    title: '아직 시작된 대화가 없습니다',
    description: '관심 있는 멤버에게 대화를 걸어보세요',
  },
  UNREAD: {
    title: '모든 메시지를 확인했습니다',
    description: '새로운 메시지가 도착하면 여기에 표시됩니다',
  },
};

interface ChatListEmptyProps {
  tabValue: 'ALL' | 'UNREAD';
}

export default function ChatListEmpty({ tabValue }: ChatListEmptyProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="body-md-regular text-primary">{TEXT[tabValue].title}</p>
      <p className="body-sm-regular text-subtle">
        {TEXT[tabValue].description}
      </p>
    </div>
  );
}
