import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;

import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {


  ui!: firebaseui.auth.AuthUI;

  constructor( public router:Router,
                private afAuth: AngularFireAuth,
                private toastController : ToastController) {
                }

  ngOnInit() {

    this.afAuth.app.then(app => {
      const uiConfig:any = {
          signInOptions: [
              EmailAuthProvider.PROVIDER_ID,
          ],
          callbacks: {
              signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
          }
      };

      this.ui = new firebaseui.auth.AuthUI(app.auth());

      this.ui.start("#firebaseui-auth-container", uiConfig);

      this.ui.disableAutoSignIn();
  });
  }


  ngOnDestroy() {
    this.ui.delete();
}

  async onLoginSuccessful(result: any) {

  console.log('Firebase UI result:', result);

  this.router.navigateByUrl("/");

  const toast = await this.toastController.create({
    message: 'Sesión iniciada exitosamente ',
    duration: 1500,
    cssClass: 'toast-success',
    icon: 'enter-outline'
  });

  await toast.present();
}

signup(){
  this.router.navigateByUrl('registro-usuario');
}


}

