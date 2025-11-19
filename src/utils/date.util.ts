import {
  addDays,
  differenceInCalendarDays,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  isYesterday,
  startOfDay,
} from 'date-fns';

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
  const date = new Date(dateString);
  const now = new Date();

  const minutes = differenceInMinutes(now, date);
  const hours = differenceInHours(now, date);
  const days = differenceInDays(now, date);

  if (minutes < 1) {
    return '1분';
  } else if (minutes < 60) {
    return `${minutes}분`;
  } else if (hours < 24) {
    return `${hours}시간`;
  } else if (isYesterday(date)) {
    return '어제';
  } else if (days <= 7) {
    return `${days}일`;
  } else {
    return format(date, 'yyyy.MM.dd');
  }
}

/**
 * 매칭된 날짜를 인자로 받아, 패널티 없이 취소할 수 있는 날짜를 구하는 함수
 *
 * @param matchedAt - 매칭된 날짜
 * @returns 패널티 없이 취소할 수 있는 날짜
 */
export function getNoPaneltyDate(matchedAt: Date): string {
  const noPaneltyDate = addDays(matchedAt, 1);

  return format(noPaneltyDate, 'yyyy년 MM월 d일 HH:mm');
}
