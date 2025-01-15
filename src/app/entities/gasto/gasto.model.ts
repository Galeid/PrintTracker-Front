export interface ExpenseModel {
  description: string;
  amount: number;
  noInvoice?: string;
  date: Date;
  secondary: boolean;
  supplierId: string;
}
