import {Injectable} from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController } from "@ionic/angular";
import firebase from "firebase/compat";
import {from, Observable, of} from "rxjs";
import {concatMap, map, tap} from "rxjs/operators";
import { Publicacion } from "../models/publicacion";
import { convertSnaps } from "./db-utils";



import OrderByDirection = firebase.firestore.OrderByDirection;


@Injectable({
    providedIn: "root"
})
export class PublicacionService {

    constructor(private db: AngularFirestore,
                  private alertController: AlertController) {

    }


    async deletePublicacion(publicacionId:string) {

        return from(this.db.doc(`publicaciones/${publicacionId}`).delete());
    }

    updatePublicacion(publicacionId:string, changes: Partial<Publicacion>):Observable<any> {
        return from(this.db.doc(`publicaciones/${publicacionId}`).update(changes));
    }

    createPublicacion(newPublicacion: Partial<Publicacion>, publicacionId?:string) {
        return this.db.collection("publicaciones",
                ref => ref.orderBy("seqNo", "desc").limit(1))
            .get()
            .pipe(
                concatMap(result => {

                    const publicaciones = convertSnaps<Publicacion>(result);

                    const lastPublicacionSeqNo = publicaciones[0]?.seqNo ?? 0;

                    const publicacion = {
                        ...newPublicacion,
                        seqNo: lastPublicacionSeqNo + 1
                    }

                    let save$: Observable<any>;

                    if (publicacionId) {
                        save$ = from(this.db.doc(`publicaciones/${publicacionId}`).set(publicacion));
                    }
                    else {
                        save$ = from(this.db.collection("publicaciones").add(publicacion));
                    }

                    return save$
                        .pipe(
                            map(res => {
                                return {
                                    id: publicacionId ?? res.id,
                                    ...publicacion
                                }
                            })
                        );


                })
            )
    }

    loadPublicacionByCategory(category:string): Observable<Publicacion[]> {
         return this.db.collection(
            "publicaciones",
            ref => ref.where("categories", "array-contains", category)
                .orderBy("seqNo")
            )
            .get()
             .pipe(
                 map(result => convertSnaps<Publicacion>(result))
             );

    }

}

