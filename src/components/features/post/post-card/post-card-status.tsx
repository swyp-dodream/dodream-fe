import clsx from 'clsx';
import UserSearchIcon from '@/assets/icons/user-search/14.svg';

interface PostCardStatusProps {
  status: 'recruiting' | 'completed';
}

export default function PostCardStatus({ status }: PostCardStatusProps) {
  const isRecruiting = status === 'recruiting';

  return (
    <div className="flex gap-2 items-center">
      <UserSearchIcon
        className={isRecruiting ? undefined : 'text-icon-light'}
      />
      <span
        className={clsx(['body-md-medium', !isRecruiting && 'text-subtle'])}
      >
        {isRecruiting ? '모집 중' : '모집 마감'}
      </span>
    </div>
  );
}
