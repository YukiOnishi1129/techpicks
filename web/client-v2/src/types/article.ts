export type ArticleTabType =
  | ArticleTrendTab
  | ArticleSiteTab
  | ArticleCompanyTab
  | ArticleSummaryTab
  | ArticleUnknownTab;

type ArticleTrendTab = "trend";
type ArticleSiteTab = "site";
type ArticleCompanyTab = "company";
type ArticleSummaryTab = "summary";
type ArticleUnknownTab = "unknown";
