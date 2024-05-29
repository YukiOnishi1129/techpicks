export type OriginProfileType = {
  id: string;
  name: string;
  email: string;
  email_verified_at?: string;
  image: string;
  is_super_admin: boolean;
  provider?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};
