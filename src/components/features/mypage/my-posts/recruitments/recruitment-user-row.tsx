import Link from 'next/link';
import type { Role } from '@/mocks/posts';

const ROLE_LABEL_MAP: Record<Role, string> = {
  FE: '프론트엔드',
  BE: '백엔드',
  iOS: 'iOS',
  AOS: '안드로이드',
  Designer: '디자이너',
  PM: 'PM',
  Planner: '기획자',
  Marketer: '마케터',
};

interface RecruitmentUserRowProps {
  suggestionId: number;
  applicationId: number;
  userId: number;
  nickname: string;
  profileImage: string;
  createdAt: Date;
  roleName: string;
  tags: string[];
  experience: 'new' | '1to3' | '3to5' | '5plus';
  actions?: React.ReactNode;
}

export default function RecruitmentUserRow({
  suggestionId,
  applicationId,
  userId,
  nickname,
  profileImage,
  createdAt,
  roleName,
  tags,
  experience,
  actions,
}: RecruitmentUserRowProps) {
  const EXPERIENCE_LABEL_MAP: Record<
    'new' | '1to3' | '3to5' | '5plus',
    string
  > = {
    new: '경력 없음',
    '1to3': '경력 1~3년',
    '3to5': '경력 3~5년',
    '5plus': '경력 5년 이상',
  };

  return (
    <div className="grid grid-cols-subgrid col-span-full pb-6">
      <Link
        href={`/profile/${userId}`}
        className="grid grid-cols-subgrid col-span-6"
      >
        <div className="col-span-2 flex items-center gap-3 overflow-x-hidden">
          <div className="size-9 rounded-full bg-primary shrink-0" />
          <div className="flex flex-col">
            <span className="body-lg-medium truncate">{nickname}</span>
            <div className="body-sm-regular text-secondary flex items-center gap-1">
              <span>{ROLE_LABEL_MAP[roleName as Role]}</span>
              <span>·</span>
              <span>{EXPERIENCE_LABEL_MAP[experience]}</span>
            </div>
          </div>
        </div>

        <div className="col-span-4 flex items-center gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="bg-button-ai py-1 px-3 rounded-md body-md-medium text-brand"
            >
              {tag}
            </div>
          ))}
        </div>
      </Link>

      <div className="col-span-2 flex gap-4 justify-end">{actions}</div>
    </div>
  );
}
