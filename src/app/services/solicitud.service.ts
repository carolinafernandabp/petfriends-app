import {Injectable} from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController } from "@ionic/angular";
import firebase from "firebase/compat";
import {from, Observable, of} from "rxjs";
import {concatMap, map, tap} from "rxjs/operators";
import { Solicitud } from "../models/solicitud";
import { convertSnaps} from "../services/db-util"


import OrderByDirection = firebase.firestore.OrderByDirection;


@Injectable({
    providedIn: "root"
})
export class SolicitudService {

    constructor(private db: AngularFirestore,
                  private alertController: AlertController) {

    }


    async deleteSolicitud(solicitudId:string) {

        return from(this.db.doc(`solicitudes/${solicitudId}`).delete());
    }

    updateSolicitud(solicitudId:string, changes: Partial<Solicitud>):Observable<any> {
        return from(this.db.doc(`solicitudes/${solicitudId}`).update(changes));
    }

    createSolicitud(newSolicitud: Partial<Solicitud>, solicitudId?:string) {
        return this.db.collection("solicitudes",
                ref => ref.orderBy("seqNo", "desc").limit(1))
            .get()
            .pipe(
                concatMap(result => {

                    const solicitudes = convertSnaps<Solicitud>(result);

                    const lastSolicitudSeqNo = solicitudes[0]?.seqNo ?? 0;

                    const solicitud = {
                        ...newSolicitud,
                        seqNo: lastSolicitudSeqNo + 1
                    }

                    let save$: Observable<any>;

                    if (solicitudId) {
                        save$ = from(this.db.doc(`solicitudes/${solicitudId}`).set(solicitud));
                    }
                    else {
                        save$ = from(this.db.collection("solicitudes").add(solicitud));
                    }

                    return save$
                        .pipe(
                            map(res => {
                                return {
                                    id: solicitudId ?? res.id,
                                    ...solicitud
                                }
                            })
                        );


                })
            )
    }

    loadDonacionnByCategory(category:string): Observable<Solicitud[]> {
      return this.db.collection(
         "donaciones",
         ref => ref.where("categories", "array-contains", category)
             .orderBy("seqNo")
         )
         .get()
          .pipe(
              map(result => convertSnaps<Solicitud>(result))
          );

 }

}
