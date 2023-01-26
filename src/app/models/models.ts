

export interface Publicacion {
  id: string;
  titulo: string;
  description: string;
  foto: string;
  category:string[];
  create: Date;

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
}

export interface Donacion {
  id: string;
  nombre: string,
  rut: string,
  banco: string[],
  tipo:string,
  cuenta:string,
  correo: string

}

export interface Usuario {
  uid: string;
  email: string;
  nombre: string;
  celular: string;
  foto: string;
  ubicacion: string;
}


export interface Adoptar {
  id: string;
  usuario : Usuario;
  adoptado : MascotaAdoptada[];
  estado: EstadoPedido;
  fecha: any;
  valoracion: number;
}

export interface MascotaAdoptada{

  publicacion: Publicacion;
}

export type  EstadoPedido = 'enviado' | 'procesando' | 'aprobado' | 'rechazado';
