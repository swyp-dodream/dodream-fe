import AuthCallBackClient from './_components/auth-callback-client';

interface AuthCallBackPageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function AuthCallBackPage({
  searchParams,
}: AuthCallBackPageProps) {
  const params = await searchParams;

  return (
    <div className="w-full h-full">
      <AuthCallBackClient searchParams={params} />
    </div>
  );
}
