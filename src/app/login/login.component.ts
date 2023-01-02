import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as firebaseui from 'firebaseui';
import "firebase/auth";
import 'firebase/compat/auth';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  ui!: firebaseui.auth.AuthUI;

  constructor( private afAuth : AngularFireAuth,
                private router : Router) { }

  ngOnInit() {

    this.afAuth.app.then(app => {
      const uiConfig: any = {
          signInOptions: [

            EmailAuthProvider.PROVIDER_ID,
            GoogleAuthProvider.PROVIDER_ID,


          ],
          callbacks: {

            singInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)

          }
      };

    this.ui = new firebaseui.auth.AuthUI(app.auth());

     this.ui.start('#firebaseui-auth-container', uiConfig);

     this.ui.disableAutoSignIn();

  });

  }

  ngOnDestroy() {
    this.ui.delete();
}

onLoginSuccessful(result: any) {

  console.log('Firebase UI result:', result);

  this.router.navigateByUrl("/publicaciones");



}



}
