import authenticatedFetcher from './auth-fetcher';
import fetcher from './fetcher';

/**
 * HTTP 메서드 공통 함수
 */
function createApiMethods(fetchFn: typeof fetcher) {
  return {
    get: <T>(endpoint: string, options?: RequestInit) =>
      fetchFn<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
      fetchFn<T>(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      }),

    put: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
      fetchFn<T>(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    patch: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
      fetchFn<T>(endpoint, {
        ...options,
        method: 'PATCH',
        body: JSON.stringify(data),
      }),

    delete: <T>(endpoint: string, options?: RequestInit) =>
      fetchFn<T>(endpoint, { ...options, method: 'DELETE' }),
  };
}

/**
 * 인증 불필요한 API
 * @example
 * await api.get('/api/posts');
 */
export const api = createApiMethods(fetcher);

/**
 * 인증 필요한 API
 * @example
 * await authApi.get('/api/profiles/me');
 */
export const authApi = createApiMethods(authenticatedFetcher);
