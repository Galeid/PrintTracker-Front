export interface CashEntity {
  id: string;
  main: number;
  secondary: number;
  pending: number;
  income: number;
  outflows: number;
  todayPendings: number;
  pastPaid: number;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}
