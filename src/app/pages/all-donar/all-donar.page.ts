import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Donacion } from 'src/app/models/donar';
import { DonarService } from 'src/app/services/donar.service';

@Component({
  selector: 'app-all-donar',
  templateUrl: './all-donar.page.html',
  styleUrls: ['./all-donar.page.scss'],
})
export class AllDonarPage implements OnInit {

  datosDonar$ : Observable<Donacion[]> | any;

  optionSelected:string = "DATOS";

  constructor(private donarService : DonarService) { }

  ngOnInit() {

    this.reloadDatos;
  }

  reloadDatos(){

    this.datosDonar$ = this.donarService.loadDonacionnByBanco("DATOS");
  }

  segmentChanged(event: any){
    this.optionSelected = event.detail.value;
        console.log(event.detail.value);
  }

}
