export interface UserModel {
  username: string;
  password: string;
  role: UserRole;
  name?: string | null;
  branchId: string;
}

export enum UserRole {
  ADMIN = 'admin',
  CONTROLLER = 'controller',
  REPORT = 'report',
}
