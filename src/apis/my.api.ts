import { authApi } from '@/apis/fetcher/api';
import type {
  GetMyApplicationDetailResponseType,
  MyPostsResponseType,
} from '@/types/my.type';

const myApi = {
  /** 내 지원 상세 조회 */
  getMyApplicationDetail: (applicationId: bigint) => {
    return authApi.get<GetMyApplicationDetailResponseType>(
      `/api/my/applications/${BigInt(applicationId)}`,
    );
  },

  /** 내가 쓴 글 목록 */
  getMyPosts: (type: string) => {
    const tab = type === 'PROJECT' ? 'project' : 'study';
    return authApi.get<MyPostsResponseType>(`/api/posts/my?tab=${tab}`);
  },
};

export default myApi;
