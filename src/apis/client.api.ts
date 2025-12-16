import { api } from './fetcher/fetcher';
import { createUserApi } from './user.api';

/**
 * 클라이언트 컴포넌트용 API 모음
 *
 * @example
 * await clientApis.user.getUser()
 */
export const clientApis = {
  user: createUserApi(api),
};
