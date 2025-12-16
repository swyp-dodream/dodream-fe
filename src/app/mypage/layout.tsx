import { redirect } from 'next/navigation';
import { serverApis } from '@/apis/server.api';
import MyPageNavigation from '@/components/layout/header/mypage-navigation';

export default async function MyPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const profileExists = await serverApis.user.getProfileExists();

  if (!profileExists.exists) {
    redirect('/');
    return null;
  }

  return (
    <div className="w-full h-full grid grid-cols-12 gap-7">
      <MyPageNavigation />
      <section className="col-span-8 col-start-4 flex flex-col gap-9">
        {children}
      </section>
    </div>
  );
}
