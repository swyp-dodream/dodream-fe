const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

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
      throw new Error(`요청 실패: ${res.status} ${res.statusText}`);
    }

    return res.status === 204 ? ({} as T) : await res.json();
  } catch (error) {
    // TODO: 필요 시 에러 타입별 처리
    console.error(`Fetch 요청 오류: ${error}`);
    throw error;
  }
}

const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    fetcher<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    fetcher<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    fetcher<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    fetcher<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
