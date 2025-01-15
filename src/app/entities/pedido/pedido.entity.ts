import { ClientEntity } from '../cliente/cliente.entity';
import {
  PaymentStatus,
} from '../enums/pedido.enums';
import { ServiceEntity } from '../service/service.entity';

export interface OrderEntity {
  id: string;
  description: string;
  amount: number;
  noOrder: number;
  date: Date;
  paymentDate: Date | null;
  paymentStatus: PaymentStatus;
  secondary: boolean;
  service: Partial<ServiceEntity>;
  client: Partial<ClientEntity>;
  created_at: Date;
  updated_at: Date;
}

