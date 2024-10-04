import { TipoPago } from "../enums/pedido.enums";

export interface GastoModel {
  descripcion: string;
  monto: number;
  nroFactura?: string;
  tipoPago: TipoPago;
  fecha: Date;
  idUsuario: string;
  idProveedor: string;
  idCaja: string;
}
