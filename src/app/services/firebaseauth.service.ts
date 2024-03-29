import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../models/models';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {


  datosUsuario!: Usuario;

  constructor(public auth: AngularFireAuth,
              private firestoreService: FirestoreService) {

      this.stateUser();

  }


  stateUser() {
    this.stateAuth().subscribe( res => {
      // console.log(res);
      if (res !== null) {
        this.getInfoUser();

      }
   });

  }



  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  registrar(email: string, password: string) {
     return this.auth.createUserWithEmailAndPassword(email, password);
  }

  async getUid() {
     const user = await this.auth.currentUser;
     if (user === null) {
       return null;
     } else {
        return user.uid;
     }
  }

  stateAuth() {
     return this.auth.authState;
  }

  async getInfoUser() {
    const uid = await this.getUid();
    const path = 'Usuarios';
    this.firestoreService.getDoc<Usuario>(path, uid as string).subscribe( res => {
          if (res !== undefined) {
                this.datosUsuario = res;
                // console.log('datosCliente ->' , this.datosCliente);
          }
    });
}





}
