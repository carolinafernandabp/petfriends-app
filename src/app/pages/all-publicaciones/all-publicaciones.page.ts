import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListPublicacionesComponent } from 'src/app/component/list-publicaciones/list-publicaciones.component';
import { Publicacion } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-all-publicaciones',
  templateUrl: './all-publicaciones.page.html',
  styleUrls: ['./all-publicaciones.page.scss'],
})
export class AllPublicacionesPage implements OnInit {

  mascotaPublicacion$ : Observable<Publicacion[]> | any;

  noticiaPublicacion$ : Observable<Publicacion[]> | any;

  optionSelected:string = "MASCOTA";

  constructor( public list : FirestoreService) { }

  ngOnInit() {

    this.reloadPublicaciones();

  }

  reloadPublicaciones() {

    this.mascotaPublicacion$ = this.list.loadPublicacionByCategory('MASCOTA');

    this.noticiaPublicacion$ = this.list.loadPublicacionByCategory('NOTICIA');
}



  segmentChanged(event: any){
    this.optionSelected = event.detail.value;
        console.log(event.detail.value);
  }
}
