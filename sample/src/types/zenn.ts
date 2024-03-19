export type ZennArticle = {
  id: number;
  postType: string;
  title: string;
  slug: string;
  commentsCount: number;
  likedCount: number;
  bodyLettersCount: number;
  articleType: string;
  emoji: string;
  isSuspendingPrivate: boolean;
  publishedAt: string;
  bodyUpdatedAt: string;
  sourceRepoUpdatedAt: string;
  pinned: boolean;
  path: string;
  user?: ZennUser;
  publication?: ZennPublication;
};

type ZennUser = {
  id: number;
  username: string;
  name: string;
  avatarSmallUrl: string;
};

type ZennPublication = {
  id: number;
  name: string;
  displayName: string;
  avatarSmallUrl: string;
  pro: boolean;
  avatarRegistered: boolean;
};
