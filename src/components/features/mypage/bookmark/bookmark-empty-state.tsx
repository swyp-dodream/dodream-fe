import type { ProjectType } from '@/mocks/posts';

interface BookmarkEmptyStateProps {
  tabValue: ProjectType;
}

export default function BookmarkEmptyState({
  tabValue,
}: BookmarkEmptyStateProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="body-lg-medium text-primary">
        북마크한 글이 없습니다
      </span>
      <span className="body-lg-medium text-subtle">
        관심 있는 {tabValue === 'project' ? '프로젝트' : '스터디'}를 북마크해
        보세요.
      </span>
    </div>
  );
}
