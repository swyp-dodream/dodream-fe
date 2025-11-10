import MyPageEmptyState from '@/components/features/mypage/commons/mypage-empty-state';
import type { ProjectType } from '@/mocks/posts';

interface BookmarkEmptyStateProps {
  tabValue: ProjectType;
}

export default function BookmarkEmptyState({
  tabValue,
}: BookmarkEmptyStateProps) {
  const title = '북마크한 글이 없습니다';
  const description =
    tabValue === 'project'
      ? '관심 있는 프로젝트를 북마크해 보세요'
      : '관심 있는 스터디를 북마크해 보세요';

  return <MyPageEmptyState title={title} description={description} />;
}
