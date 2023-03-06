import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  users: any;

  optionSelected = 'MASCOTA';

  constructor(
              public firestore : FirestoreService,
              public user: UserService) { }

  ngOnInit() {

    this.users = this.user.getUserId();
    this.reloadPublicaciones();

  }

  getPublicaciones() {
    this.firestore.getCollection<Publicacion>('Publicaciones').subscribe(res => {
      this.publicaciones = res;
    });
  }

  reloadPublicaciones() {

      this.mascotaPublicacion$ = this.firestore.loadPublicacionByCategory('MASCOTA');
      this.noticiaPublicacion$ = this.firestore.loadPublicacionByCategory('NOTICIA');
      this.publicacionesSeleccionadas();


  }

  publicacionesSeleccionadas() {
    if (this.optionSelected === 'MASCOTA') {
      this.mascotaPublicacion$.subscribe(res => {
        this.publicaciones = res;
      });
    } else if (this.optionSelected === 'NOTICIA') {
      this.noticiaPublicacion$.subscribe(res => {
        this.publicaciones = res;
      });
    }
  }


    segmentChanged(event: any){
      this.optionSelected = event.detail.value;
          console.log(event.detail.value);
    }

  }
