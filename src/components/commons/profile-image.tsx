import Image from 'next/image';

interface ProfileImageProps {
  src?: string | null | undefined;
  code?: number | undefined;
  size: number;
  userName?: string;
  className?: string;
}

/**
 * 프로필 이미지 컴포넌트
 * @param src - 이미지 주소
 * @param size - 이미지 사이즈
 * @param userName - 프로필 이미지 유저
 */
export default function ProfileImage({
  src,
  code,
  size,
  userName,
  className = '',
}: ProfileImageProps) {
  return (
    <Image
      src={src ?? `/avatar/${code}.svg`}
      alt={userName ? `${userName}님의 프로필 이미지` : '프로필 이미지'}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`bg-surface ${className}`}
    />
  );
}
