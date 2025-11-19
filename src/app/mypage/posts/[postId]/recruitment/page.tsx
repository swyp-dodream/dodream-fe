import MyPageHeader from '@/components/features/mypage/commons/mypage-header';
import { RecruitmentTabs } from '@/components/features/mypage/my-posts/recruitments/recruitment-tabs';
import ApplicantsTabContent from './_components/applicants-tab-content';

const RECRUITMENT_TABS = [
  // { tabValue: 'offers', label: '제안한 내역', Content: OfferTabContent },
  {
    tabValue: 'applicants',
    label: '지원자 내역',
    Content: ApplicantsTabContent,
  },
  // { tabValue: 'members', label: '멤버 내역', Content: MembersTabContent },
];

interface PostRecruitmentPageProps {
  params: Promise<{ postId: string }>;
}

export default async function PostRecruitmentPage({
  params,
}: PostRecruitmentPageProps) {
  const { postId } = await params;

  return (
    <>
      <MyPageHeader title="모집 내역" isRecruitmentPage />

      <RecruitmentTabs defaultValue={RECRUITMENT_TABS[0].tabValue}>
        <RecruitmentTabs.List>
          {RECRUITMENT_TABS.map(({ tabValue, label }) => (
            <RecruitmentTabs.Trigger key={tabValue} value={tabValue}>
              {label}
            </RecruitmentTabs.Trigger>
          ))}
        </RecruitmentTabs.List>

        {RECRUITMENT_TABS.map(({ tabValue, Content }) => (
          <RecruitmentTabs.Content key={tabValue} value={tabValue} columns={8}>
            <Content postId={BigInt(postId)} />
          </RecruitmentTabs.Content>
        ))}
      </RecruitmentTabs>
    </>
  );
}
