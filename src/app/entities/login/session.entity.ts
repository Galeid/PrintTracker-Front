export interface SessionEntity {
  token: string;
  role: string;
  branch: string;
  lockDate: null | Date;
}
