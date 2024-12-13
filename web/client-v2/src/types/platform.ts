export type PlatformSiteType =
  | PlatformTypeUnknown
  | PlatformTypeSite
  | PlatformTypeCompany
  | PlatformTypeSummary;

type PlatformTypeUnknown = 0;
type PlatformTypeSite = 1;
type PlatformTypeCompany = 2;
type PlatformTypeSummary = 3;
