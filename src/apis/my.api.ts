import { authApi } from '@/apis/fetcher/api';
import type { MatchingCancelReasonCode } from '@/constants/matching.constant';
import type { GetMyApplicationDetailResponseType } from '@/types/my.type';

const myApi = {
  /** 내 지원 상세 조회 */
  getMyApplicationDetail: (applicationId: bigint) => {
    return authApi.get<GetMyApplicationDetailResponseType>(
      `/api/my/applications/${BigInt(applicationId)}`,
    );
  },

  /** 매칭 취소 */
  cancelMatching: (
    matchingId: bigint,
    reasonCode: MatchingCancelReasonCode,
    reasonText: string,
  ) => {
    return authApi.post(`/api/matched/${BigInt(matchingId)}/cancel`, {
      reasonCode,
      reasonText,
    });
  },
};

export default myApi;
