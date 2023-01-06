import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Publicacion } from 'src/app/models/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-organizacion',
  templateUrl: './home-organizacion.page.html',
  styleUrls: ['./home-organizacion.page.scss'],
})
export class HomeOrganizacionPage implements OnInit {

  mascotaPublicacion$ : Observable<Publicacion[]> | any;

  noticiaPublicacion$ : Observable<Publicacion[]> | any;

  optionSelected:string = "MASCOTA";

  constructor(private router: Router,
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
