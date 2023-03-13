import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Donacion, Ficha } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-all-fichas',
  templateUrl: './all-fichas.page.html',
  styleUrls: ['./all-fichas.page.scss'],
})
export class AllFichasPage implements OnInit {


  perroFicha$!: Observable<Ficha[]>;

  gatoFicha$!: Observable<Ficha[]>;

  otroFicha$!: Observable<Ficha[]>;

  fichas: Ficha[] = [];

  optionSelected:string ='PERRO';

  userId: string | null = null;

  constructor( public firestoreService : FirestoreService,
              public user: UserService) { }

  ngOnInit() {


    this.reloadFichas();

  }



  reloadFichas() {

      this.perroFicha$ = this.firestoreService.loadFichasByUserId(this.user.userId)
      this.perroFicha$ = this.firestoreService.loadFichaByEspecie('PERRO');
      this.gatoFicha$ = this.firestoreService.loadFichasByUserId(this.user.userId)
      this.gatoFicha$ = this.firestoreService.loadFichaByEspecie('GATO');
      this.otroFicha$ = this.firestoreService.loadFichasByUserId(this.user.userId)
      this.otroFicha$ = this.firestoreService.loadFichaByEspecie('OTRO');
      this.publicacionesSeleccionadas();

  }


  publicacionesSeleccionadas() {
    switch (this.optionSelected) {
      case 'PERRO':
        this.perroFicha$.subscribe(res => {
          this.fichas = res;
        });
        break;
      case 'GATO':
        this.gatoFicha$.subscribe(res => {
          this.fichas = res;

        });
        break;
      case 'OTRO':
        this.otroFicha$.subscribe(res => {
          this.fichas = res;
        });
        break;
      default:
        this.fichas = [];

    }
  }


  segmentChanged(event: any){
    this.optionSelected = event.detail.value;
        console.log(event.detail.value);
  }





}
