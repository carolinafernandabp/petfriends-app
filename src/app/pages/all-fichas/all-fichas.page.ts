import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Donacion } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-all-fichas',
  templateUrl: './all-fichas.page.html',
  styleUrls: ['./all-fichas.page.scss'],
})
export class AllFichasPage implements OnInit {

  donaciones: Donacion[] = [];
  users: any;

  optionSelected:string = "PERRO";

  constructor( public firestoreService : FirestoreService,
              public user: UserService) { }

  ngOnInit() {

    this.users = this.user.getUserId();
    this.getDonaciones();

  }

  getDonaciones() {
    this.firestoreService.getCollection<Donacion>('Donaciones').subscribe(res => {
      this.donaciones = res;
    });
  }

  segmentChanged(event: any){
    this.optionSelected = event.detail.value;
        console.log(event.detail.value);
  }





}
