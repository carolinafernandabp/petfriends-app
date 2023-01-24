import { Publicacion } from "./publicacion";
import { Usuario } from "./usuario";


export interface Adoptar {
  id: string;
  mascotas: Mascota[];
  estado: Estado;
  fecha: any;
  usuario : Usuario;
}

export interface Mascota {
   publicacion : Publicacion;
}

export type  Estado = 'enviado' | 'procesando' | 'aceptado' | 'rechazado';
