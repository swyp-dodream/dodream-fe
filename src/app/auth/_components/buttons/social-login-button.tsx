import Image from 'next/image';
import { PROVIDER_CONFIG } from '@/constants/auth.constant';
import type { ProviderType } from '@/types/auth.type';

interface SocialLoginButtonProps {
  provider: ProviderType;
  onClick?: () => void;
}

export default function SocialLoginButton({
  provider,
  onClick,
}: SocialLoginButtonProps) {
  const config = PROVIDER_CONFIG[provider];

  return (
    <button
      type="button"
      onClick={onClick}
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
