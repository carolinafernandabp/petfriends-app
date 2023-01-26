import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-all-fichas',
  templateUrl: './all-fichas.page.html',
  styleUrls: ['./all-fichas.page.scss'],
})
export class AllFichasPage implements OnInit {


  optionSelected:string = "PERRO";

  constructor( public firestore : FirestoreService,
              public user: UserService) { }

  ngOnInit() {


  }

  segmentChanged(event: any){
    this.optionSelected = event.detail.value;
        console.log(event.detail.value);
  }





}
