import { createUserApi } from './apis/user.api';
import { api } from './fetcher/fetcher';

/**
 * 클라이언트 컴포넌트용 API 모음
 *
 * @example
 * await clientApis.user.getUser()
 */
export const clientApis = {
  user: createUserApi(api),
};
