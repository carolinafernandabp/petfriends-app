import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Publicacion } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  mascotaPublicacion$ !: Observable<Publicacion[]> ;

  noticiaPublicacion$ !: Observable<Publicacion[]> ;

  publicaciones: Publicacion[] = [];

  optionSelected:string ='MASCOTA';


  constructor(public firestore : FirestoreService,
              public user: UserService) {  }

  ngOnInit() {

      this.reloadPublicaciones();
  }

  reloadPublicaciones() {

    this.mascotaPublicacion$ = this.firestore.loadPublicacionByCategory('MASCOTA');
    this.noticiaPublicacion$ = this.firestore.loadPublicacionByCategory('NOTICIA');

    this.publicacionesSeleccionadas();

   }

   publicacionesSeleccionadas() {
    switch (this.optionSelected) {
      case 'MASCOTA':
        this.mascotaPublicacion$.subscribe(res => {
          this.publicaciones = res;
        });
        break;
      case 'NOTICIA':
        this.noticiaPublicacion$.subscribe(res => {
          this.publicaciones = res;
        });
        break;
      default:
        this.publicaciones = [];

    }

   }

    segmentChanged(event: any){
      this.optionSelected = event.detail.value;
          console.log(event.detail.value);
    }

  }

