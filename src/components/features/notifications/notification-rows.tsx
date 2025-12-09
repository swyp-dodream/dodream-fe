import ProfileImage from '@/components/commons/profile-image';
import { NOTIFICATION_ICON } from '@/constants/notification.constant';
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
          <h3
            id={`notification-${date}`}
            className="body-sm-medium text-subtle"
          >
            {date}
          </h3>
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
  const NotificationIcon = NOTIFICATION_ICON[notification.type];

  return (
    <article>
      <button
        type="button"
        className="flex w-full gap-4 py-4 hover:bg-container-secondary-hover"
        aria-label={`${notification.read ? '' : '읽지 않음 - '}${notification.message} - ${getRelativeTime(notification.updatedAt)}`}
        aria-describedby={`notification-time-${notification.id}`}
      >
        <div className="relative">
          <ProfileImage src={null} size={44} />
          <div className="absolute bg-surface w-7 h-7 rounded-full top-6 left-6 flex items-center justify-center">
            <NotificationIcon className="text-icon-dark" aria-hidden="true" />
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <p
              className={`body-sm-medium ${notification.read && 'text-subtle'}`}
            >
              {notification.message}
            </p>
            {!notification.read && (
              <span
                className="w-[7px] h-[7px] bg-brand rounded-full"
                aria-hidden="true"
              />
            )}
          </div>
          <time
            id={`notification-time-${notification.id}`}
            className="flex body-sm-regular text-subtle"
            dateTime={notification.updatedAt}
          >
            {getRelativeTime(notification.updatedAt)}
          </time>
        </div>
      </button>
    </article>
  );
}
