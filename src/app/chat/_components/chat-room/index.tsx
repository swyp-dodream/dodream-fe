'use client';

import { format, isToday, isYesterday } from 'date-fns';
import { ko } from 'date-fns/locale';
import { overlay } from 'overlay-kit';
import { useLayoutEffect, useRef, useState } from 'react';
import ChatInput from '@/app/chat/_components/chat-room/chat-input';
import LeaveChatRoomModal from '@/app/chat/_components/chat-room/leave-chat-room-modal';
import MessageBubble from '@/app/chat/_components/chat-room/message-bubble';
import LeaveChatIcon from '@/assets/icons/log-out/16.svg';
import ProfileImage from '@/components/commons/profile-image';
import type {
  ChatListItemType,
  ChatSubscribeMessageType,
  GroupedChatType,
} from '@/types/chat.type';
import { cn } from '@/utils/style.util';

const formatLabel = (date: Date) => {
  if (isToday(date)) return '오늘';
  if (isYesterday(date)) return '어제';
  return format(date, 'yyyy년 M월 d일');
};

const groupByDateAndTime = (
  messages: ChatSubscribeMessageType[],
  isMyMessage: (id: string) => boolean,
) =>
  Object.values(
    messages.reduce(
      (dates, message) => {
        const createdAt = new Date(message.createdAt);
        const dateLabel = formatLabel(createdAt); // 오늘 / 어제 / 그 이전은 날짜
        const minuteLabel = format(createdAt, 'a hh:mm', { locale: ko }); // 오전 12:33

        if (!dates[dateLabel]) {
          dates[dateLabel] = { label: dateLabel, groups: {} };
        }
        if (!dates[dateLabel].groups[minuteLabel]) {
          dates[dateLabel].groups[minuteLabel] = {
            minuteLabel,
            items: [],
          };
        }

        dates[dateLabel].groups[minuteLabel].items.push({
          ...message,
          isMyMessage: isMyMessage(message.senderId),
        });

        return dates;
      },
      {} as Record<
        string,
        {
          label: string;
          groups: Record<
            string,
            { minuteLabel: string; items: GroupedChatType[] }
          >;
        }
      >,
    ),
  );

interface ChatRoomProps {
  selectedChat: ChatListItemType | null;
  onSendMessage: (message: string) => Promise<void> | void;
  messages: ChatSubscribeMessageType[];
  isMyMessage: (id: string) => boolean;
  onLeave: () => void;
}

export default function ChatRoom({
  selectedChat,
  onSendMessage,
  messages,
  isMyMessage,
  onLeave,
}: ChatRoomProps) {
  const [newMessage, setNewMessage] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const disabled = messages.at(-1)?.messageType === 'LEAVE';
  const groupedMessages = groupByDateAndTime(messages, isMyMessage);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage('');
  };

  const handleOpenLeaveChatRoomModal = () => {
    overlay.open(({ isOpen, close }) => (
      <LeaveChatRoomModal
        isOpen={isOpen}
        onClose={close}
        roomId={selectedChat?.roomId}
        oppositeName={selectedChat?.roomName}
        onLeave={() => {
          onLeave();
          close();
        }}
      />
    ));
  };

  useLayoutEffect(() => {
    const container = messageContainerRef.current;

    if (!messages || messages.length === 0) {
      return;
    }

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <div className="col-span-5 flex flex-col min-h-0 h-full overflow-hidden">
      <header className="flex shrink-0 justify-between items-center sticky py-4">
        <div className="flex gap-4 items-center">
          {/* TODO: 프로필 이미지 교체 */}
          <ProfileImage
            src={null}
            size={32}
            userName={selectedChat?.roomName}
          />
          <span className="heading-sm">{selectedChat?.roomName}</span>
        </div>

        <button
          type="button"
          className="rounded-full bg-container-primary p-2 cursor-pointer"
          onClick={handleOpenLeaveChatRoomModal}
        >
          <LeaveChatIcon />
        </button>
      </header>

      <section
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto space-y-8 py-4"
      >
        {groupedMessages.map(({ groups, label }) => (
          <div key={label}>
            <p className="body-sm-medium text-primary text-center">{label}</p>

            {Object.values(groups).map(({ minuteLabel, items }) => (
              <div key={minuteLabel} className="flex flex-col gap-3">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      !item.isMyMessage &&
                        index === items.length - 1 &&
                        'flex gap-3',
                    )}
                  >
                    {!item.isMyMessage && index === items.length - 1 && (
                      <ProfileImage
                        src={null}
                        size={32}
                        userName={item.senderNickname}
                        className="self-end"
                      />
                    )}

                    <div
                      className={cn(
                        'flex flex-col gap-2',
                        !item.isMyMessage &&
                          index !== items.length - 1 &&
                          'ml-9',
                      )}
                    >
                      <p
                        className={cn(
                          'flex gap-3 pl-4 items-center',
                          item.isMyMessage && 'self-end',
                        )}
                      >
                        {!item.isMyMessage && (
                          <span className="text-secondary body-sm-medium">
                            {item.senderNickname}
                          </span>
                        )}
                        <span className="body-sm-medium text-subtle">
                          {minuteLabel}
                        </span>
                      </p>
                      <MessageBubble
                        isMyMessage={item.isMyMessage}
                        message={item.body}
                        isLast={index === items.length - 1}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </section>

      <footer className="shrink-0">
        <ChatInput
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          onSend={handleSendMessage}
          disabled={disabled}
        />
      </footer>
    </div>
  );
}
