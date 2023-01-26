import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Donacion, Ficha, Publicacion } from '../models/models';
import { convertSnaps } from './db-util';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

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


  loadPublicacionByCategory(category:string): Observable<Publicacion[]> {
    return this.database.collection(
       "Publicaciones",
       ref => ref.where("category", "array-contains", category)
           .orderBy("create")
       )
       .get()
        .pipe(
            map((result: any) => convertSnaps<Publicacion>(result))
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

loadDonacionnByBanco(banco:string): Observable<Donacion[]> {
  return this.database.collection(
     "Donaciones",
     ref => ref.where("banco", "array-contains", banco)
         .orderBy("cuenta")
     )
     .get()
      .pipe(
          map(result => convertSnaps<Donacion>(result))
      );

}

}



