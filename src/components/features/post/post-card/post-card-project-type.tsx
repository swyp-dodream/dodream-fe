import clsx from 'clsx';

const PROJECT_TYPE_CONFIG = {
  project: { text: '프로젝트', color: 'bg-project' },
  study: { text: '스터디', color: 'bg-study' },
} as const;

type PostCardProjectTypeValue = keyof typeof PROJECT_TYPE_CONFIG;

interface PostCardProjectTypeProps {
  projectType: PostCardProjectTypeValue;
}

export default function PostCardProjectType({
  projectType,
}: PostCardProjectTypeProps) {
  const { text, color } = PROJECT_TYPE_CONFIG[projectType];

  return (
    <div
      className={clsx(color, 'text-secondary px-3 rounded-md body-md-medium')}
    >
      {text}
    </div>
  );
}
