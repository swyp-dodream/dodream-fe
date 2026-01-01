import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen gap-12">
      <Header />
      <main className="flex-1 relative">{children}</main>
      <Footer />
    </div>
  );
}
