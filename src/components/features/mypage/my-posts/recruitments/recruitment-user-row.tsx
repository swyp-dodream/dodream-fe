import Link from 'next/link';

interface RecruitmentUserRowProps {
  suggestionId: bigint;
  applicationId: bigint;
  userId: bigint;
  nickname: string;
  profileImage: string;
  status: string;
  createdAt: string;
  experience: string;
  jobGroups: string[];
  tags?: string[];
  actions?: React.ReactNode;
}

export default function RecruitmentUserRow({
  suggestionId,
  applicationId,
  userId,
  nickname,
  profileImage,
  status,
  createdAt,
  experience,
  jobGroups,
  tags,
  actions,
}: RecruitmentUserRowProps) {
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
              <span>{jobGroups[0]}</span>
              <span>·</span>
              <span>{experience}</span>
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
