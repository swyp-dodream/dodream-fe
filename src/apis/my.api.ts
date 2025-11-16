import { authApi } from '@/apis/fetcher/api';
import type { GetMyApplicationDetailResponseType } from '@/types/my.type';

const myApi = {
  /** 내 지원 상세 조회 */
  getMyApplicationDetail: (applicationId: bigint) => {
    return authApi.get<GetMyApplicationDetailResponseType>(
      `/api/my/applications/${BigInt(applicationId)}`,
    );
  },
};

export default myApi;
