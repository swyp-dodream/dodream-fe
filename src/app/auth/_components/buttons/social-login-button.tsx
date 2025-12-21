import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BASE_URL, PROVIDER_CONFIG } from '@/constants/auth.constant';
import type { ProviderType } from '@/types/auth.type';

interface SocialLoginButtonProps {
  provider: ProviderType;
  onModalClose: () => void;
}

export default function SocialLoginButton({
  provider,
  onModalClose,
}: SocialLoginButtonProps) {
  const pathname = usePathname();
  const config = PROVIDER_CONFIG[provider];

  const handleLogin = () => {
    const callback = `${
      window.location.origin
    }/auth/callback?redirect=${encodeURIComponent(pathname)}`;
    window.location.href = `${BASE_URL}/api/auth/oauth2/authorize/${provider}?frontend_url=${encodeURIComponent(
      callback,
    )}`;
    onModalClose();
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="flex gap-2 bg-container-primary hover:bg-container-primary-hover body-md-medium py-4 w-full items-center justify-center rounded-sm"
    >
      <Image
        src={config.logo}
        alt={config.alt}
        width={14}
        height={14}
        aria-hidden="true"
      />
      {config.label}
    </button>
  );
}
