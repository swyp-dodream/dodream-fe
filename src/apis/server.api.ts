import { serverApi } from './fetcher/server-fetcher';
import { createUserApi } from './user.api';

/**
 * 서버 컴포넌트용 API 모음
 *
 * @example
 * await serverApis.user.getUser()
 */
export const serverApis = {
  user: createUserApi(serverApi),
};
