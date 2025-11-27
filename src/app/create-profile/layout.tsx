'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/commons/loading-spinner';
import useGetUser from '@/hooks/auth/use-get-user';
import { useGetProfileExists } from '@/hooks/profile/use-get-profile';
import useToast from '@/hooks/use-toast';

export default function CreateProfilePageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { data: profileExists, isLoading: isProfileLoading } =
    useGetProfileExists();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const toast = useToast();

  // 클라이언트 마운트 확인
  useEffect(() => {
    setMounted(true);
  }, []);

  // 인증 및 프로필 체크
  useEffect(() => {
    if (!mounted || isUserLoading || isProfileLoading) return;

    // 로그인 안 되어 있을 경우
    if (!user) {
      toast({ title: '로그인이 필요합니다.' });
      router.replace('/');
      return;
    }

    // 이미 프로필이 있을 경우
    if (profileExists?.exists) {
      router.replace('/');
      return;
    }
  }, [
    user,
    profileExists,
    isUserLoading,
    isProfileLoading,
    mounted,
    router,
    toast,
  ]);

  // 로딩 중
  if (!mounted || isUserLoading || isProfileLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner variant="lg" />
      </div>
    );
  }

  // 리다이렉트 대기
  if (!user || profileExists?.exists) {
    return null;
  }

  return <div className="grid grid-cols-12 gap-5">{children}</div>;
}
