import { createUserApi } from './apis/user.api';
import { serverApi } from './fetcher/server-fetcher';

/**
 * 서버 컴포넌트용 API 모음
 *
 * @example
 * await serverApis.user.getUser()
 */
export const serverApis = {
  user: createUserApi(serverApi),
};
