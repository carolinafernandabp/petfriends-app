import {Injectable} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import {  UserInterface } from "../models/user-roles";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { map } from "rxjs/operators"

@Injectable({
    providedIn: "root"
})
export class PetloverService {


    constructor( public afsAuth : AngularFireAuth,
                  public afs : AngularFirestore) {}

    registerUser(email: string, pass: string) {
      return new Promise((resolve, reject) => {
        this.afsAuth.createUserWithEmailAndPassword(email, pass)
          .then((userData: any) => {
            resolve(userData),
              this.updateUserData(userData.user)
          }).catch((err: any) => console.log(reject(err)))
      });
    }

    loginEmailUser(email: string, pass: string) {
      return new Promise((resolve, reject) => {
        this.afsAuth.signInWithEmailAndPassword(email, pass)
          .then((userData: unknown) => resolve(userData),
            (          err: any) => reject(err));
      });
    }


    logoutUser() {
      return this.afsAuth.signOut();
    }

    isAuth() {
      return this.afsAuth.authState.pipe(map((auth: any) => auth));
    }

    private updateUserData(user: { uid: any; email: any; }) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users-petlover/${user.uid}`);
      const data: UserInterface = {
        id: user.uid,
        email: user.email,
        roles: {
          petlover: true
        }
      }
      return userRef.set(data, { merge: true })
    }



    isUserPetlover(userUid: any) {
      return this.afs.doc<UserInterface>(`users-petlover/${userUid}`).valueChanges();
    }


}
