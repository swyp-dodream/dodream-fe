import { api } from './fetcher/fetcher';
import { createUserApi } from './user.api';

/**
 * 클라이언트 컴포넌트용 API 모음
 */
export const clientApis = {
  user: createUserApi(api),
};
