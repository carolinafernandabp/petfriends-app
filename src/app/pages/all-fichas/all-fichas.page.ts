import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Donacion, Ficha } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';


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
  users: any;

  optionSelected:string ='PERRO';

  constructor( public firestoreService : FirestoreService,
              public user: UserService) { }

  ngOnInit() {

    this.users = this.user.getUserId();
    this.reloadFichas();

  }

  getFichas() {
    this.firestoreService.getCollection<Ficha>('Fichas').subscribe(res => {
      this.fichas = res;
    });
  }

  reloadFichas(){

    this.perroFicha$ = this.firestoreService.loadFichaByEspecie('PERRO');
    this.gatoFicha$ = this.firestoreService.loadFichaByEspecie('GATO');
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
