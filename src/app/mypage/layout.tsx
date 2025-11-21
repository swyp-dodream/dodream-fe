'use client';

import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import LoadingSpinner from '@/components/commons/loading-spinner';
import MyPageNavigation from '@/components/layout/mypage-navigation';
import { useGetProfileExists } from '@/hooks/profile/use-get-profile';
import useToast from '@/hooks/use-toast';

export default function MyPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: profileExists, isLoading } = useGetProfileExists();
  const [mounted, setMounted] = useState(false);
  const toast = useToast();
  const router = useRouter();

  // 마운트 확인
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !profileExists?.exists) {
      toast({ title: '로그인이 필요합니다.' });
      router.replace('/');
    }
  }, [profileExists, isLoading, mounted, router, toast]);

  if (!mounted || isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner variant="lg" />
      </div>
    );
  }

  if (!profileExists) {
    return null;
  }

  return (
    <div className="w-full h-full grid grid-cols-12 gap-7">
      <MyPageNavigation />
      <section className="col-span-8 col-start-4 flex flex-col gap-9">
        <Suspense>{children}</Suspense>
      </section>
    </div>
  );
}
