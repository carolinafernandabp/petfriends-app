import {Injectable} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { BehaviorSubject, map, Observable } from "rxjs";
import { UserInterface } from "../models/user-roles";


@Injectable({
    providedIn: "root"
})
export class UserService {


  public userId: string = '';


  isLoggedIn$ : Observable<boolean>;

  isLoggedOut$: Observable<boolean> ;

  pictureUrl$: Observable<string> | any;

  roles$ : Observable<UserInterface>;

  user!: Observable< UserInterface | null>;


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



                  }

    stateAuth() {
      return this.afAuth.authState;

    }

    logout() {
      this.afAuth.signOut();
      this.router.navigateByUrl('/login');
  }


  getUserId2() {
    return this.afAuth.authState.pipe(
      map(user => user ? user.uid : null)
    );
  }


      getUserId() {
        return this.userId;
      }



}
