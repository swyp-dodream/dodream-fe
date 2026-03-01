import { cn } from '@/utils/style.util';

/**
 * 스켈레톤 UI
 * @param count - 아이템 개수
 * @param listClassName - 스켈레톤 목록 스타일
 * @param itemClassName - 스켈레톤 아이템 스타일
 */
export default function Skeleton({
  count,
  listClassName,
  itemClassName,
}: {
  count: number;
  listClassName?: string;
  itemClassName?: string;
}) {
  return (
    <ul className={listClassName}>
      {Array.from({ length: count }, () => crypto.randomUUID()).map((key) => (
        <li
          key={key}
          className={cn('bg-gray-200 rounded-lg animate-pulse', itemClassName)}
        />
      ))}
    </ul>
  );
}
