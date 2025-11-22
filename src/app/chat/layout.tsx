export default function ChatPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-full grid grid-cols-12 gap-7">{children}</div>
  );
}
