import Link from 'next/link';
import LinkIcon from '@/assets/icons/link/14.svg';

interface ProfileLinksProps {
  profileUrls: {
    id: bigint;
    url: string;
  }[];
}

/**
 * 프로필 페이지의 관련 링크 리스트
 */
export default function ProfileLinks({ profileUrls }: ProfileLinksProps) {
  return (
    <ul className="flex flex-col gap-3 body-md-medium">
      {profileUrls.map((url) => (
        <ProfileLink url={url.url} key={url.id} />
      ))}
    </ul>
  );
}

interface ProfileLinkProps {
  url: string;
}

function ProfileLink({ url }: ProfileLinkProps) {
  return (
    <li className="flex gap-3 items-center body-md-medium hover:bg-container-primary-hover w-fit">
      <LinkIcon aria-hidden="true" />
      <Link href={url}>{url}</Link>
    </li>
  );
}
