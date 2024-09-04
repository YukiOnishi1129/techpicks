import { User } from '@supabase/supabase-js';
import { Request } from 'express';

export interface GraphQLContext {
  req: Request & { user?: User };
}
