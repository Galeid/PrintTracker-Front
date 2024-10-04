import { ProveedorEntity } from '../proveedor/proveedor.entity';
import {
  TipoPago,
} from '../enums/pedido.enums';

export interface GastoEntity {
  id: string;
  descripcion: string;
  monto: number;
  nroFactura: string;
  tipoPago: TipoPago;
  fecha: Date;
  proveedor: Partial<ProveedorEntity>;
  created_at: Date;
  updated_at: Date;
}
