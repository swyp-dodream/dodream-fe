import { createBookmarksApi } from './apis/bookmarks.api';
import { createChatApi } from './apis/chat.api';
import { createMatchedApi } from './apis/matched.api';
import { createMyApi } from './apis/my.api';
import { createPostsApi } from './apis/posts.api';
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
  bookmarks: createBookmarksApi(serverApi),
  matched: createMatchedApi(serverApi),
  chat: createChatApi(serverApi),
  my: createMyApi(serverApi),
  posts: createPostsApi(serverApi),
  profile: createProfileApi(serverApi),
  recommendations: createRecommendationsApi(serverApi),
};
