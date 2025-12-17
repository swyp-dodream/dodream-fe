import { createBookmarksApi } from './apis/bookmarks.api';
import { createChatApi } from './apis/chat.api';
import { createMatchedApi } from './apis/matched.api';
import { createMyApi } from './apis/my.api';
import { createPostsApi } from './apis/posts.api';
import { createProfileApi } from './apis/profile.api';
import { createRecommendationsApi } from './apis/recommendations.api';
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
  bookmarks: createBookmarksApi(api),
  matched: createMatchedApi(api),
  chat: createChatApi(api),
  my: createMyApi(api),
  posts: createPostsApi(api),
  profile: createProfileApi(api),
  recommendations: createRecommendationsApi(api),
};
