import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center max-h-[442px]">
      <h2 className="heading-md">404</h2>
      <p className="heading-md mt-2">페이지를 찾을 수 없습니다</p>
      <Link
        href="/"
        className="mt-12 bg-surface border border-border-primary py-3 rounded-md w-[138px] body-lg-medium text-center"
      >
        홈으로
      </Link>
      <div className="w-full fixed bottom-0 bg-surface flex items-center justify-center">
        <Image src="/404.svg" alt="404" width={800} height={233} />
      </div>
    </div>
  );
}
