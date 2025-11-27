import ProfileContent from './_components/profile-content';

export default function CreateProfilePage() {
  return (
    <div className="col-start-2 col-span-10">
      <header className="flex flex-col gap-2 pb-7 mb-9 border-b-1 border-b-border-primary">
        <h2 className="heading-xl">프로필을 입력해 주세요</h2>
        <p className="body-lg-regular text-subtle">
          입력해 주신 정보를 토대로 나에게 맞는 AI 매칭을 도와드려요. 연령대 및
          성별 정보는 프로필에 공개되지 않습니다.
        </p>
      </header>
      <ProfileContent />
    </div>
  );
}
