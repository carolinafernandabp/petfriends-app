import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Publicacion } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-publicaciones',
  templateUrl: './all-publicaciones.page.html',
  styleUrls: ['./all-publicaciones.page.scss'],
})
export class AllPublicacionesPage implements OnInit {

  mascotaPublicacion$: Observable<Publicacion[]> | undefined;
  noticiaPublicacion$: Observable<Publicacion[]> | undefined;
  publicaciones: Publicacion[] = [];
  user: any;

  constructor(
    private firestoreService: FirestoreService,
    public userService: UserService
  ) {}

  ngOnInit() {

    this.getPublicaciones();
  }

  getPublicaciones() {
    this.firestoreService.getCollection<Publicacion>('Publicaciones').subscribe(res => {
      this.publicaciones = res;
    });
  }
}

