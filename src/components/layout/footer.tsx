import Link from 'next/link';
import Logo from '@/assets/logo/logo.svg';

export default function Footer() {
  return (
    <footer className="bg-primary">
      <div className="content-layout py-9 flex flex-col justify-between gap-6">
        <Logo className="text-bg-button" aria-label="두드림 로고" />
        <div className="flex justify-between">
          <nav aria-label="약관 및 정책">
            <ul className="flex gap-10 text-body-md">
              <li>
                <Link href="/legal/terms">이용약관</Link>
              </li>
              <li>
                <Link href="/legal/privacy" rel="nofollow">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </nav>
          <small className="text-body-md text-secondary">
            Copyright © 2025 두드림. All rights reserved
          </small>
        </div>
      </div>
    </footer>
  );
}
