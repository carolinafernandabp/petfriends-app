export interface Ficha {
  id: string;
  nombre: String;
  nacimiento:Date;
  raza: string;
  color: String;
  tamanio: string
  description: string;
  image:string;
  iconUrl: string;
  seqNo:number;
  especie: string[];
  estado:string[];
  microChip: string;
}
