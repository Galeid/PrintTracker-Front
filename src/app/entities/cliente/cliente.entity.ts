export interface ClientEntity {
  id: string;
  name: string;
  ruc: string | null;
  company: string;
  phone: string | null;
  email: string | null;
  addres: string | null;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}
