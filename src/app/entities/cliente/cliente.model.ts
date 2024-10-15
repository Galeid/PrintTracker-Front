export interface ClienteModel {
  nombre: string;
  ruc?: string | null;
  empresa: string;
  telefono: string;
  correo?: string | null;
  direccion?: string | null;
}
