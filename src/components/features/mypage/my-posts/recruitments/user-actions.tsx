interface UserActionsProps {
  children: React.ReactNode;
}

export default function UserActions({ children }: UserActionsProps) {
  return <div className="flex gap-4 justify-end">{children}</div>;
}
