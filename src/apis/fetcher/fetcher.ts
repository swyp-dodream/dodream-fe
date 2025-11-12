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
