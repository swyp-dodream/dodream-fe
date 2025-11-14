const MAX_POSITIONS = 3;

interface PostCardRolesProps {
  roles: {
    role: string;
  }[];
}

export default function PostCardRoles({ roles }: PostCardRolesProps) {
  const renderingRoles = roles.slice(0, MAX_POSITIONS);
  const restCount = roles.length - MAX_POSITIONS;

  return (
    <div className="flex gap-2">
      {renderingRoles.map((role) => (
        <PostCardRole key={role.role} role={role.role} />
      ))}
      {restCount > 0 && <PostCardRole role={`+${restCount}`} />}
    </div>
  );
}

interface PostCardRoleProps {
  role: string;
}

function PostCardRole({ role }: PostCardRoleProps) {
  return (
    <div className="flex justify-center items-center px-3 py-1 bg-gray-100 rounded-md text-secondary">
      {role}
    </div>
  );
}
