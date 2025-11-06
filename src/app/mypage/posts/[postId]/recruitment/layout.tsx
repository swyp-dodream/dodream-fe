export default function RecruitmentPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="col-span-8 col-start-4 flex flex-col gap-7">
      {children}
    </section>
  );
}
