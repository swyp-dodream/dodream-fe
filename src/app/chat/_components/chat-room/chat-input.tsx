'use client';

import { useLayoutEffect, useRef } from 'react';
import UpIcon from '@/assets/icons/up/16.svg';

interface ChatInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const placeholder = disabled
    ? '대화 상대가 채팅방을 나갔습니다.'
    : '메시지 보내기';

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
      event.preventDefault();
      onSend();
    }
  };

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const isEmpty = value.length === 0;

    textarea.style.height = 'auto';

    if (!isEmpty) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="w-full rounded-lg border-1 border-border-primary px-4 py-3 flex gap-4 items-end">
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="w-full h-auto placeholder-text-placeholder body-md-regular focus:outline-0 resize-none overflow-hidden"
        rows={1}
      />
      {value.length > 0 && (
        <button
          type="button"
          className="size-[22px] rounded-full bg-brand-500 flex justify-center items-center"
          onClick={onSend}
        >
          <UpIcon className="text-icon-white" />
        </button>
      )}
    </div>
  );
}
