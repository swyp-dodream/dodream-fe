interface MyPageEmptyStateProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

export default function MyPageEmptyState({
  title,
  description,
}: MyPageEmptyStateProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="body-lg-medium text-primary">{title}</span>
      <span className="body-lg-medium text-subtle">{description}</span>
    </div>
  );
}
