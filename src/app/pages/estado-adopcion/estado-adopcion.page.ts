import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-estado-adopcion',
  templateUrl: './estado-adopcion.page.html',
  styleUrls: ['./estado-adopcion.page.scss'],
})
export class EstadoAdopcionPage implements OnInit {

  constructor(public firestore : FirestoreService,
    public user: UserService) { }

  ngOnInit() {
  }

}
