import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;


import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {


  ui!: firebaseui.auth.AuthUI;
  usuarioActual: string | any;
  disableSignup!: boolean;

  constructor( public router:Router,
                public afAuth: AngularFireAuth,
                private toastController : ToastController) {
                }

ngOnInit() {
  this.afAuth.app.then(app => {
    const uiConfig: any = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
      },
      uiShown: () => {
        const emailInput = <HTMLInputElement>document.querySelector('#firebaseui-auth-container input[type="email"]');
        const signUpButton = <HTMLInputElement>document.querySelector('.firebaseui-id-submit');
        const errorContainer = <HTMLDivElement>document.querySelector('.firebaseui-error-container');

        if (emailInput && signUpButton && errorContainer) {
          emailInput.addEventListener('input', () => {
            const email = emailInput.value;
            app.auth().fetchSignInMethodsForEmail(email).then(signInMethods => {
              if (signInMethods.length > 0) {
                signUpButton.disabled = false;
                errorContainer.style.display = 'none';
                this.disableSignup = true; // Agrega esta línea
              } else {
                signUpButton.disabled = true;
                errorContainer.textContent = 'La dirección de correo electrónico no está registrada.';
                errorContainer.style.display = 'block';
                this.disableSignup = false; // Agrega esta línea
              }
            });
          });
        }
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
  this.usuarioActual = (await this.afAuth.currentUser)?.uid;

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

