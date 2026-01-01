import { cn } from '@/utils/style.util';

interface MessageBubbleProps {
  isMyMessage?: boolean;
  message: string;
  isLast: boolean;
}

export default function MessageBubble({
  isMyMessage,
  message,
  isLast,
}: MessageBubbleProps) {
  return (
    <div
      className={cn('rounded-lg px-4 py-3 w-fit', {
        'bg-chip-selected text-on-brand ml-auto': isMyMessage,
        'rounded-br-none': isMyMessage && isLast,
        'bg-container-primary text-primary': !isMyMessage,
        'rounded-bl-none': !isMyMessage && isLast,
      })}
    >
      {message}
    </div>
  );
}
