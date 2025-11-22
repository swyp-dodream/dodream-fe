import Link from 'next/link';
import { EXPERIENCE } from '@/constants/profile.constant';
import { parseExperienceValue } from '@/utils/profile.util';

interface RecruitmentUserRowProps {
  postId: bigint;
  userId: bigint;
  nickname: string;
  profileImageCode: number;
  experience: string;
  jobGroups: string[];
  tags?: string[];
  actions?: React.ReactNode;
}

export default function RecruitmentUserRow({
  postId,
  userId,
  nickname,
  profileImageCode,
  experience,
  jobGroups,
  tags,
  actions,
}: RecruitmentUserRowProps) {
  return (
    <div className="grid grid-cols-subgrid col-span-full pb-6">
      <Link
        href={`/profile/${BigInt(postId)}/${BigInt(userId)}`}
        className="grid grid-cols-subgrid col-span-6"
      >
        <div className="col-span-2 flex items-center gap-3 overflow-x-hidden">
          <div className="size-9 rounded-full bg-primary shrink-0" />
          <div className="flex flex-col">
            <span className="body-lg-medium truncate">{nickname}</span>
            <div className="body-sm-regular text-secondary flex items-center gap-1">
              <span>{jobGroups[0]}</span>
              <span>·</span>
              <span>
                경력 {EXPERIENCE[parseExperienceValue(experience) ?? 'new']}
              </span>
            </div>
          </div>
        </div>

        {tags && (
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
        )}
      </Link>

      <div className="col-span-2 flex gap-4 justify-end">{actions}</div>
    </div>
  );
}
