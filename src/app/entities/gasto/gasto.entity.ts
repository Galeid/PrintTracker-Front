import { SupplierEntity } from '../proveedor/supplier.entity';

export interface ExpenseEntity {
  id: string;
  description: string;
  amount: number;
  noInvoice: string | null;
  date: Date;
  secondary: boolean;
  supplier: Partial<SupplierEntity>;
  created_at: Date;
  updated_at: Date;
}
