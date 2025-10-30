import Link from 'next/link';
import Logo from '@/assets/logo/logo.svg';
import Navigation from '@/components/layout/navigation';

export default function Header() {
  return (
    <header className="h-16 sticky top-0 flex items-center shrink-0 bg-surface border-b border-border-primary">
      <div className="content-layout flex justify-between">
        <h1>
          <Link href="/">
            <Logo aria-hidden="true" className="text-brand" />
            <span className="sr-only">두드림</span>
          </Link>
        </h1>
        <Navigation />
      </div>
    </header>
  );
}
