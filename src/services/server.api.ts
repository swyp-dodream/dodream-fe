import { createBookmarkApi } from './apis/bookmark.api';
import { createChatApi } from './apis/chat.api';
import { createMatchedApi } from './apis/matched.api';
import { createMyApi } from './apis/my.api';
import { createPostApi } from './apis/post.api';
import { createProfileApi } from './apis/profile.api';
import { createRecommendationsApi } from './apis/recommendations.api';
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
  bookmark: createBookmarkApi(serverApi),
  matched: createMatchedApi(serverApi),
  chat: createChatApi(serverApi),
  my: createMyApi(serverApi),
  post: createPostApi(serverApi),
  profile: createProfileApi(serverApi),
  recommendations: createRecommendationsApi(serverApi),
};
