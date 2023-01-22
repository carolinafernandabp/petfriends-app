import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { Donacion } from 'src/app/models/donar';
import { DonarService } from 'src/app/services/donar.service';
@Component({
  selector: 'app-list-donar',
  templateUrl: './list-donar.component.html',
  styleUrls: ['./list-donar.component.scss'],
})
export class ListDonarComponent implements OnInit {

  @Input() donaciones: Donacion[] | any = [];

  @Output() donacionEdited = new EventEmitter();

  @Output() donacionDeleted = new EventEmitter<Donacion>();



  constructor(private router :Router,
              private donarService : DonarService
              ) { }

  ngOnInit() {}

  async onDeletedonar(donacion : Donacion){

    (await this.donarService.deleteDonar(donacion.id))
    .pipe(
      tap(() => {
        console.log("Delete", donacion);
        this.donacionDeleted.emit(donacion);
      }),
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    )
    .subscribe();
  }




}
