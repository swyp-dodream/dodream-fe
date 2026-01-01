import ProfileEditContent from '@/components/features/profile/profile-edit-content';

export default function ProfileEditPage() {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-start-2 col-span-10">
        <header className="flex flex-col gap-2 pb-7 mb-9 border-b-1 border-b-border-primary">
          <h2 className="heading-xl">프로필</h2>
        </header>
        <ProfileEditContent />
      </div>
    </div>
  );
}
