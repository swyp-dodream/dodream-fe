import type { ReactNode } from 'react';
import { LegalArticle } from '@/app/legal/_components/legal-article';
import { LegalOrderedList } from '@/app/legal/_components/legal-ordered-list';

const LEGAL_ARTICLES: { title: string; content: ReactNode }[] = [
  {
    title: '1. 개인정보의 처리 목적',
    content: (
      <>
        <p>
          ‘두드림’ 서비스(이하 ‘회사’)는 이용자의 개인정보를 다음의 목적을 위해
          처리합니다:
        </p>
        <LegalOrderedList>
          <li>
            <span className="body-lg-medium">① 회원 가입 및 관리:</span> 서비스
            이용 의사 확인, 회원제 서비스 제공에 따른 본인 식별/인증, 회원 자격
            유지/관리, 서비스 부정 이용 방지, 각종 고지 및 통지, 회원 탈퇴 의사
            확인
          </li>
          <li>
            <span className="body-lg-medium">② 서비스 제공 및 기능 구현:</span>
            <LegalOrderedList>
              <li className="pt-3">
                <span className="body-lg-medium">1. AI 맞춤 추천: </span>
                이용자의 프로필 데이터를 기반으로 적합한 모집글 및 회원을 AI로
                추천합니다.
                <ul className="list-disc pl-7 pt-3 flex flex-col gap-3">
                  <li>회원에게 맞춤 모집글 추천</li>
                  <li>모집글에 적합한 회원의 프로필 추천</li>
                  <li>
                    모집글에 지원한 회원 중 모집글 멤버로 적합한 회원 AI 추천
                  </li>
                </ul>
              </li>
              <li>
                <span className="body-lg-medium">2. 모집글: </span>회원이
                모집글을 작성하고 게시하며, 모든 회원은 이를 탐색하고 지원할 수
                있는 기능
              </li>
              <li>
                <span className="body-lg-medium">3. 프로필: </span>개인화된
                서비스 경험을 제공하며, 멤버 후기 등 신뢰 기반 정보를 포함하여
                회원 간 판단 지표로 활용
              </li>
              <li>
                <span className="body-lg-medium">4. 채팅: </span>모집글을 작성한
                회원과 지원을 희망하는 회원 간 1:1로 소통할 수 있는 실시간
                커뮤니케이션 채널
              </li>
              <li>
                <span className="body-lg-medium">
                  5. 지원 및 지원 관리 기능:{' '}
                </span>
                모집글에 참여 의사를 전달하고 지원 상태를 관리
              </li>
            </LegalOrderedList>
          </li>
        </LegalOrderedList>
      </>
    ),
  },
  {
    title: '2. 수집하는 개인정보 항목',
    content: (
      <>
        <p>
          당사는 회원 가입, 서비스 이용, 기능 구현 등을 위해 아래와 같은
          개인정보를 수집하고 있습니다.
        </p>
        <ul className="list-disc pl-7">
          <li>
            <span className="body-lg-medium">회원 정보: </span>이름, 이메일,
            성별, 연령대
          </li>
        </ul>
      </>
    ),
  },
  {
    title: '3. 개인정보의 보유 및 이용기간',
    content: (
      <>
        <p>
          당사는 이용자가 회원에서 탈퇴하거나 개인정보의 수집 및 이용목적이
          달성되었을 때 지체없이 파기합니다.
        </p>
        <p>
          단, 관련 법령의 규정에 의하여 보존할 필요가 있는 경우에는 일정기간
          동안 회원정보를 안전하게 보관합니다.
        </p>
      </>
    ),
  },
  {
    title: '4. 개인정보의 파기절차 및 방법',
    content: (
      <>
        <p>
          이용자의 개인정보는 원칙적으로 수집 및 이용목적이 달성되면 지체없이
          파기됩니다.
        </p>
        <LegalOrderedList>
          <li>
            <span className="body-lg-medium">① 파기 절차: </span>이용자가
            회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의
            데이터베이스(DB)에 옮겨져 내부 방침 및 기타 관련 법령에 의한
            정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다. 별도 DB로
            옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되는 목적 이외의
            다른 목적으로 이용되지 않습니다
          </li>
          <li>
            <span className="body-lg-medium">② 파기 방법: </span>전자적 파일
            형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여
            삭제합니다.
          </li>
        </LegalOrderedList>
      </>
    ),
  },
  {
    title: '5. 개인정보 제공',
    content: (
      <>
        <p>
          당사는 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 아래의
          경우에는 예외로 합니다:
        </p>
        <LegalOrderedList>
          <li>① 이용자들이 사전에 동의한 경우.</li>
          <li>
            ② 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
            방법에 따라 수사기관의 요구가 있는 경우.
          </li>
        </LegalOrderedList>
      </>
    ),
  },
  {
    title: '6. 개인정보 처리 위탁',
    content: (
      <p>
        당사는 서비스 이행을 위하여 필요한 경우 이용자의 개인정보 처리를 위탁할
        수 있으며, 이 경우 위탁받는 자와 위탁업무 내용 등을 미리 이용자에게
        고지합니다.
      </p>
    ),
  },
  {
    title: '7. 이용자의 권리와 그 행사 방법',
    content: (
      <>
        <p>
          이용자는 개인정보에 대해 언제든지 열람, 정정, 삭제를 요청할 수 있으며
          당사는 이에 대해 지체없이 조치합니다.
        </p>
        <p>
          이용자가 개인정보의 삭제를 요청하는 경우, 회원 탈퇴 절차를 통해 모든
          개인정보를 파기합니다.
        </p>
      </>
    ),
  },
  {
    title: '8. 개인정보의 안전성 확보 조치',
    content: (
      <>
        <p>
          당사는 개인정보보호법 등 관련 법령에서 요구하는 수준 이상의 안전성
          확보를 위해 다음과 같은 조치를 취하고 있습니다:
        </p>
        <LegalOrderedList>
          <li>① 개인정보처리시스템 접근 제한</li>
          <li>② 개인정보 처리 직원의 교육 및 감시</li>
          <li>③ 개인정보의 암호화</li>
        </LegalOrderedList>
      </>
    ),
  },
  {
    title: '9. 개인정보 관리책임자 및 담당자',
    content: (
      <>
        <p>‘두드림’ 서비스의 개인정보 관리책임자와 담당자는 다음과 같습니다</p>
        <ul className="list-disc pl-7">
          <li>
            개인정보 관리책임자: 구자빈, jabinngoo@gmail.com, 010-4620-1941
          </li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <section className="flex flex-col gap-12 body-lg-regular">
      <section className="flex flex-col gap-10">
        <header className="pb-7 border-b-1 border-border-primary">
          <h1 className="heading-xl">'두드림' 서비스 개인정보 처리방침</h1>
        </header>

        <p>
          ‘두드림’ 서비스는 스터디 및 프로젝트 멤버 모집을 위한 AI 기반 맞춤
          추천 플랫폼으로, 이용자의 개인정보를 소중하게 생각하고 개인정보보호법
          등 관련 법령상의 개인정보 보호 규정을 준수합니다. 이에 개인정보
          처리방침을 다음과 같이 공지합니다.
        </p>

        {LEGAL_ARTICLES.map(({ title, content }) => (
          <LegalArticle key={title} title={title}>
            {content}
          </LegalArticle>
        ))}
      </section>
    </section>
  );
}
