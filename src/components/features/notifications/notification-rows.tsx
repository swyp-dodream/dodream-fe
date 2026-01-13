'use client';

import { useRouter } from 'next/navigation';
import ProfileImage from '@/components/commons/profile-image';
import { NOTIFICATION_ICON } from '@/constants/notification.constant';
import useGetMyNotifications from '@/hooks/notification/use-get-my-notifications';
import useReadNotifications from '@/hooks/notification/use-read-notification';
import type { NotificationResponseType } from '@/types/notification.type';
import { getDateCategory, getRelativeTime } from '@/utils/date.util';

/**
 * 알림 행 전체 컴포넌트
 */
export default function NotificationRows() {
  const { data: notifications = [] } = useGetMyNotifications();

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
  const router = useRouter();
  const { mutate: readNotification } = useReadNotifications();
  const NotificationIcon = NOTIFICATION_ICON[notification.type];

  const handleClickNotification = () => {
    readNotification(BigInt(notification.id));

    if (
      notification.type === 'PROPOSAL_SENT' ||
      notification.type === 'BOOKMARK_DEADLINE'
    ) {
      router.push(`/post/${BigInt(notification.targetPostId)}`);
    } else if (notification.type === 'PROPOSAL_APPLIED') {
      router.push(
        `/mypage/posts/${BigInt(notification.targetPostId)}/recruitment`,
      );
    } else if (notification.type === 'APPLICATION_ACCEPTED') {
      router.push('/mypage/participations');
    } else if (notification.type === 'REVIEW_ACTIVATED') {
      // TODO - 후기 작성 활성화 -> 매칭 내역 후기 남기기 모달 띄우기
    } else if (notification.type === 'FEEDBACK_WRITTEN') {
      // TODO - 후기 등록 -> 매칭 내역 후기 확인 모달 띄우기
    }
  };

  return (
    <article>
      <button
        type="button"
        className="flex w-full gap-4 py-4 hover:bg-container-secondary-hover"
        aria-label={`${notification.read ? '' : '읽지 않음 - '}${notification.message} - ${getRelativeTime(notification.updatedAt)}`}
        aria-describedby={`notification-time-${notification.id}`}
        onClick={handleClickNotification}
      >
        <div className="relative">
          <ProfileImage src={null} size={44} />
          <div className="absolute bg-surface w-7 h-7 rounded-full top-6 left-6 flex items-center justify-center">
            <NotificationIcon className="text-icon-dark" aria-hidden="true" />
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full justify-between">
            <p
              className={`body-sm-medium text-start ${notification.read && 'text-subtle'}`}
            >
              {notification.message}
            </p>
            {!notification.read && (
              <span
                className="w-1.75 h-1.75 bg-brand rounded-full shrink-0 mt-2"
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
