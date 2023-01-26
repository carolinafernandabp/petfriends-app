import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
})
export class FichaPage implements OnInit {

  constructor(public firestore : FirestoreService,
                public user: UserService) { }

  ngOnInit() {
  }

}
