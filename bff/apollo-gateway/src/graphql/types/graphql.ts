
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class ArticlesInput {
    userId?: Nullable<string>;
    languageStatus?: Nullable<number>;
    tab?: Nullable<string>;
    feedIds?: Nullable<string[]>;
    first?: Nullable<number>;
    after?: Nullable<string>;
    last?: Nullable<number>;
    before?: Nullable<string>;
}

export class CreateBookmarkInput {
    articleId: string;
    userId: string;
    platformId?: Nullable<string>;
    title: string;
    description: string;
    articleUrl: string;
    thumbnailUrl: string;
    publishedAt?: Nullable<number>;
    platformName: string;
    platformUrl: string;
    platformFaviconUrl: string;
    isEng: boolean;
    isRead: boolean;
}

export class CreateBookmarkForUploadArticleInput {
    title: string;
    description: string;
    articleUrl: string;
    thumbnailUrl: string;
    platformName: string;
    platformUrl: string;
    platformFaviconUrl: string;
}

export class DeleteBookmarkInput {
    bookmarkId: string;
    userId: string;
}

export class BookmarksInput {
    userId: string;
    keyword?: Nullable<string>;
    first?: Nullable<number>;
    after?: Nullable<string>;
    last?: Nullable<number>;
    before?: Nullable<string>;
}

export class CreateFavoriteArticleFolderInput {
    title: string;
    description?: Nullable<string>;
}

export class UpdateFavoriteArticleFolderInput {
    id: string;
    title: string;
    description?: Nullable<string>;
}

export class DeleteFavoriteArticleFolderInput {
    id: string;
}

export class CreateFavoriteArticleInput {
    articleId: string;
    favoriteArticleFolderId: string;
    platformId?: Nullable<string>;
    title: string;
    description?: Nullable<string>;
    thumbnailUrl: string;
    articleUrl: string;
    publishedAt?: Nullable<number>;
    authorName?: Nullable<string>;
    tags?: Nullable<string>;
    platformName: string;
    platformUrl: string;
    platformFaviconUrl: string;
    isEng: boolean;
    isPrivate: boolean;
    isRead: boolean;
}

export class CreateFavoriteArticleForUploadArticleInput {
    favoriteArticleFolderId: string;
    title: string;
    description?: Nullable<string>;
    thumbnailUrl: string;
    articleUrl: string;
    platformName: string;
    platformUrl: string;
    platformFaviconUrl: string;
}

export class DeleteFavoriteArticleInput {
    id: string;
}

export class DeleteFavoriteArticleByArticleIdInput {
    articleId: string;
    favoriteArticleFolderId: string;
}

export class FavoriteArticleFoldersInput {
    keyword?: Nullable<string>;
    isFolderOnly?: Nullable<boolean>;
    isAllFetch?: Nullable<boolean>;
    isFavoriteArticleAllFetch?: Nullable<boolean>;
    first?: Nullable<number>;
    after?: Nullable<string>;
    last?: Nullable<number>;
    before?: Nullable<string>;
}

export class FavoriteArticleFolderInput {
    id: string;
    isFolderOnly?: Nullable<boolean>;
}

export class FavoriteArticlesInput {
    keyword?: Nullable<string>;
    folderId?: Nullable<string>;
    first?: Nullable<number>;
    after?: Nullable<string>;
    last?: Nullable<number>;
    before?: Nullable<string>;
}

export interface Node {
    id: string;
}

export abstract class IQuery {
    abstract articles(articlesInput: ArticlesInput): ArticleConnection | Promise<ArticleConnection>;

    abstract articleOpg(articleUrl: string): ArticleOGP | Promise<ArticleOGP>;

    abstract bookmarks(input: BookmarksInput): BookmarkConnection | Promise<BookmarkConnection>;

    abstract favoriteArticleFolders(input?: Nullable<FavoriteArticleFoldersInput>): FavoriteArticleFolderConnection | Promise<FavoriteArticleFolderConnection>;

    abstract favoriteArticleFolder(input: FavoriteArticleFolderInput): FavoriteArticleFolder | Promise<FavoriteArticleFolder>;

    abstract favoriteArticles(input?: Nullable<FavoriteArticlesInput>): FavoriteArticleConnection | Promise<FavoriteArticleConnection>;
}

export class Article implements Node {
    id: string;
    platform?: Nullable<Platform>;
    feeds?: Nullable<Feed[]>;
    favoriteArticleFolderIds: string[];
    title: string;
    description: string;
    articleUrl: string;
    publishedAt?: Nullable<number>;
    authorName?: Nullable<string>;
    tags?: Nullable<string>;
    thumbnailUrl: string;
    isEng: boolean;
    isPrivate: boolean;
    bookmarkId?: Nullable<string>;
    isBookmarked: boolean;
    isFollowing: boolean;
    likeCount?: Nullable<number>;
    createdAt: number;
    updatedAt: number;
}

export class ArticleConnection {
    edges: ArticleEdge[];
    pageInfo: PageInfo;
}

export class ArticleEdge {
    cursor: string;
    node: Article;
}

export class ArticleOGP {
    title: string;
    description?: Nullable<string>;
    thumbnailUrl: string;
    articleUrl: string;
    siteUrl: string;
    siteName: string;
    faviconUrl: string;
}

export class PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: Nullable<string>;
    endCursor?: Nullable<string>;
}

export abstract class IMutation {
    abstract createBookmark(createBookmarkInput: CreateBookmarkInput): Bookmark | Promise<Bookmark>;

    abstract createBookmarkForUploadArticle(input: CreateBookmarkForUploadArticleInput): Bookmark | Promise<Bookmark>;

    abstract deleteBookmark(deleteBookmarkInput: DeleteBookmarkInput): boolean | Promise<boolean>;

    abstract createFavoriteArticleFolder(input: CreateFavoriteArticleFolderInput): FavoriteArticleFolder | Promise<FavoriteArticleFolder>;

    abstract updateFavoriteArticleFolder(input: UpdateFavoriteArticleFolderInput): FavoriteArticleFolder | Promise<FavoriteArticleFolder>;

    abstract deleteFavoriteArticleFolder(input: DeleteFavoriteArticleFolderInput): boolean | Promise<boolean>;

    abstract createFavoriteArticle(input: CreateFavoriteArticleInput): FavoriteArticle | Promise<FavoriteArticle>;

    abstract createFavoriteArticleForUploadArticle(input: CreateFavoriteArticleForUploadArticleInput): FavoriteArticle | Promise<FavoriteArticle>;

    abstract deleteFavoriteArticle(input: DeleteFavoriteArticleInput): boolean | Promise<boolean>;

    abstract deleteFavoriteArticleByArticleId(input: DeleteFavoriteArticleByArticleIdInput): boolean | Promise<boolean>;
}

export class Bookmark implements Node {
    id: string;
    title: string;
    description: string;
    articleUrl: string;
    thumbnailUrl: string;
    publishedAt?: Nullable<number>;
    articleId: string;
    platformId?: Nullable<string>;
    platformName: string;
    platformUrl: string;
    platformFaviconUrl: string;
    isEng: boolean;
    isRead: boolean;
    createdAt: number;
    updatedAt: number;
}

export class BookmarkConnection {
    edges: BookmarkEdge[];
    pageInfo: PageInfo;
}

export class BookmarkEdge {
    cursor: string;
    node: Bookmark;
}

export class Category implements Node {
    id: string;
    name: string;
    type: number;
    createdAt: number;
    updatedAt: number;
    deletedAt?: Nullable<number>;
}

export class FavoriteArticle implements Node {
    id: string;
    articleId: string;
    platformId?: Nullable<string>;
    favoriteArticleFolderId: string;
    userId: string;
    title: string;
    description?: Nullable<string>;
    thumbnailUrl: string;
    articleUrl: string;
    publishedAt?: Nullable<number>;
    authorName?: Nullable<string>;
    tags?: Nullable<string>;
    platformName: string;
    platformUrl: string;
    platformFaviconUrl: string;
    isEng: boolean;
    isPrivate: boolean;
    isRead: boolean;
    createdAt: number;
    updatedAt: number;
}

export class FavoriteArticleFolder implements Node {
    id: string;
    userId: string;
    title: string;
    description?: Nullable<string>;
    favoriteArticles: FavoriteArticle[];
    createdAt: number;
    updatedAt: number;
}

export class FavoriteArticleFolderConnection {
    edges: FavoriteArticleFolderEdge[];
    pageInfo: PageInfo;
}

export class FavoriteArticleFolderEdge {
    cursor: string;
    node: FavoriteArticleFolder;
}

export class FavoriteArticleConnection {
    edges: FavoriteArticleEdge[];
    pageInfo: PageInfo;
}

export class FavoriteArticleEdge {
    cursor: string;
    node: FavoriteArticle;
}

export class Feed implements Node {
    id: string;
    platform: Platform;
    category: Category;
    name: string;
    description: string;
    rssUrl: string;
    siteUrl: string;
    thumbnailUrl: string;
    trendPlatformType: number;
    apiQueryParam?: Nullable<string>;
    createdAt: number;
    updatedAt: number;
    deletedAt?: Nullable<number>;
}

export class MyFeedFolder implements Node {
    id: string;
    userId: string;
    title: string;
    description?: Nullable<string>;
    feeds?: Nullable<Feed[]>;
    createdAt: number;
    updatedAt: number;
}

export class Platform implements Node {
    id: string;
    name: string;
    siteUrl: string;
    platformSiteType: number;
    faviconUrl: string;
    isEng: boolean;
    createdAt: number;
    updatedAt: number;
    deletedAt?: Nullable<number>;
}

export class Profile implements Node {
    id: string;
    name: string;
    email: string;
    emailVerified?: Nullable<string>;
    image: string;
    isSuperAdmin: boolean;
    createdAt: number;
    updatedAt: number;
    deletedAt?: Nullable<number>;
}

type Nullable<T> = T | null;
