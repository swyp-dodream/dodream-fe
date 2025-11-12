import { BASE_URL } from '@/constants/auth.constant';

async function fetcher<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const url = `${BASE_URL}${endpoint}`;

    // TODO: 파일 업로드 고려하여 Content-Type 수정
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const contentType = res.headers.get('content-type');

    // JSON이 아닌 응답 체크
    if (!contentType?.includes('application/json') && res.status !== 204) {
      console.error('Non-JSON response:', {
        status: res.status,
        contentType,
        url,
      });

      // HTML 응답은 인증 에러로 간주
      if (contentType?.includes('text/html')) {
        throw new Error('401');
      }

      throw new Error(`Unexpected response type: ${contentType}`);
    }

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error response:', errorText);
      throw new Error(`${res.status}`);
    }

    return res.status === 204 ? ({} as T) : await res.json();
  } catch (error) {
    console.error(`Fetch 요청 오류: ${error}`);
    throw error;
  }
}

export default fetcher;
