import Header from '@/components/layout/header/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen gap-12">
      <Header />
      <main className="flex-1 relative pb-15">{children}</main>
    </div>
  );
}
