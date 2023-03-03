import {Injectable} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { map, Observable } from "rxjs";
import { UserInterface } from "../models/user-roles";


@Injectable({
    providedIn: "root"
})
export class UserService {

  public userId!: string;

  isLoggedIn$ : Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  pictureUrl$: Observable<string> | any;

  roles$ : Observable<UserInterface>;


    constructor( public afAuth : AngularFireAuth,
                 public router: Router,
                 public firestore: AngularFirestore) {



                  this.isLoggedIn$ = afAuth.authState.pipe(map(user => !!user));

                  this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

                  this.pictureUrl$ = afAuth.authState.pipe(map(user => user? user.photoURL : null));

                  this.roles$ = this.afAuth.idTokenResult
                  .pipe(
                      map(token => <any>token?.claims ?? {admin:false})
                  )

                  this.afAuth.authState.subscribe(user => {
                    if (user) {
                      this.userId = user.uid;
                    }
                  });


                  }

    stateAuth() {
      return this.afAuth.authState;
    }

    logout() {
      this.afAuth.signOut();
      this.router.navigateByUrl('/login');
  }


  getUserId() {
    return this.userId;
  }



}
