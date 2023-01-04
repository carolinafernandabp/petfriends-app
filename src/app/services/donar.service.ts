import {Injectable} from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController } from "@ionic/angular";
import firebase from "firebase/compat";
import {from, Observable, of} from "rxjs";
import {concatMap, map, tap} from "rxjs/operators";
import { Donacion } from "../models/donar";
import { Publicacion } from "../models/publicacion";
import { convertSnaps} from "../services/db-util"


import OrderByDirection = firebase.firestore.OrderByDirection;


@Injectable({
    providedIn: "root"
})
export class DonarService {

    constructor(private db: AngularFirestore,
                  private alertController: AlertController) {

    }


    async deleteDonar(donarId:string) {

        return from(this.db.doc(`donaciones/${donarId}`).delete());
    }

    updateDonar(donarId:string, changes: Partial<Donacion>):Observable<any> {
        return from(this.db.doc(`donaciones/${donarId}`).update(changes));
    }

    createDonacion(newDonacion: Partial<Donacion>, donarId?:string) {
        return this.db.collection("donaciones",
                ref => ref.orderBy("seqNo", "desc").limit(1))
            .get()
            .pipe(
                concatMap(result => {

                    const donaciones = convertSnaps<Donacion>(result);

                    const lastDonacionSeqNo = donaciones[0]?.seqNo ?? 0;

                    const donacion = {
                        ...newDonacion,
                        seqNo: lastDonacionSeqNo + 1
                    }

                    let save$: Observable<any>;

                    if (donarId) {
                        save$ = from(this.db.doc(`publicaciones/${donarId}`).set(donacion));
                    }
                    else {
                        save$ = from(this.db.collection("publicaciones").add(donacion));
                    }

                    return save$
                        .pipe(
                            map(res => {
                                return {
                                    id: donarId ?? res.id,
                                    ...donacion
                                }
                            })
                        );


                })
            )
    }

    loadDonacionnByCategory(category:string): Observable<Donacion[]> {
         return this.db.collection(
            "donaciones",
            ref => ref.where("categories", "array-contains", category)
                .orderBy("seqNo")
            )
            .get()
             .pipe(
                 map(result => convertSnaps<Donacion>(result))
             );

    }

}
