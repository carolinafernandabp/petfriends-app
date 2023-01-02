import {Injectable} from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController } from "@ionic/angular";
import firebase from "firebase/compat";
import {from, Observable, of} from "rxjs";
import {concatMap, map, tap} from "rxjs/operators";
import { Ficha } from "../models/ficha-mascota";
import { Petlover } from "../models/petlover";
import { convertSnaps } from "./db-utils";



import OrderByDirection = firebase.firestore.OrderByDirection;


@Injectable({
    providedIn: "root"
})
export class FichaMascotaService {

    constructor(private db: AngularFirestore,
                  private alertController: AlertController) {

    }


    deleteFichayandPetlover(fichaId:string) {
    return this.db.collection(`fichas/${fichaId}/Petlover`)
    .get()
    .pipe(
        concatMap(results => {

            const petlovers = convertSnaps<Petlover>(results);

            const batch = this.db.firestore.batch();

            const fichaRef = this.db.doc(`fichas/${fichaId}`).ref;

            batch.delete(fichaRef);

            for (let petlover of petlovers) {
                const petloverRef =
                    this.db.doc(`fichas/${fichaId}/lessons/${petlover.id}`).ref;

                batch.delete(petloverRef);
            }

            return from(batch.commit());

        })
    );
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

    loadFichaByCategory(category:string): Observable<Ficha[]> {
         return this.db.collection(
            "fichas",
            ref => ref.where("categories", "array-contains", category)
                .orderBy("seqNo")
            )
            .get()
             .pipe(
                 map(result => convertSnaps<Ficha>(result))
             );

    }

}

