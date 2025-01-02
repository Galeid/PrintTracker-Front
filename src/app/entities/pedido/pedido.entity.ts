import { ClientEntity } from '../cliente/cliente.entity';
import {
  EstadoPago,
  TipoPedido,
} from '../enums/pedido.enums';

export interface OrderEntity {
  id: string;
  descripcion: string;
  monto: number;
  nroPedido: number;
  tipo: TipoPedido;
  fecha: Date;
  fechaPago: Date;
  estadoPago: EstadoPago;
  cliente: Partial<ClientEntity>;
  created_at: Date;
  updated_at: Date;
}

