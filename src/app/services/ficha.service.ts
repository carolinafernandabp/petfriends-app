import {Injectable} from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController } from "@ionic/angular";
import firebase from "firebase/compat";
import {from, Observable, of} from "rxjs";
import {concatMap, map, tap} from "rxjs/operators";
import { Ficha } from "../models/ficha-mascota";
import { Petlover } from "../models/petlover";
import { convertSnaps } from "./db-util";



import OrderByDirection = firebase.firestore.OrderByDirection;


@Injectable({
    providedIn: "root"
})
export class FichaMascotaService {

    constructor(private db: AngularFirestore,
                  private alertController: AlertController) {

    }




    async deleteFicha(fichaId:string) {

        return from(this.db.doc(`fichas/${fichaId}`).delete());
    }

    updateFicha(fichaId:string, changes: Partial<Ficha>):Observable<any> {
        return from(this.db.doc(`fichas/${fichaId}`).update(changes));
    }

    createFicha(newFicha: Partial<Ficha>, fichaId?:string) {
        return this.db.collection("fichas",
                ref => ref.orderBy("seqNo", "desc").limit(1))
            .get()
            .pipe(
                concatMap(result => {

                    const fichas = convertSnaps<Ficha>(result);

                    const lastFichaSeqNo = fichas[0]?.seqNo ?? 0;

                    const ficha = {
                        ...newFicha,
                        seqNo: lastFichaSeqNo + 1
                    }

                    let save$: Observable<any>;

                    if (fichaId) {
                        save$ = from(this.db.doc(`fichas/${fichaId}`).set(ficha));
                    }
                    else {
                        save$ = from(this.db.collection("fichas").add(ficha));
                    }

                    return save$
                        .pipe(
                            map(res => {
                                return {
                                    id: fichaId ?? res.id,
                                    ...ficha
                                }
                            })
                        );


                })
            )
    }

    loadFichaByEspecie(especie:string): Observable<Ficha[]> {
         return this.db.collection(
            "fichas",
            ref => ref.where("especie", "array-contains", especie)
                .orderBy("seqNo")
            )
            .get()
             .pipe(
                 map(result => convertSnaps<Ficha>(result))
             );

    }

}
