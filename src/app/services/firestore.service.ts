import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable, of } from 'rxjs';
import { Donacion, Ficha, Publicacion } from '../models/models';
import { convertSnaps } from './db-util';
import { where } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  path!: string;

  constructor(public database : AngularFirestore) { }

  createDoc(data: any, path: string, id: string) {
      const collection = this.database.collection(path);
      return collection.doc(id).set(data);
  }

  getDoc<tipo>(path: string, id: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }

  getId() {
    return this.database.createId();
  }


  getCollection<tipo>(path: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }

  getCollectionQuery<tipo>(path: string, parametro: string, condicion: any, busqueda: string) {
    const collection = this.database.collection<tipo>(path,
      ref => ref.where( parametro, condicion, busqueda));
    return collection.valueChanges();
  }

  getCollectionAll<tipo>(path: string, parametro: string, condicion: any, busqueda: string, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.database.collectionGroup<tipo>(path,
      ref => ref.where( parametro, condicion, busqueda)
                .orderBy('fecha', 'desc')
                .limit(1)
                .startAfter(startAt)
      );
    return collection.valueChanges();
  }

  getCollectionPaginada<tipo>(path: string, limit: number, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.database.collection<tipo>(path,
      ref => ref.orderBy('fecha', 'desc')
                .limit(limit)
                .startAfter(startAt)
      );
    return collection.valueChanges();
  }

  getPublicacionesPorUsuario(userId: string): Observable<Publicacion[]> {
    if (!userId) {
      return of([]);
    }
    const collection = this.database.collection<Publicacion>('Publicaciones', ref => ref.where("userId", "==", userId));
    return collection.valueChanges();
  }



loadPublicacionByCategory(category: string): Observable<Publicacion[]> {
  return this.database.collection<Publicacion>('Publicaciones', ref => ref.where('category', '==', category))
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Publicacion;
        const id = a.payload.doc.id;
        return {...data };
      }))
    );
}




loadFichaByEspecie(especie:string): Observable<Ficha[]> {
  return this.database.collection(
     "Fichas",
     ref => ref.where("especie", "array-contains", especie)
         .orderBy("nacimiento")
     )
     .get()
      .pipe(
          map(result => convertSnaps<Ficha>(result))
      );

}


}



