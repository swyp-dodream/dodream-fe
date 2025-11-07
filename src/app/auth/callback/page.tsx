import AuthCallBackClient from './_components/auth-callback-client';

interface AuthCallBackPageProps {
  searchParams: Record<string, string>;
}

export default function AuthCallBackPage({
  searchParams,
}: AuthCallBackPageProps) {
  return (
    <div>
      <AuthCallBackClient searchParams={searchParams} />
    </div>
  );
}
