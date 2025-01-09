export enum TipoPedido {
  TARJETAS = 'tarjetas',
  VOLANTES = 'volantes',
  SERVICIO_OFFSET = 'offset',
  SERVICIO_PLASTICO = 'plastico',
  OTRO = 'otro',
}

export enum TipoPago {
  EFECTIVO = 'efectivo',
  YAPE = 'yape',
  TRANSFERENCIA = 'transferencia',
}

export enum EstadoPedido {
  PENDIENTE = 'pendiente',
  PROCESO = 'proceso',
  COMPLETADO = 'completado',
  ANULADO = 'anulado',
}

export enum EstadoPago {
  PENDIENTE = 'pendiente',
  PAGADO = 'pagado',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OTHER = 'other',
  CANCELLED = 'cancelled',
}
