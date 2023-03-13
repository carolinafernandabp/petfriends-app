import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private firestore: AngularFirestore) { }


  enviarSolicitud(id: string, description: string, uidEmisor: string, uidReceptor: string) {
    return this.firestore.collection('solicitudes-adopcion').add({
      id,
      description,
      uidEmisor,
      uidReceptor
    });
  }

  recibirSolicitudes(uidUsuario: string) {
    return this.firestore.collection('solicitudes-adopcion', ref => ref.where('uidReceptor', '==', uidUsuario)).valueChanges();
  }
}

