import { UserRole } from './user.model';

export interface UserEntity {
  id: string;
  username: string;
  role: UserRole;
  name: string | null;
  status: boolean;
  branch: { id: string; name: string };
  created_at: Date;
  updated_at: Date;
}
