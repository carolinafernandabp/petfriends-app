import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { Ficha } from 'src/app/models/ficha-mascota';
import { FichaMascotaService } from 'src/app/services/ficha.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-ficha-mascota',
  templateUrl: './list-ficha-mascota.component.html',
  styleUrls: ['./list-ficha-mascota.component.scss'],
})
export class ListFichaMascotaComponent implements OnInit {

  @Input()
  fichas!: Ficha[] | any;

  @Output()
  fichaDeleted = new EventEmitter<Ficha>();


  constructor( private router : Router,
                private fichaService : FichaMascotaService,
                private user : UserService) { }

  ngOnInit() {}

  async onDeleteFicha(ficha : Ficha) {

    (await this.fichaService.deleteFicha(ficha.id))
        .pipe(
            tap(() => {
                console.log("Deleted ficha", ficha);
                this.fichaDeleted.emit(ficha);
            }),
            catchError(err => {
                console.log(err);
                alert("Could not delete ficha.");
                return throwError(err);
            })
        )
        .subscribe();

}



}
