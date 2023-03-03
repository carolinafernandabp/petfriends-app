import { UserInterface } from "./user-roles";


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
  microChip: string;
  userId: string | any; // para coincidir Id
}

export interface Donacion {
  id: string;
  nombre: string,
  rut: string,
  banco: string[],
  tipo:string,
  cuenta:string,
  correo: string
  userId: string | any; // para coincidir Id

}

export interface Usuario {

  userinterface : UserInterface
}


export interface Adoptar {
  id: string;
  description: string;
  estado: EstadoPedido;
  fecha: Date;
}

export interface Voluntario {
  id: string;
  description: string;
  estado: EstadoPedido;
  fecha: Date;
}


export interface Adopcion{

  adoptar : Adoptar;
}



export type  EstadoPedido = 'enviada' | 'aceptada' | 'rechazada';
