import AuthCallBackClient from './_components/auth-callback-client';

interface AuthCallBackPageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function AuthCallBackPage({
  searchParams,
}: AuthCallBackPageProps) {
  const params = await searchParams;

  return (
    <div>
      <AuthCallBackClient searchParams={params} />
    </div>
  );
}
