import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { OverlayProvider } from 'overlay-kit';
import './globals.css';

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
        <Theme className={pretendard.className} radius="full">
          <OverlayProvider>{children}</OverlayProvider>
        </Theme>
      </body>
    </html>
  );
}
