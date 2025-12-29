export default function ChatPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-full grid grid-cols-12 gap-7 absolute inset-0 grid-rows-1">
      {children}
    </div>
  );
}
