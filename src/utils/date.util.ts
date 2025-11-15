import {
  differenceInCalendarDays,
  format,
  formatDistanceToNow,
  startOfDay,
} from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDeadlineAt(deadlineAt: Date | string) {
  const date =
    typeof deadlineAt === 'string' ? new Date(deadlineAt) : deadlineAt;
  const today = startOfDay(new Date());
  const target = startOfDay(date);

  const diffDays = differenceInCalendarDays(target, today);

  if (diffDays > 0) {
    return `D-${diffDays}`;
  }

  if (diffDays === 0) {
    return 'D-Day';
  }

  return `D+${Math.abs(diffDays)}`;
}

export function formatDate(newDate: Date | string) {
  const date = typeof newDate === 'string' ? new Date(newDate) : newDate;
  return format(date, 'yyyy.MM.dd');
}

/**
 * 게시글 작성으로부터 지난 시간 구하는 함수
 * @param dateString - 현재 날짜
 */
export function getRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: ko,
  });
}
