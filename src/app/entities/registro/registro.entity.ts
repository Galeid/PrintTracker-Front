export interface RegistroEntity {
  id: string;
  cuentaInicial: number;
  cuentaFinal: number;
  efectivoInicial: number;
  efectivoFinal: number;
  pendienteInicial: number;
  pendienteFinal: number;
  ingresosCuentaTotal: number;
  ingresosEfectivoTotal: number;
  gastosCuentaTotal: number;
  gastosEfectivoTotal: number;
  pendientesHoy: number;
  pasadosPagados: number;
  nroPedidos: number;
  nroGastos: number;
  nroPedidosPendientes: number;
  nroPasadosPagados: number;
  fecha: Date;
  created_at: Date;
  updated_at: Date;
}
