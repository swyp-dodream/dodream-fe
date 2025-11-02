import { differenceInCalendarDays, startOfDay } from 'date-fns';

export function formatDeadlineAt(deadlineAt: Date) {
  const today = startOfDay(new Date());
  const target = startOfDay(deadlineAt);

  const diffDays = differenceInCalendarDays(target, today);

  if (diffDays > 0) {
    return `D-${diffDays}`;
  }

  if (diffDays === 0) {
    return 'D-Day';
  }

  return `D+${Math.abs(diffDays)}`;
}
