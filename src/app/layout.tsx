import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { OverlayProvider } from 'overlay-kit';
import './globals.css';
import Header from '@/components/features/layout/header';

const pretendard = localFont({
  src: './fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

// TODO: 메타데이터 수정
export const metadata: Metadata = {
  title: '두드림',
  description: '두드림',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR" className={pretendard.variable}>
      <body>
        <OverlayProvider>
          <Header />
          <main>{children}</main>
        </OverlayProvider>
      </body>
    </html>
  );
}
