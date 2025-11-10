import MyPageEmptyState from '@/components/features/mypage/commons/mypage-empty-state';

const TAB = {
  offers: {
    title: '제안한 내역이 없습니다',
    description: '모집 글에서 제공하는 AI 추천 멤버에게 합류 제안을 보내보세요',
  },
  members: {
    title: '매칭된 멤버가 없습니다',
    description: '지원을 수락하여 팀원 모집을 완료해 보세요',
  },
};

interface RecruitmentEmptyStateProps {
  tab: 'offers' | 'members';
}

export default function RecruitmentEmptyState({
  tab,
}: RecruitmentEmptyStateProps) {
  return (
    <div className="col-span-full">
      <MyPageEmptyState
        title={TAB[tab].title}
        description={TAB[tab].description}
      />
    </div>
  );
}
