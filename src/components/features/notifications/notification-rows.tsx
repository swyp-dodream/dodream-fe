import ProfileImage from '@/components/commons/profile-image';
import { mockNotifications } from '@/mocks/notification.mock';
import type { NotificationResponseType } from '@/types/notification.type';
import { getDateCategory, getRelativeTime } from '@/utils/date.util';

/**
 * 알림 행 전체 컴포넌트
 */
export default function NotificationRows() {
  const notifications = mockNotifications;

  // 날짜별로 그룹화
  const groupedByDate = notifications.reduce(
    (acc, notification) => {
      const date = getDateCategory(notification.createdAt);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notification);
      return acc;
    },
    {} as Record<string, typeof notifications>,
  );

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(groupedByDate).map(([date, items]) => (
        <section key={date}>
          <span className="body-sm-medium text-subtle">{date}</span>
          <ul>
            {items.map((notification) => (
              <li key={notification.id}>
                <NotificationRow notification={notification} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

interface NotificationRowProps {
  notification: NotificationResponseType;
}

/**
 * 알림 행 개별 요소 컴포넌트
 * @param notification - 알림 데이터 1개
 */
function NotificationRow({ notification }: NotificationRowProps) {
  return (
    <button
      type="button"
      className="flex w-full gap-3 py-4 hover:bg-container-secondary-hover"
    >
      <ProfileImage src={null} size={44} />
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <p className={`body-sm-medium ${notification.read && 'text-subtle'}`}>
            {notification.message}
          </p>
          {!notification.read && (
            <div className="w-[7px] h-[7px] bg-brand rounded-full" />
          )}
        </div>
        <time className="flex body-sm-regular text-subtle">
          {getRelativeTime(notification.updatedAt)}
        </time>
      </div>
    </button>
  );
}
