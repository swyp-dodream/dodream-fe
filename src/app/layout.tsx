import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import './globals.css';
import { Providers } from './providers';

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
        <Providers>
          <div className="flex flex-col h-full gap-12">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
