import { TipoPago, TipoPedido } from "../enums/pedido.enums";

export interface PedidoModel {
  descripcion: string;
  monto: number;
  tipo: TipoPedido;
  tipoPago: TipoPago;
  fecha: Date;
  idUsuario: string;
  idCliente: string;
  idCaja: string;
}
