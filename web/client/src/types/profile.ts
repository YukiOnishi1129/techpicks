export type OriginProfileType = {
  id: string;
  name: string;
  email: string;
  emailVerifiedAt?: string;
  image: string;
  isSuperAdmin: boolean;
  provider?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
