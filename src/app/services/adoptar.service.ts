import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Adoptar } from '../models/adoptar';
import { Usuario } from '../models/usuario';
import { FirestoreService } from './solicitudes.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdoptarService {

  private adoptar!: Adoptar;
  adoptar$ = new Subject<Adoptar>();
  path = 'adoptar/';
  uid = '';
  usuario!: Usuario | any;

  adoptarSuscriber!: Subscription;
  usuarioSuscriber!: Subscription;

  constructor(public firebaseauthService: AngularFireAuth,
              public firestoreService: FirestoreService,
              public userService : UserService,
              public router: Router) {

    //   console.log('CarritoService inicio');
      this.initAdoptar();
      this.userService.stateAuth().subscribe( (res: { uid: string; } | any) => {
            // console.log(res);
            if (res !== null) {
                  this.uid = res.uid;
                  this.loadUsuario();
            }
      });
   }

  loadAdoptar() {
      const path = 'Clientes/' + this.uid + '/' + 'carrito';
      if (this.adoptarSuscriber) {
        this.adoptarSuscriber.unsubscribe();
      }
      this.adoptarSuscriber = this.firestoreService.getDoc<Adoptar>(path, this.uid).subscribe( res => {
            //   console.log(res);
              if (res) {
                    this.adoptar = res;
                    this.adoptar$.next(this.adoptar);
              } else {
                  this.initAdoptar();
              }

      });
  }

  initAdoptar() {
      this.adoptar = {
          id: this.uid,
          usuario:this.usuario,
          mascotas: [],
          estado: 'enviado',
          fecha: new Date(),
      };
      this.adoptar$.next(this.adoptar);
  }

  loadUsuario() {
      const path = 'Clientes';
      this.usuarioSuscriber = this.firestoreService.getDoc<Usuario>(path, this.uid).subscribe( res => {
            this.usuario = res;
            // console.log('loadCLiente() ->', res);
            this.loadAdoptar();
            this.usuarioSuscriber.unsubscribe();
      });
  }

  getAdoptar(): Observable<Adoptar> {
    setTimeout(() => {
        this.adoptar$.next(this.adoptar);
    }, 100);
    return this.adoptar$.asObservable();
  }

  addProducto(adoptar : Adoptar) {
     console.log('addProducto ->', this.uid);

     this.adoptar$.next(this.adoptar);
     console.log('en add adoptar -> ', this.adoptar);
     const path = 'Clientes/' + this.uid + '/' + this.path;
     this.firestoreService.createDoc(this.adoptar, path, this.uid).then( () => {
          console.log('añdido con exito');
     });
  }




}
