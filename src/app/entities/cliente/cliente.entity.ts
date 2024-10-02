export interface ClienteEntity {
  id: string;
  nombre: string;
  ruc: string;
  empresa: string;
  telefono: string;
  correo: string;
  direccion: string;
  estado: boolean;
  created_at: Date;
  updated_at: Date;
}
