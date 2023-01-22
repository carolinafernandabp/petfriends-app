import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ficha } from 'src/app/models/ficha-mascota';
import { Publicacion } from 'src/app/models/publicacion';
import { FichaMascotaService } from 'src/app/services/ficha.service';

@Component({
  selector: 'app-all-fichas',
  templateUrl: './all-fichas.page.html',
  styleUrls: ['./all-fichas.page.scss'],
})
export class AllFichasPage implements OnInit {

  perroFicha$ : Observable<Ficha[]> | any;

  gatoFicha$ : Observable<Ficha[]> | any;

  otroFicha$ : Observable<Ficha[]> | any;

  optionSelected:string = "PERRO";

  constructor( private fichaService : FichaMascotaService) { }

  ngOnInit() {

    this.reloadFichas();
  }

  reloadFichas() {

    this.perroFicha$ = this.fichaService.loadFichaByEspecie("PERRO");

    this.gatoFicha$ = this.fichaService.loadFichaByEspecie("GATO");

    this.otroFicha$ = this.fichaService.loadFichaByEspecie("OTRO");

}

segmentChanged(event: any){
  this.optionSelected = event.detail.value;
      console.log(event.detail.value);
}



}
