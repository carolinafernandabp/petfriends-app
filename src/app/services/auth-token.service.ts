import {Injectable} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";



@Injectable({
    providedIn: "root"
})
export class AuthTokenService {

    authJwtToken!: string;

    constructor(public afAuth: AngularFireAuth) {
        afAuth.idToken
            .subscribe((jwt:any) => this.authJwtToken = jwt);
    }


}
