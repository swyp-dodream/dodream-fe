import Image from 'next/image';
import { DURATION_LABELS, PROJECT_MAP } from '@/constants/post.constant';
import { ACTIVITY_MODE } from '@/constants/profile.constant';
import type { DurationType, ProjectType } from '@/types/post.type';
import type { ActivityModeType } from '@/types/profile.type';
import { formatDate } from '@/utils/date.util';

interface RecruitInfoProps {
  projectType: ProjectType;
  deadlineDate: string;
  activityMode: ActivityModeType;
  interestKeywords: string[];
  duration: DurationType;
  techStacks: string[];
}

/**
 * 모집 요약 컴포넌트
 * @param projectType - 모집 유형 (예: 프로젝트, 스터디)
 * @param deadlineDate - 모집 마감일
 * @param activityMode - 활동 방식
 * @param interestKeywords - 관심 분야 목록
 * @param duration - 활동 기간 (예: 1개월, 3개월)
 * @param techStacks - 사용 기술 스택 목록
 */
export default function RecruitInfo({
  projectType,
  deadlineDate,
  activityMode,
  interestKeywords,
  duration,
  techStacks,
}: RecruitInfoProps) {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="heading-lg">모집 요약</h3>
      <dl className="flex flex-col gap-4 body-lg-medium">
        <div className="flex">
          <div className="flex flex-col gap-4 w-[282px]">
            <RecruitInfoItem label="모집 유형">
              {PROJECT_MAP[projectType]}
            </RecruitInfoItem>
            <RecruitInfoItem label="모집 마감">
              <time>{formatDate(deadlineDate)}</time>
            </RecruitInfoItem>
            <RecruitInfoItem label="활동 방식">
              {ACTIVITY_MODE[activityMode]}
            </RecruitInfoItem>
          </div>
          <div className="flex flex-col gap-4 w-[282px]">
            <RecruitInfoItem label="관심 분야">
              <ul className="flex gap-4">
                {interestKeywords.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </RecruitInfoItem>
            <RecruitInfoItem label="활동 기간">
              {DURATION_LABELS[duration]}
            </RecruitInfoItem>
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
