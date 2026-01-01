export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 gap-x-7">
      <div className="col-span-8 col-start-3 pt-15 pb-16">{children}</div>
    </div>
  );
}
