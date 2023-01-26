import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-all-donar',
  templateUrl: './all-donar.page.html',
  styleUrls: ['./all-donar.page.scss'],
})
export class AllDonarPage implements OnInit {



  constructor(public firestore : FirestoreService,
    public user: UserService) { }

  ngOnInit() {


  }




}
