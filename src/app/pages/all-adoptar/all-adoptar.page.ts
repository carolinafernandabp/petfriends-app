import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-adoptar',
  templateUrl: './all-adoptar.page.html',
  styleUrls: ['./all-adoptar.page.scss'],
})
export class AllAdoptarPage implements OnInit {

  constructor(public firestore : FirestoreService,
              public user: UserService) { }

  ngOnInit() {
  }

}
