import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthCallBackClient from './_components/auth-callback-client';

interface AuthCallBackPageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function AuthCallBackPage({
  searchParams,
}: AuthCallBackPageProps) {
  const params = await searchParams;
  const { userId, email, name } = params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!userId || !email || !name || !accessToken) {
    redirect('/');
  }

  // 리다이렉트 경로
  const redirectCookie = cookieStore.get('OAUTH2_FRONTEND_URL');
  const redirectPath = redirectCookie?.value || null;

  return (
    <div className="w-full h-full">
      <AuthCallBackClient redirectPath={redirectPath} />
    </div>
  );
}
