import { BASE_URL } from '@/constants/auth.constant';

async function fetcher<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const url = `${BASE_URL}${endpoint}`;

    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const contentType = res.headers.get('content-type');

    // JSON이 아닌 응답 체크
    if (!contentType?.includes('application/json') && res.status !== 204) {
      // HTML 응답은 인증 에러로 간주
      if (contentType?.includes('text/html')) {
        const error: Error & { status?: number } = new Error('인증되지 않음');
        error.status = 401;
        throw error;
      }

      // text/plain 응답 처리
      if (contentType?.includes('text/plain')) {
        if (!res.ok) {
          const errorText = await res.text();
          console.error('에러 응답:', errorText);
          const error: Error & { status?: number } = new Error(
            errorText || `HTTP 에러 ${res.status}`,
          );
          error.status = res.status;
          throw error;
        }
        // 성공 시 텍스트 반환
        return (await res.text()) as T;
      }

      const error: Error & { status?: number } = new Error(
        `지원하지 않는 응답 형식: ${contentType}`,
      );
      error.status = res.status;
      throw error;
    }

    if (!res.ok) {
      const errorText = await res.text();
      console.error('에러 응답:', errorText);
      const error: Error & { status?: number } = new Error(
        errorText || `HTTP 에러 ${res.status}`,
      );
      error.status = res.status;
      throw error;
    }

    return res.status === 204 ? ({} as T) : await res.json();
  } catch (error) {
    console.error(`Fetch 요청 오류: ${error}`);
    throw error;
  }
}

export default fetcher;
