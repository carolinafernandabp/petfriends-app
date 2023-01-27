import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
  PushNotificationToken,
  PushNotification,
  PushNotificationActionPerformed
} from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { FirebaseauthService } from './firebaseauth.service';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public platform: Platform,
              public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              private router: Router,
              private http: HttpClient) {

                this.stateUser();
                this.inicializar();
               }


  stateUser(){

    this.firebaseauthService.stateAuth().subscribe( res => {
      console.log(res);
      if (res !== null) {
          this.inicializar();
      }
    });


  }

  inicializar() {

    if (this.platform.is('capacitor')) {

          PushNotifications.requestPermissions().then( result => {
              console.log('PushNotifications.requestPermission()');
              if (result) {
                console.log('permisos concedidos');
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register();
                this.addListeners();
              } else {
                // Show some error
              }
          });

    } else {
      console.log('PushNotifications.requestPermission() -> no es movil');
    }
  }

  addListeners() {

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        console.log('Push action performed en segundo plano -> ', notification);

        this.router.navigate(['/']);
      }
    );


}
  async guadarToken(value: string) {
    const Uid = await this.firebaseauthService.getUid();

    if (Uid) {
        console.log('guardar Token Firebase ->', Uid);
        const path = '/users/';
        const userUpdate = {
          //token: token,
        };
        this.firestoreService.updateDoc(userUpdate, path, Uid);
        console.log('guardar TokenFirebase()->', userUpdate, path, Uid);
    }

  }




  newNotication() {

  const receptor = 'CHpQBloQ36ZRsLoGz9RmUwBAstR2'
  const path = 'Clientes/';
  this.firestoreService.getDoc<any>(path, receptor).subscribe( res => {
        if (res) {
            const token = res.token;
            const dataNotification = {
              enlace: '/mis-pedidos',
            }
            const notification = {
              title: 'Mensaje enviado manuelmente',
              body: 'Adios'
            };
            const msg: INotification = {
                  data: dataNotification,
                  tokens: [token],
                  notification,
            }
            const url = 'https://us-central1-petfriends-app-94df7.cloudfunctions.net/createUser';
            return this.http.post<Res>(url, {msg}).subscribe( res => {
                  console.log('respuesta newNotication() -> ', res);

            });
        }

  });


}

}

interface INotification {
  data: any;
  tokens: string[];
  notification: any
}


interface Res {
  respuesta: string;
}

