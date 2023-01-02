import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSegment } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Publicacion } from '../models/publicacion';
import { PublicacionService } from '../services/publicacion.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  mascotaPublicacion$ : Observable<Publicacion[]> | any;

  noticiaPublicacion$ : Observable<Publicacion[]> | any;

  optionSelected:string = "MASCOTA";

  constructor( private router: Router,
                private publicacionService: PublicacionService,
                public user: UserService) { }

  ngOnInit() {

    this.reloadPublicaciones();
  }

  reloadPublicaciones() {

    this.mascotaPublicacion$ = this.publicacionService.loadPublicacionByCategory("MASCOTA");

    this.noticiaPublicacion$ = this.publicacionService.loadPublicacionByCategory("NOTICIA");
}

segmentChanged(event: any){
   this.optionSelected = event.detail.value;
      console.log(event.detail.value);
}



}
