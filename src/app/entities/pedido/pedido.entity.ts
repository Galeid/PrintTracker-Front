import { ClienteEntity } from '../cliente/cliente.entity';
import {
  EstadoPago,
  EstadoPedido,
  TipoPago,
  TipoPedido,
} from '../enums/pedido.enums';

export interface PedidoEntity {
  id: string;
  descripcion: string;
  monto: number;
  nroPedido: number;
  tipo: TipoPedido;
  tipoPago: TipoPago;
  fecha: Date;
  fechaPago: Date;
  estado: EstadoPedido;
  estadoPago: EstadoPago;
  cliente: Partial<ClienteEntity>;
  created_at: Date;
  updated_at: Date;
}
