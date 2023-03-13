import { UserInterface } from "./user-roles";

export interface Usuario {

  userinterface : UserInterface
}

export interface Publicacion {
  id: string;
  titulo: string;
  description: string;
  foto: string;
  category:string[];
  create: Date;
  userId: string | any; // para coincidir Id

}

export interface Ficha {

  id: string;
  nombre: string;
  nacimiento:Date;
  raza: string;
  color: String;
  tamanio: string
  description: string;
  foto:string;
  especie: string[];
  estado:string[];
  microChip: number;
  userId: string | any; // para coincidir Id
}

export interface Donacion {

  id: string;
  nombre: string,
  rut: string,
  banco: string[],
  tipo:string[],
  cuenta:number,
  correo: string,
  userId: string | any; // para coincidir Id
}
export interface Adoptar {

  id: string;
  description: string;
  estado: EstadoPedido;
  fecha: Date;
  userId: string | any; // Agregamops Id para coincidir Id de la sesión iniciada
}

export interface Voluntario {

  id: string;
  description: string;
  estado: EstadoPedido;
  fecha: Date;
  userId: string | any;
  publicacionId: string | any;


}

export type  EstadoPedido = 'enviada' | 'aceptada' | 'rechazada';


