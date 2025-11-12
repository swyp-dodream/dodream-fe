import Image from 'next/image';
import { formatDate } from '@/utils/date.util';

interface RecruitInfoProps {
  summary: {
    type: string;
    deadline: string;
    activityMethod: string;
    interests: string[];
    duration: string;
    techStacks: string[];
  };
}

/**
 * 모집 요약 컴포넌트
 * @param summary - 모집 요약 정보
 * @param summary.type - 모집 유형 (예: 프로젝트, 스터디)
 * @param summary.deadline - 모집 마감일
 * @param summary.activityMethod - 활동 방식
 * @param summary.interests - 관심 분야 목록
 * @param summary.duration - 활동 기간 (예: 1개월, 3개월)
 * @param summary.techStacks - 사용 기술 스택 목록
 */
export default function RecruitInfo({
  summary: { type, deadline, activityMethod, interests, duration, techStacks },
}: RecruitInfoProps) {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="heading-lg">모집 요약</h3>
      <dl className="flex flex-col gap-4 body-lg-medium">
        <div className="flex">
          <div className="flex flex-col gap-4 w-[282px]">
            <RecruitInfoItem label="모집 유형">{type}</RecruitInfoItem>
            <RecruitInfoItem label="모집 마감">
              <time>{formatDate(new Date(deadline))}</time>
            </RecruitInfoItem>
            <RecruitInfoItem label="활동 방식">
              {activityMethod}
            </RecruitInfoItem>
          </div>
          <div className="flex flex-col gap-4 w-[282px]">
            <RecruitInfoItem label="관심 분야">
              <ul className="flex gap-4">
                {interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </RecruitInfoItem>
            <RecruitInfoItem label="활동 기간">{duration}</RecruitInfoItem>
          </div>
        </div>
        <RecruitInfoItem label="기술 스택">
          <ul className="flex gap-3">
            {techStacks.map((stack) => (
              <Image
                key={stack}
                src={`/logo/stacks/${stack}/24.svg`}
                alt={`${stack}`}
                width={24}
                height={24}
              />
            ))}
          </ul>
        </RecruitInfoItem>
      </dl>
    </div>
  );
}

interface RecruitInfoItemProps {
  label: string;
  children: React.ReactNode;
}

/**
 * 모집 요약 요소
 * @param label - 모집 요약 종류 (모집 유형, 모집 마감 등)
 */
function RecruitInfoItem({ label, children }: RecruitInfoItemProps) {
  return (
    <div className="flex gap-7">
      <dt className="text-subtle">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
