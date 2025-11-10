import MyPageEmptyState from '@/components/features/mypage/commons/mypage-empty-state';

export default function MyPostsEmptyState() {
  const title = '작성한 글이 없습니다';
  const description = '새 글을 작성하여 팀원을 모집해 보세요';

  return <MyPageEmptyState title={title} description={description} />;
}
