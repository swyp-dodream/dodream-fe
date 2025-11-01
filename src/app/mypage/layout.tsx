import MyPageNavigation from '@/components/layout/mypage-navigation';

export default function MyPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-full content-layout grid grid-cols-12 gap-7">
      <MyPageNavigation />
      <section className="col-span-8 col-start-4 flex flex-col gap-7">
        {children}
      </section>
    </div>
  );
}
