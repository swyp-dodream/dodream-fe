import clsx from 'clsx';
import type { ProjectType } from '@/types/post.type';

const PROJECT_TYPE_CONFIG = {
  PROJECT: { text: '프로젝트', color: 'bg-project' },
  STUDY: { text: '스터디', color: 'bg-study' },
} as const;

interface PostCardProjectTypeProps {
  projectType: ProjectType;
}

export default function PostCardProjectType({
  projectType,
}: PostCardProjectTypeProps) {
  const projectTypeKey =
    projectType.toUpperCase() as keyof typeof PROJECT_TYPE_CONFIG;
  const { text, color } =
    PROJECT_TYPE_CONFIG[projectTypeKey] ?? PROJECT_TYPE_CONFIG.PROJECT;

  return (
    <div
      className={clsx(color, 'text-secondary px-3 rounded-md body-md-medium')}
    >
      {text}
    </div>
  );
}
