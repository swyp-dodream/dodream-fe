import { createBookmarkApi } from './apis/bookmark.api';
import { createChatApi } from './apis/chat.api';
import { createMatchedApi } from './apis/matched.api';
import { createMyApi } from './apis/my.api';
import { createPostApi } from './apis/post.api';
import { createProfileApi } from './apis/profile.api';
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
  bookmark: createBookmarkApi(api),
  matched: createMatchedApi(api),
  chat: createChatApi(api),
  my: createMyApi(api),
  post: createPostApi(api),
  profile: createProfileApi(api),
};
